import { QuartzTransformerPlugin } from "../types"
import { Root, Content } from "mdast"
import { toString } from "mdast-util-to-string"
import { VFile } from "vfile"

export const GlossaryEnhancer: QuartzTransformerPlugin = () => {
  return {
    name: "GlossaryEnhancer",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root, file: VFile) => {
            
            // 1. Check Frontmatter
            const fm = file.data?.frontmatter
            if (!fm || fm.glossary !== true) {
              return
            }

            const newChildren: Content[] = []
            let inStageSection = false
            let firstBoxCreated = false

            // 2. Process content
            for (let i = 0; i < tree.children.length; i++) {
              const node = tree.children[i]
              
              // Detect Heading Level 2
              if (node.type === 'heading' && node.depth === 2) {
                
                // Rule: Always close the previous section when hitting ANY H2
                if (inStageSection) {
                  newChildren.push({ type: 'html', value: '</div>' })
                  inStageSection = false
                }

                // Lookahead: Does this heading have content beneath it?
                const nextNode = tree.children[i + 1]
                const hasContent = nextNode && !(nextNode.type === 'heading' && nextNode.depth === 2)

                if (hasContent) {
                  // Add spacer before the very first box
                  if (!firstBoxCreated) {
                     newChildren.push({ type: 'html', value: '<br/>' }) 
                     firstBoxCreated = true
                  }

                  // Generate generic class from header text
                  const text = toString(node)
                  const slug = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                  
                  // Open Box
                  inStageSection = true
                  newChildren.push({ type: 'html', value: `<div class="glossary-card ${slug}">` })
                  
                  // Render the Header
                  newChildren.push(node)
                } 

                // CRITICAL CHANGE:
                // We always 'continue' here. 
                // If hasContent was true, we pushed the node above.
                // If hasContent was false, we pushed NOTHING (effectively deleting the empty header).
                continue
              }

              // Add normal content nodes
              newChildren.push(node)
            }

            // Close final section if open
            if (inStageSection) {
              newChildren.push({ type: 'html', value: '</div>' })
            }

            tree.children = newChildren
          }
        }
      ]
    },
  }
}