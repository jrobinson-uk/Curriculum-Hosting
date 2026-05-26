import { QuartzComponent, QuartzComponentConstructor } from "./types"

function Logo() {
  return (
    <div class="logo">
      <img src="/static/icon.svg" alt="logo" />
    </div>
  )
}

Logo.css = `
.logo img {
  height: 30px;
}
`

export default (() => Logo) satisfies QuartzComponentConstructor