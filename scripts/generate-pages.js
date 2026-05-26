import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CONFIG_PATH = path.join(__dirname, '..', 'drive-sync', 'config.json')
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'drive')

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))

// ---------------------------------------------------------------------------
// CSV parser — handles quoted fields containing commas and newlines
// ---------------------------------------------------------------------------

function parseCSV(text) {
  const rows = []
  let row = []
  let field = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++ }
      else if (ch === '"') { inQuotes = false }
      else { field += ch }
    } else {
      if (ch === '"') { inQuotes = true }
      else if (ch === ',') { row.push(field); field = '' }
      else if (ch === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (ch === '\r') { /* skip */ }
      else { field += ch }
    }
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  return rows
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const OFFICE_LABELS = {
  'application/vnd.google-apps.document':     'Word (.docx)',
  'application/vnd.google-apps.spreadsheet':  'Excel (.xlsx)',
  'application/vnd.google-apps.presentation': 'PowerPoint (.pptx)',
  'application/vnd.google-apps.drawing':      'SVG (.svg)',
}

function officeLabel(mimeType) {
  return OFFICE_LABELS[mimeType] || 'Office file'
}

function safePath(p) {
  return p.replace(/[<>:"|?*]/g, '_')
}

function toYamlValue(value) {
  if (typeof value !== 'string') return value
  if (value.includes(':') || value.includes('#') || value.includes('"')) {
    return `"${value.replace(/"/g, '\\"')}"`
  }
  return value
}

function frontmatter(fields) {
  const lines = ['---']
  for (const [key, val] of Object.entries(fields)) {
    if (val === '' || val == null) continue
    lines.push(`${key}: ${toYamlValue(String(val))}`)
  }
  lines.push('---')
  return lines.join('\n')
}

/**
 * Build an HTML icon link for use in a markdown table cell.
 * Returns '–' if href is empty (no export available for this file type).
 */
function iconLink(href, iconUrl, title, alt) {
  if (!href) return '–'
  return `<a href="${href}" title="${title}" target="_blank" rel="noopener"><img src="${iconUrl}" width="24" height="24" alt="${alt}" style="vertical-align:middle"></a>`
}

/**
 * Render a markdown table of files with Drive / Office / PDF icon links.
 * iconBase — absolute URL prefix, e.g. https://example.com/icons
 */
function buildFileTable(files, iconBase) {
  const driveIcon  = `${iconBase}/drive.svg`
  const officeIcon = `${iconBase}/office.svg`
  const pdfIcon    = `${iconBase}/pdf.svg`

  const headerRow = '| File | Drive | Office | PDF |'
  const separator = '|------|:-----:|:------:|:---:|'

  const rows = files.map(f => {
    // Escape pipe characters in file names to avoid breaking the table
    const name      = (f['Name'] || 'Unnamed').replace(/\|/g, '\\|')
    const driveUrl  = f['URL']
    const officeUrl = f['Export (Office)']
    const pdfUrl    = f['Export (PDF)']
    const mimeType  = f['MIME Type']

    const driveCell  = iconLink(driveUrl,  driveIcon,  'Open in Google Drive',                 'Open in Drive')
    const officeCell = iconLink(officeUrl, officeIcon, `Download as ${officeLabel(mimeType)}`,  'Download Office')
    const pdfCell    = iconLink(pdfUrl,    pdfIcon,    'Download as PDF',                       'Download PDF')

    return `| **${name}** | ${driveCell} | ${officeCell} | ${pdfCell} |`
  })

  return [headerRow, separator, ...rows].join('\n')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!config.csvUrl || config.csvUrl === 'YOUR_PUBLISHED_CSV_URL_HERE') {
    console.error('Set csvUrl in drive-sync/config.json before running.')
    process.exit(1)
  }

  // Icon base URL — strip trailing slash so we can always append /drive.svg etc.
  const siteUrl  = (config.siteUrl || '').replace(/\/$/, '')
  const iconBase = siteUrl ? `${siteUrl}/icons` : '/icons'

  console.log('Fetching Drive structure from Google Sheets…')
  const res = await fetch(config.csvUrl)
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status} ${res.statusText}`)
  const csv = await res.text()

  const [headerRow, ...dataRows] = parseCSV(csv)
  const headers = headerRow.map(h => h.trim())

  const data = dataRows
    .map(row => Object.fromEntries(headers.map((h, i) => [h, (row[i] ?? '').trim()])))
    .filter(row => row['File ID'])

  const rootRow = data.find(row => row['Depth'] === '0')
  if (!rootRow) throw new Error('Could not find root folder row (Depth = 0)')
  const rootName = rootRow['Name']

  // ------------------------------------------------------------------
  // Build a map of each folder's direct children (files + subfolders)
  // keyed by File ID
  // ------------------------------------------------------------------
  const childrenOf = new Map() // folderId → { files: Row[], subfolders: Row[] }

  for (const row of data) {
    const parentId = row['Parent ID']
    if (!parentId) continue
    if (!childrenOf.has(parentId)) {
      childrenOf.set(parentId, { files: [], subfolders: [] })
    }
    const bucket = childrenOf.get(parentId)
    if (row['Type'] === 'Folder') {
      bucket.subfolders.push(row)
    } else {
      bucket.files.push(row)
    }
  }

  // Clear previously generated pages
  if (fs.existsSync(CONTENT_DIR)) fs.rmSync(CONTENT_DIR, { recursive: true })

  let generated = 0
  let skipped   = 0

  // Helper: relative path from the root folder name
  function relPath(fullPath) {
    if (fullPath === rootName) return ''
    if (fullPath.startsWith(rootName + '/')) return fullPath.slice(rootName.length + 1)
    return fullPath
  }

  for (const row of data) {
    if (row['Type'] !== 'Folder') continue   // only process folders

    const folderId = row['File ID']
    const isRoot   = row['Depth'] === '0'
    const rel      = relPath(row['Full Path'])

    const { files = [], subfolders = [] } = childrenOf.get(folderId) || {}
    const hasFiles = files.length > 0
    const hasSubs  = subfolders.length > 0

    // ------------------------------------------------------------------
    // Folder categorisation:
    //
    //  • Pure-subfolder (no files, has subs):
    //      Skip index.md for non-root → Quartz FolderPage auto-generates
    //      a card grid for the subfolders.
    //      Root folder always gets an index.md so the wikilink from
    //      content/index.md resolves correctly.
    //
    //  • Leaf (has files, no subs):
    //      Generate index.md with a file table.
    //
    //  • Mixed (has files AND subs):
    //      Generate index.md with subfolder links followed by file table.
    //      Subfolders are still navigable via Quartz's Explorer sidebar.
    //
    //  • Empty folder (no files, no subs):
    //      Generate a minimal index.md so the folder appears in navigation.
    // ------------------------------------------------------------------

    let body = '\n'

    if (!hasFiles && hasSubs && !isRoot) {
      // Pure-subfolder, non-root: let Quartz FolderPage handle it
      skipped++
      continue
    }

    if (hasSubs && hasFiles) {
      // Mixed: list subfolders first, then file table
      body += '## Subfolders\n\n'
      for (const sub of subfolders) {
        const subName    = sub['Name']
        const subSegment = safePath(subName)
        body += `- [${subName}](./${subSegment}/)\n`
      }
      body += '\n## Files\n\n'
      body += buildFileTable(files, iconBase) + '\n'
    } else if (hasFiles) {
      // Leaf: just the file table
      body += buildFileTable(files, iconBase) + '\n'
    } else if (hasSubs && !hasFiles) {
      // Root-only pure-subfolder case
      body += '## Subfolders\n\n'
      for (const sub of subfolders) {
        const subName    = sub['Name']
        const subSegment = safePath(subName)
        body += `- [${subName}](./${subSegment}/)\n`
      }
    }
    // else empty folder: body stays as '\n'

    const fm = frontmatter({
      title: row['Name'],
      date:  row['Modified Date'],
    })

    const dir        = rel ? path.join(CONTENT_DIR, safePath(rel)) : CONTENT_DIR
    const outputPath = path.join(dir, 'index.md')

    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(outputPath, fm + body, 'utf8')
    generated++
  }

  console.log(`Done — generated ${generated} folder pages (skipped ${skipped} pure-subfolder folders for Quartz auto-rendering) in content/drive/`)
}

main().catch(err => { console.error(err); process.exit(1) })
