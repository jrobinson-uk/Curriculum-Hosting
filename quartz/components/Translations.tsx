import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"

interface TranslationsOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: TranslationsOptions = {
  hideWhenEmpty: true,
}

// Helper function to extract the path (e.g., "English-Source.md") 
// from a raw Markdown link string (e.g., "[Title](English-Source.md)")
function extractPathFromMarkdownLink(markdownLink: string): string | null {
  // Regex to find the content inside the parentheses (the link path).
  const match = markdownLink.match(/\(([^)]+)\)/)
  if (match && match[1]) {
    // Return the raw path
    return match[1]
  }
  return null
}

export default ((opts?: Partial<TranslationsOptions>) => {
  const options: TranslationsOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const Translations: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    // Current page slug (e.g., "quick-reads---files/qr23" OR "quick-reads---files/qr23_ro")
    const currentSlug = fileData.slug
    if (!currentSlug) return null

    // === CRITICAL FIX STEP 1: Determine the target source slug for comparison ===
    let targetSourceSlug: string
    
    const isTranslation = !!fileData.frontmatter?.translatedFrom
    
    if (isTranslation) {
      // If viewing a translation (QR23_ro), we find its *base* English slug.
      const rawLink = fileData.frontmatter?.translatedFrom[0]
      const extractedPath = typeof rawLink === 'string' ? extractPathFromMarkdownLink(rawLink) : rawLink?.link?.slug

      if (!extractedPath) {
       return null;
      }
      
      // Resolve the path relative to the current file.
      const absoluteBaseSlug = simplifySlug(resolveRelative(currentSlug, extractedPath))
      targetSourceSlug = absoluteBaseSlug

    } else {
      // If viewing the English Source (QR23), the target is the current slug.
      targetSourceSlug = simplifySlug(currentSlug)
    }

    // === CRITICAL FIX STEP 2: Extract the simplest possible file identifier from the Target Slug ===
    // We only want the file name (e.g., "qr22") for the final comparison, because that is what
    // the resolved link path (from the translation candidate) is consistently yielding.
    const parts = targetSourceSlug.split('/')
    const simpleTargetFileSlug = parts[parts.length - 1]

    // Filter all files to find translations that link back to the targetSourceSlug
    const translatedLinks = allFiles.filter((file) => {
      // 1. Skip files that are the current file or that don't have the translation property
      if (file.slug === currentSlug || !file.frontmatter?.translatedFrom) {
        return false
      }
      
      const translatedFromProperty = file.frontmatter.translatedFrom
      const translatedFromLink = Array.isArray(translatedFromProperty) 
        ? translatedFromProperty[0] 
        : translatedFromProperty

      let candidatePath: string | undefined

      // Strategy A: Check if Quartz successfully parsed the link object 
      if (translatedFromLink && typeof translatedFromLink !== 'string' && translatedFromLink.link?.slug) {
        candidatePath = translatedFromLink.link.slug
      } 
      // Strategy B: The value is stored as a raw string (Markdown link)
      else if (typeof translatedFromLink === 'string') {
        const extractedPath = extractPathFromMarkdownLink(translatedFromLink)
        candidatePath = extractedPath || undefined
      }

      if (!candidatePath) {
        return false 
      }

      // Resolve the raw candidate path relative to the translation file's location.
      let resolvedSourceFileSlug = resolveRelative(file.slug!, candidatePath)
      
      // Remove all relative path prefixes (../ or ./) AND remove the file extension (.md)
      resolvedSourceFileSlug = resolvedSourceFileSlug.replace(/^(\.\.\/|\.\/)+/, "").replace(/\.md$/, '')

      // Get the absolute slug for the candidate file and normalize it.
      const candidateFileSlug = simplifySlug(resolvedSourceFileSlug)

      // === FINAL FIX: Now we compare the simplified candidate file name against the simplified target file name ===
      const finalComparisonResult = candidateFileSlug === simpleTargetFileSlug
      
      // === DIAGNOSTIC LOGIC START (Only logging fails now for cleaner output) ===
      if (!finalComparisonResult) {
          
      }
      // === DIAGNOSTIC LOGIC END ===

      // Final filter condition: the resolved path from the candidate must match the determined base source slug.
      return finalComparisonResult
    })
    
    // 2. Hide component if no links are found
    if (options.hideWhenEmpty && translatedLinks.length === 0) {
      return null
    }

    // 3. Render the list using the requested formatting: [Lang] - [Title]
    return (
      <div class={classNames(displayClass, "backlinks", "translated-backlinks")}>
        <h3>{i18n(cfg.locale).components.translations.title}</h3>
        <OverflowList>
          {translatedLinks.length > 0 ? (
            translatedLinks.map((f) => {
              const lang = f.frontmatter?.lang || "N/A"
              const title = f.frontmatter?.title || f.slug
              
              // Construct the required display label: "Lang - Title"
              const displayLabel = `${lang} - ${title}`
              
              return(
               <li key={f.slug}>
                  <a href={resolveRelative(currentSlug, f.slug!)} class="internal">
                    {displayLabel}
                  </a>
                </li>
            )
          })
          ) : (
            <li>{i18n(cfg.locale).components.translations.noTranslationsFound}</li>
          )}
        </OverflowList>
      </div>
    )
  }

  Translations.css = style
  Translations.afterDOMLoaded = overflowListAfterDOMLoaded

  return Translations
}) satisfies QuartzComponentConstructor
