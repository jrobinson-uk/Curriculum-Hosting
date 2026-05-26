import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// mod: define Explorer functions
import { Options } from "./quartz/components/Explorer"
 
export const mapFn: Options["mapFn"] = (node) => {
    node.displayName = node.data?.frontmatter?.displayName
    return node
}




export const filterFn: Options["filterFn"] = (node) => {
  const isExplicitlyHidden = node.data?.frontmatter?.sidebar === false
  const translatedFrom = node.data?.frontmatter?.translatedFrom

  const hasTranslationProperty = Array.isArray(translatedFrom) 

    ? translatedFrom.length > 0 

    : !!translatedFrom

  return !isExplicitlyHidden && !hasTranslationProperty
}
export const sortFn: Options["sortFn"] = (a, b) => {
  // mod: sort folders and files based on folderOrder and noteOrder
  //      to find ways to retrieve folderOrder and noteOrder from frontmatter
  //      we now have to include frontmatter in ContentDetails and linkIndex.set()
 
  // extract order from frontmatter
  const orderA = a.isFolder
    ? a.data?.frontmatter?.folderOrder as number | undefined
    : a.data?.frontmatter?.noteOrder as number | undefined
  const orderB = b.isFolder
    ? b.data?.frontmatter?.folderOrder as number | undefined
    : b.data?.frontmatter?.noteOrder as number | undefined
 
  // method II: sort folders together with files, treat folders as files
  // compare orderA and orderB, those undefined will be placed at the end
  if (orderA !== undefined && orderB !== undefined) {
    return orderA - orderB
  } else if (orderA !== undefined) {
    return -1
  } else if (orderB !== undefined) {
    return 1
  } else {
    return a.displayName.localeCompare(b.displayName)
  }
}


// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.Flex({
      components: [
        {Component: Component.Logo()},
        {Component: Component.PageTitle(),grow: true},
        {Component: Component.MobileOnly(Component.Spacer())},
        {Component: Component.Search(), justify: "end"},
        { Component: Component.Darkmode(),justify: "end" },
        { Component: Component.ReaderMode(), justify: "end" },
      ], gap: "1rem"
    }),],
  afterBody: [Component.Translations(),],
  footer: Component.Footer({
  githubUrl: "https://github.com/RaspberryPiFoundation/teaching-learning-documentation",
  links: {}
}),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
      Component.ConditionalRender({
      component: Component.Breadcrumbs(), 
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.TagList()

  ],
  left: [
    
    Component.Explorer({
  autoReveal: false, 
      title: "Contents", // title of the explorer component
  folderClickBehavior: "link", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
  folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
  useSavedState: false, // whether to use local storage to save "state" (which folders are opened) of explorer
  
  // omitted but shown later
  mapFn,
  filterFn,
  sortFn,
  // what order to apply functions in
  order: ["filter", "map", "sort"],
}),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(), // Add your new component here
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(),Component.ContentMeta()],
  left: [
    Component.Explorer({
  autoReveal: false, 
      title: "Contents", // title of the explorer component
  folderClickBehavior: "link", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
  folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
  useSavedState: false, // whether to use local storage to save "state" (which folders are opened) of explorer
  
  // omitted but shown later
  mapFn,
  filterFn,
  sortFn,
  // what order to apply functions in
  order: ["filter", "map", "sort"],
}),
  ],
  right: [Component.Graph(),
    
    Component.DesktopOnly(Component.TableOfContents()),
     // Add your new component here
    
     Component.Backlinks(),
  ],
}
