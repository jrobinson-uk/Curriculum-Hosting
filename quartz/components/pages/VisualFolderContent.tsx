import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

import style from "../styles/listPage.scss"
import { PageList, SortFn } from "../PageList"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { i18n } from "../../i18n"
import { QuartzPluginData } from "../../plugins/vfile"
import { ComponentChildren } from "preact"
import { concatenateResources } from "../../util/resources"
import { trieFromAllFiles } from "../../util/ctx"
import { resolveRelative } from "../../util/path"

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
  showSubfolders: boolean
  sort?: SortFn
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
  showSubfolders: true,
}

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props

    const trie = (props.ctx.trie ??= trieFromAllFiles(allFiles))
    const folder = trie.findNode(fileData.slug!.split("/"))
    if (!folder) {
      return null
    }

    const allPagesInFolder: QuartzPluginData[] =
      folder.children
        .map((node) => {
          // regular file, proceed
          if (node.data) {
            return node.data
          }

          if (node.isFolder && options.showSubfolders) {
            // folders that dont have data need synthetic files
            const getMostRecentDates = (): QuartzPluginData["dates"] => {
              let maybeDates: QuartzPluginData["dates"] | undefined = undefined
              for (const child of node.children) {
                if (child.data?.dates) {
                  // compare all dates and assign to maybeDates if its more recent or its not set
                  if (!maybeDates) {
                    maybeDates = { ...child.data.dates }
                  } else {
                    if (child.data.dates.created > maybeDates.created) {
                      maybeDates.created = child.data.dates.created
                    }

                    if (child.data.dates.modified > maybeDates.modified) {
                      maybeDates.modified = child.data.dates.modified
                    }

                    if (child.data.dates.published > maybeDates.published) {
                      maybeDates.published = child.data.dates.published
                    }
                  }
                }
              }
              return (
                maybeDates ?? {
                  created: new Date(),
                  modified: new Date(),
                  published: new Date(),
                }
              )
            }

            return {
              slug: node.slug,
              dates: getMostRecentDates(),
              frontmatter: {
                title: node.displayName,
                tags: [],
              },
            }
          }
        })
        .filter((page) => page !== undefined)
        .filter((page) => !page?.frontmatter?.list_hide) 
        
        // --- ADD THIS ENTIRE .sort() BLOCK ---
        .sort((a, b) => {
          const orderA = a.frontmatter?.fileOrder as number | undefined
          const orderB = b.frontmatter?.fileOrder as number | undefined
          const displayA = a.frontmatter?.displayName as string | undefined
          const displayB = b.frontmatter?.displayName as string | undefined
          const slugA = a.slug?.split("/").pop() ?? ""
          const slugB = b.slug?.split("/").pop() ?? ""

          // 1. Check fileOrder
          if (orderA !== undefined && orderB === undefined) {
            return -1 // a comes first
          }
          if (orderA === undefined && orderB !== undefined) {
            return 1 // b comes first
          }
          if (orderA !== undefined && orderB !== undefined) {
            if (orderA !== orderB) {
              return orderA - orderB // Sort by fileOrder
            }
            // If fileOrder is same, fall through
          }

          // 2. Check displayName
          if (displayA && !displayB) {
            return -1 // a comes first
          }
          if (!displayA && displayB) {
            return 1 // b comes first
          }
          if (displayA && displayB) {
            const displayCompare = displayA.localeCompare(displayB)
            if (displayCompare !== 0) {
              return displayCompare // Sort by displayName
            }
            // If displayName is same, fall through
          }

          // 3. Fallback to filename (slug)
          return slugA.localeCompare(slugB)
        })
        
        
        
        
        ?? []
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
    const listProps = {
      ...props,
      sort: options.sort,
      allFiles: allPagesInFolder,
    }

    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren

    return (
      <div class="popover-hint">
        <article class={classes}>{content}</article>
        {/* 2. Render the visual cards instead of the old list */}
<div class="visual-folder-container">
  {allPagesInFolder.map((page) => {
    // Find the full file data for frontmatter
    const file = allFiles.find((f) => f.slug === page.slug)
    const title = file?.frontmatter?.displayName as string ?? file?.frontmatter?.title as string ?? file?.slug?.split("/").pop() ?? "Untitled"
    const description = file?.frontmatter?.description as string | undefined
    const iconPath = file?.frontmatter?.card_icon as string | undefined

    return (
      <a href={resolveRelative(fileData.slug, page.slug!)} class="visual-card">
        {/* Only render the img tag if iconPath exists */}
        {iconPath && <img src={iconPath} alt="" class="card-image" />}
        <div class="card-text-content">
          <h3 class="card-title">{title}</h3>
          {description && <p class="card-description">{description}</p>}
        </div>
      </a>
    )
  })}
</div>
      </div>
    )
  }
const cardCss = `
.visual-folder-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.visual-card {
  display: flex;
  flex-direction: row;
  align-items: center; 
  gap: 1rem;
  background-color: var(--light);
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 1rem;
  text-decoration: none;
  color: var(--dark);
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.visual-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: var(--secondary);
}
.card-image {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}
.card-text-content {
  flex-grow: 1;
}
.card-title {
  margin: 0 0 0.5rem 0;
  color: var(--primary);
  font-size: 1.1rem;
}
.card-description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--darkgray);
}
`
  FolderContent.css = concatenateResources(style, PageList.css,cardCss)
  return FolderContent
}) satisfies QuartzComponentConstructor
