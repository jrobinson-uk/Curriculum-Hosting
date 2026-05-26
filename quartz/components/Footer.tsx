import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
  githubUrl?: string
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const title = cfg.baseUrl
    const githubUrl = opts?.githubUrl
    //if (githubUrl && fileData.filePath) {
    //const editUrl = `${githubUrl}/tree/main/${fileData.filePath}`
      // 4. Return the JSX for the link
  //return (
    //<a href={editUrl} target="_blank" rel="noopener noreferrer">
      //Edit this page on GitHub 🐙
    //</a>
  //)
//} else {
//  // Return null or empty if the data isn't available
  //return null//
//}
    
    return (
      <footer class={`${displayClass ?? ""}`}>
        {title}
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
          {githubUrl && fileData.filePath && (
  <a href={`${githubUrl}/blob/main/${fileData.filePath}`} target="_blank" rel="noopener noreferrer">
    Edit this page in Github
  </a>
)}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor




