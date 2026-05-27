// ID of the root Google Drive folder to crawl — replace with your own
var ROOT_FOLDER_ID = '1MijRFIBWClcl_obwH8--lJCcGYxggCtF';

var SHEET_NAME    = 'Drive Structure';
var IMG_FOLDER_NAME = 'img'; // created next to the spreadsheet

var HEADERS = [
  'File ID',
  'Name',
  'Type',
  'MIME Type',
  'Full Path',
  'Depth',
  'Parent ID',
  'Parent Name',
  'Created Date',
  'Modified Date',
  'Owner',
  'Description',
  'File Size (bytes)',
  'Sharing Access',
  'Children Count',
  'URL',
  'Export (Office)',
  'Export (PDF)',
  'Thumbnail URL'
];

var MIME_LABELS = {
  'application/vnd.google-apps.folder':       'Folder',
  'application/vnd.google-apps.document':     'Google Doc',
  'application/vnd.google-apps.spreadsheet':  'Google Sheet',
  'application/vnd.google-apps.presentation': 'Google Slides',
  'application/vnd.google-apps.form':         'Google Form',
  'application/vnd.google-apps.drawing':      'Google Drawing',
  'application/vnd.google-apps.site':         'Google Site',
  'application/pdf':                          'PDF',
  'image/jpeg':                               'Image',
  'image/png':                                'Image',
  'image/gif':                                'Image',
  'video/mp4':                                'Video',
  'audio/mpeg':                               'Audio'
};

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Drive Sync')
    .addItem('Crawl Drive Folder', 'crawlDrive')
    .addSeparator()
    .addItem('Regenerate All Thumbnails', 'regenerateThumbnails')
    .addToUi();
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function crawlDrive() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  sheet.clearContents();
  sheet.appendRow(HEADERS);

  // Locate (or create) the img folder next to this spreadsheet
  var imgFolder = getOrCreateImgFolder(ss);

  // Build a cache of already-generated thumbnails so we don't re-fetch
  // thumbnails for files that haven't changed.
  // Map:  sourceFileId  →  thumbnailDriveFileId
  var thumbCache = buildThumbCache(imgFolder);

  var rows       = [];
  var rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
  crawlFolder(rootFolder, '', 0, rows, imgFolder, thumbCache);

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(rows);
  }

  formatSheet(sheet);

  SpreadsheetApp.getUi().alert(
    'Crawl complete — ' + rows.length + ' items found.'
  );
}

// Wipe the img folder and re-run the crawl so every thumbnail is regenerated.
function regenerateThumbnails() {
  var ss        = SpreadsheetApp.getActiveSpreadsheet();
  var imgFolder = getOrCreateImgFolder(ss);

  // Delete all existing thumbnail files
  var files = imgFolder.getFiles();
  while (files.hasNext()) {
    files.next().setTrashed(true);
  }

  SpreadsheetApp.getUi().alert(
    'Thumbnails cleared. Running crawl to regenerate…'
  );
  crawlDrive();
}

// ---------------------------------------------------------------------------
// Recursive crawl
// ---------------------------------------------------------------------------

function crawlFolder(folder, parentPath, depth, rows, imgFolder, thumbCache) {
  var name = folder.getName();
  var path = parentPath ? parentPath + '/' + name : name;

  rows.push(buildRow(folder, path, depth, true, imgFolder, thumbCache));

  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    crawlFolder(subFolders.next(), path, depth + 1, rows, imgFolder, thumbCache);
  }

  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    rows.push(buildRow(file, path + '/' + file.getName(), depth + 1, false, imgFolder, thumbCache));
  }
}

// ---------------------------------------------------------------------------
// Row builder
// ---------------------------------------------------------------------------

function buildRow(item, fullPath, depth, isFolder, imgFolder, thumbCache) {
  var mimeType = isFolder
    ? 'application/vnd.google-apps.folder'
    : item.getMimeType();

  var owner = '';
  try { owner = item.getOwner() ? item.getOwner().getEmail() : ''; } catch (e) {}

  var size = '';
  if (!isFolder) {
    try { size = item.getSize(); } catch (e) {}
  }

  var parentId = '', parentName = '';
  try {
    var parents = item.getParents();
    if (parents.hasNext()) {
      var parent = parents.next();
      parentId   = parent.getId();
      parentName = parent.getName();
    }
  } catch (e) {}

  var childrenCount = '';
  if (isFolder) {
    try {
      var folder = DriveApp.getFolderById(item.getId());
      var count  = 0;
      var sf = folder.getFolders(); while (sf.hasNext()) { sf.next(); count++; }
      var ff = folder.getFiles();   while (ff.hasNext()) { ff.next(); count++; }
      childrenCount = count;
    } catch (e) {}
  }

  var exportUrls   = getExportUrls(item.getId(), mimeType, isFolder);
  var thumbnailUrl = isFolder ? '' : getOrGenerateThumbnail(item, imgFolder, thumbCache);

  return [
    item.getId(),
    item.getName(),
    MIME_LABELS[mimeType] || mimeType,
    mimeType,
    fullPath,
    depth,
    parentId,
    parentName,
    item.getDateCreated(),
    item.getLastUpdated(),
    owner,
    item.getDescription() || '',
    size,
    item.getSharingAccess().toString(),
    childrenCount,
    item.getUrl(),
    exportUrls[0],
    exportUrls[1],
    thumbnailUrl
  ];
}

// ---------------------------------------------------------------------------
// Thumbnail helpers
// ---------------------------------------------------------------------------

/**
 * Returns a permanent, publicly accessible URL for a thumbnail image of the
 * given Drive file.
 *
 * Strategy:
 *   1. If a cached PNG already exists in imgFolder for this fileId AND the
 *      source file hasn't been modified since the PNG was created, reuse it.
 *   2. Otherwise fetch the Drive API thumbnailLink (auth'd via the script's
 *      OAuth token), download the image, save it as {fileId}.png in imgFolder,
 *      make it public, and return the stable uc?export=view URL.
 *
 * Returns '' if no thumbnail is available (e.g. the file type isn't
 * previewable by Google Drive).
 */
function getOrGenerateThumbnail(file, imgFolder, thumbCache) {
  var fileId      = file.getId();
  var modifiedMs  = file.getLastUpdated().getTime();

  // Check cache: if thumbnail exists and is newer than the source file, reuse
  if (thumbCache[fileId]) {
    var cachedFile    = DriveApp.getFileById(thumbCache[fileId]);
    var cachedCreated = cachedFile.getDateCreated().getTime();
    if (cachedCreated >= modifiedMs) {
      return 'https://drive.google.com/uc?export=view&id=' + thumbCache[fileId];
    }
    // Source was modified after thumbnail was made — trash old one and regenerate
    cachedFile.setTrashed(true);
    delete thumbCache[fileId];
  }

  // Fetch the thumbnailLink from the Drive API
  var token = ScriptApp.getOAuthToken();
  try {
    var metaResponse = UrlFetchApp.fetch(
      'https://www.googleapis.com/drive/v3/files/' + fileId + '?fields=thumbnailLink&supportsAllDrives=true',
      {
        headers: { 'Authorization': 'Bearer ' + token },
        muteHttpExceptions: true
      }
    );

    if (metaResponse.getResponseCode() !== 200) return '';

    var thumbnailLink = JSON.parse(metaResponse.getContentText()).thumbnailLink;
    if (!thumbnailLink) return '';

    // Request a larger size (Drive thumbnail URLs end with =s<size>)
    thumbnailLink = thumbnailLink.replace(/=s\d+([^&]*)$/, '=s800$1');

    // Download the thumbnail image
    var imgResponse = UrlFetchApp.fetch(thumbnailLink, {
      headers: { 'Authorization': 'Bearer ' + token },
      muteHttpExceptions: true
    });

    if (imgResponse.getResponseCode() !== 200) return '';

    // Save as {fileId}.png in the img folder
    var blob = imgResponse.getBlob();
    blob.setName(fileId + '.png');

    var thumbFile = imgFolder.createFile(blob);
    thumbFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    thumbCache[fileId] = thumbFile.getId();
    return 'https://drive.google.com/uc?export=view&id=' + thumbFile.getId();

  } catch (e) {
    console.log('Thumbnail generation failed for ' + fileId + ': ' + e.message);
    return '';
  }
}

/**
 * Find or create an 'img' folder next to the spreadsheet.
 * The folder itself is made publicly accessible so visitors can load images.
 */
function getOrCreateImgFolder(ss) {
  var ssFile  = DriveApp.getFileById(ss.getId());
  var parents = ssFile.getParents();
  var parent  = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();

  var existing = parent.getFoldersByName(IMG_FOLDER_NAME);
  if (existing.hasNext()) return existing.next();

  var folder = parent.createFolder(IMG_FOLDER_NAME);
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return folder;
}

/**
 * Build a map of { sourceFileId: thumbnailDriveFileId } from existing PNGs
 * in imgFolder so we can skip files that already have up-to-date thumbnails.
 */
function buildThumbCache(imgFolder) {
  var cache = {};
  var files = imgFolder.getFiles();
  while (files.hasNext()) {
    var f    = files.next();
    var name = f.getName();
    // Files are named {sourceFileId}.png
    if (name.slice(-4) === '.png') {
      cache[name.slice(0, -4)] = f.getId();
    }
  }
  return cache;
}

// ---------------------------------------------------------------------------
// Export URL helpers
// ---------------------------------------------------------------------------

var EXPORT_CONFIG = {
  'application/vnd.google-apps.document': {
    officeFormat: 'docx',
    baseUrl: 'https://docs.google.com/document/d/'
  },
  'application/vnd.google-apps.spreadsheet': {
    officeFormat: 'xlsx',
    baseUrl: 'https://docs.google.com/spreadsheets/d/'
  },
  'application/vnd.google-apps.presentation': {
    officeFormat: 'pptx',
    baseUrl: 'https://docs.google.com/presentation/d/'
  },
  'application/vnd.google-apps.drawing': {
    officeFormat: 'svg',
    baseUrl: 'https://docs.google.com/drawings/d/'
  }
};

function getExportUrls(id, mimeType, isFolder) {
  if (isFolder) return ['', ''];

  var config = EXPORT_CONFIG[mimeType];
  if (config) {
    return [
      config.baseUrl + id + '/export?format=' + config.officeFormat,
      config.baseUrl + id + '/export?format=pdf'
    ];
  }

  // Native PDFs — direct download link
  if (mimeType === 'application/pdf') {
    return ['', 'https://drive.google.com/uc?export=download&id=' + id];
  }

  return ['', ''];
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

function formatSheet(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#1a73e8');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
}

// ---------------------------------------------------------------------------
// Debug — select debugThumbnail in the function dropdown and click Run.
// Results appear in the Execution log panel at the bottom of the editor.
// ---------------------------------------------------------------------------

function debugThumbnail() {
  // Find the first file anywhere under ROOT_FOLDER_ID to use as a test subject
  var testFileId = null;

  function findFirstFile(folder) {
    var files = folder.getFiles();
    if (files.hasNext()) return files.next().getId();
    var subs = folder.getFolders();
    while (subs.hasNext()) {
      var found = findFirstFile(subs.next());
      if (found) return found;
    }
    return null;
  }

  try {
    testFileId = findFirstFile(DriveApp.getFolderById(ROOT_FOLDER_ID));
  } catch (e) {
    Logger.log('FAIL  Cannot access root folder: ' + e.message);
    return;
  }

  if (!testFileId) {
    Logger.log('FAIL  No files found under the root folder');
    return;
  }
  Logger.log('OK    Test file ID: ' + testFileId);

  // Step 1 — OAuth token
  var token;
  try {
    token = ScriptApp.getOAuthToken();
    Logger.log('OK    OAuth token obtained (' + token.length + ' chars)');
  } catch (e) {
    Logger.log('FAIL  OAuth token: ' + e.message);
    return;
  }

  // Step 2 — Drive API metadata (thumbnailLink)
  var thumbnailLink;
  try {
    var metaResp = UrlFetchApp.fetch(
      'https://www.googleapis.com/drive/v3/files/' + testFileId +
        '?fields=id,name,mimeType,thumbnailLink&supportsAllDrives=true',
      { headers: { 'Authorization': 'Bearer ' + token }, muteHttpExceptions: true }
    );
    var code = metaResp.getResponseCode();
    Logger.log('OK    Drive API status: ' + code);
    if (code !== 200) {
      Logger.log('FAIL  Drive API body: ' + metaResp.getContentText());
      return;
    }
    var meta = JSON.parse(metaResp.getContentText());
    Logger.log('OK    File: "' + meta.name + '"  mimeType: ' + meta.mimeType);
    thumbnailLink = meta.thumbnailLink;
    if (!thumbnailLink) {
      Logger.log('WARN  thumbnailLink is empty for this file type.');
      Logger.log('      Try a Google Doc, Sheet, or Slides file.');
      return;
    }
    Logger.log('OK    thumbnailLink: ' + thumbnailLink.substring(0, 80) + '...');
  } catch (e) {
    Logger.log('FAIL  Drive API call: ' + e.message);
    return;
  }

  // Step 3 — Fetch the image
  var blob;
  try {
    var sizedLink = thumbnailLink.replace(/=s\d+([^&]*)$/, '=s800$1');
    Logger.log('INFO  Fetching image: ' + sizedLink.substring(0, 80) + '...');
    var imgResp = UrlFetchApp.fetch(sizedLink, {
      headers: { 'Authorization': 'Bearer ' + token }, muteHttpExceptions: true
    });
    var imgCode = imgResp.getResponseCode();
    Logger.log('OK    Image fetch status: ' + imgCode);
    if (imgCode !== 200) {
      Logger.log('FAIL  Image body: ' + imgResp.getContentText().substring(0, 200));
      return;
    }
    blob = imgResp.getBlob();
    Logger.log('OK    Blob size: ' + blob.getBytes().length + ' bytes  type: ' + blob.getContentType());
  } catch (e) {
    Logger.log('FAIL  Image fetch: ' + e.message);
    return;
  }

  // Step 4 — Create / locate img folder
  var imgFolder;
  try {
    imgFolder = getOrCreateImgFolder(SpreadsheetApp.getActiveSpreadsheet());
    Logger.log('OK    img folder: ' + imgFolder.getName() + ' (' + imgFolder.getId() + ')');
  } catch (e) {
    Logger.log('FAIL  img folder: ' + e.message);
    return;
  }

  // Step 5 — Save blob as a file
  var thumbFile;
  try {
    blob.setName('debug-' + testFileId + '.png');
    thumbFile = imgFolder.createFile(blob);
    Logger.log('OK    File saved: ' + thumbFile.getId());
  } catch (e) {
    Logger.log('FAIL  Save file: ' + e.message);
    return;
  }

  // Step 6 — Make it public
  try {
    thumbFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    Logger.log('OK    Sharing set to ANYONE_WITH_LINK');
  } catch (e) {
    Logger.log('FAIL  Set sharing: ' + e.message);
    return;
  }

  var url = 'https://drive.google.com/uc?export=view&id=' + thumbFile.getId();
  Logger.log('');
  Logger.log('SUCCESS  Paste this URL into a browser to verify:');
  Logger.log(url);
}
