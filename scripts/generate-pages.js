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
  'application/vnd.google-apps.drawing':      'SVG',
}

function officeLabel(mimeType) {
  return OFFICE_LABELS[mimeType] || 'Office format'
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

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (!config.csvUrl || config.csvUrl === 'YOUR_PUBLISHED_CSV_URL_HERE') {
    console.error('Set csvUrl in drive-sync/config.json before running.')
    process.exit(1)
  }

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

  // Clear previously generated pages
  if (fs.existsSync(CONTENT_DIR)) fs.rmSync(CONTENT_DIR, { recursive: true })

  let count = 0

  for (const row of data) {
    const isFolder = row['Type'] === 'Folder'
    const fullPath  = row['Full Path']

    // Path relative to the root folder
    const rel = fullPath === rootName
      ? ''
      : fullPath.startsWith(rootName + '/')
        ? fullPath.slice(rootName.length + 1)
        : fullPath

    // Build frontmatter fields
    const meta = {
      title:       row['Name'],
      date:        row['Modified Date'],
      description: row['Description'],
      driveId:     row['File ID'],
      driveUrl:    row['URL'],
      fileType:    row['Type'],
      owner:       row['Owner'],
    }
    if (!isFolder) {
      if (row['Export (Office)']) meta.exportOffice = row['Export (Office)']
      if (row['Export (PDF)'])    meta.exportPdf    = row['Export (PDF)']
    }

    // Build body
    let body = '\n'
    if (!isFolder) {
      if (row['URL'])              body += `[Open in Google Drive](${row['URL']})\n\n`
      if (row['Export (Office)']) body += `[Download as ${officeLabel(row['MIME Type'])}](${row['Export (Office)']})\n\n`
      if (row['Export (PDF)'])    body += `[Download as PDF](${row['Export (PDF)']})\n\n`
    }

    // Determine output file path
    let outputPath
    if (isFolder) {
      const dir = rel ? path.join(CONTENT_DIR, safePath(rel)) : CONTENT_DIR
      outputPath = path.join(dir, 'index.md')
    } else {
      const parts   = rel.split('/')
      const fileName = parts.pop()
      const dir = parts.length
        ? path.join(CONTENT_DIR, safePath(parts.join('/')))
        : CONTENT_DIR
      const base = fileName.replace(/\.[^/.]+$/, '') // strip extension
      outputPath = path.join(dir, safePath(base) + '.md')
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, frontmatter(meta) + body, 'utf8')
    count++
  }

  console.log(`Done — generated ${count} pages in content/drive/`)
}

main().catch(err => { console.error(err); process.exit(1) })
