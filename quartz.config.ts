import { QuartzConfig } from "./quartz/cfg"
import { GlossaryEnhancer } from "./quartz/plugins/transformers/glossary"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Teaching and Learning Hub",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-66DJ1HCXEB"
    },
    locale: "en-GB",
    baseUrl: "teaching-learning-docs.rpf-internal.org",
    github: "https://github.com/RaspberryPiFoundation/teaching-learning-documentation/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#eeeeee",
          gray: "#cccccc",
          darkgray: "#333333",
          dark: "#000000",
          secondary: "#a22846",
          tertiary: "#92243f",
          highlight: "rgba(162, 40, 70, 0.1)",
          textHighlight: "rgba(162, 40, 70, 0.2)",
          blue: "#2463eb",
          purple: "#7c3bed",
          green: "#3ebb94",
        },
        darkMode: {
          light: "#1b1b1b",
          lightgray: "#121212",
          gray: "#555555",
          darkgray: "#cccccc",
          dark: "#ffffff",
          secondary: "#de7891",
          tertiary: "#d75d7b",
          highlight: "rgba(222, 120, 145, 0.15)",
          textHighlight: "rgba(222, 120, 145, 0.25)",
          blue: "#1453db",
          purple: "#7054a0",
          green: "#44c199",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      GlossaryEnhancer(),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "relative" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      //Plugin.CustomOgImages(),
    ],
  },
}

export default config
