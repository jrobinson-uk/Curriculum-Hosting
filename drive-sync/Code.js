// ID of the root Google Drive folder to crawl — replace with your own
var ROOT_FOLDER_ID = '1MijRFIBWClcl_obwH8--lJCcGYxggCtF';

var SHEET_NAME = 'Drive Structure';

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
  'Export (PDF)'
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
    .addToUi();
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function crawlDrive() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  sheet.clearContents();
  sheet.appendRow(HEADERS);

  var rows = [];
  var rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
  crawlFolder(rootFolder, '', 0, rows);

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(rows);
  }

  formatSheet(sheet);

  SpreadsheetApp.getUi().alert(
    'Crawl complete — ' + rows.length + ' items found.'
  );
}

// ---------------------------------------------------------------------------
// Recursive crawl
// ---------------------------------------------------------------------------

function crawlFolder(folder, parentPath, depth, rows) {
  var name = folder.getName();
  var path = parentPath ? parentPath + '/' + name : name;

  rows.push(buildRow(folder, path, depth, true));

  var subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    crawlFolder(subFolders.next(), path, depth + 1, rows);
  }

  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    rows.push(buildRow(file, path + '/' + file.getName(), depth + 1, false));
  }
}

// ---------------------------------------------------------------------------
// Row builder
// ---------------------------------------------------------------------------

function buildRow(item, fullPath, depth, isFolder) {
  var mimeType = isFolder
    ? 'application/vnd.google-apps.folder'
    : item.getMimeType();

  var owner = '';
  try { owner = item.getOwner() ? item.getOwner().getEmail() : ''; } catch (e) {}

  var size = '';
  if (!isFolder) {
    try { size = item.getSize(); } catch (e) {}
  }

  var parentId = '';
  var parentName = '';
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

  var exportUrls = getExportUrls(item.getId(), mimeType, isFolder);

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
    exportUrls[1]
  ];
}

// ---------------------------------------------------------------------------
// Export URL helpers
// ---------------------------------------------------------------------------

// Maps Google Workspace MIME types to their Office export format and base URL
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
    var officeUrl = config.baseUrl + id + '/export?format=' + config.officeFormat;
    var pdfUrl    = config.baseUrl + id + '/export?format=pdf';
    return [officeUrl, pdfUrl];
  }

  // For native PDFs, the file itself is the PDF — provide a direct download link
  if (mimeType === 'application/pdf') {
    var directUrl = 'https://drive.google.com/uc?export=download&id=' + id;
    return ['', directUrl];
  }

  // All other file types (images, video, etc.) — no applicable export
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
