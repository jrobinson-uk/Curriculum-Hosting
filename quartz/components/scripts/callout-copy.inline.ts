document.addEventListener("nav", () => {
  // Only execute if this is a glossary page
  const isGlossary = document.querySelector(".glossary-page")
  if (!isGlossary) return

  // The specific callout types we want to target
  const targets = ['primary', 'secondary', 'educator']
  
  targets.forEach(type => {
    const callouts = document.querySelectorAll(`.callout[data-callout="${type}"]`)
    
    callouts.forEach(callout => {
      const title = callout.querySelector(".callout-title")
      const content = callout.querySelector(".callout-content")
      
      // Safety check and prevent duplicate buttons if nav fires twice
      if (title && content && !title.querySelector(".callout-copy-button")) {
        const btn = document.createElement("button")
        btn.className = "callout-copy-button"
        btn.type = "button"
        btn.innerText = "Copy"
        
        btn.addEventListener("click", (e) => {
          e.stopPropagation() // Prevent callout from collapsing/expanding
          
          // Get plain text from the content div (removes HTML tags)
          const text = (content as HTMLElement).innerText.trim()
          
          navigator.clipboard.writeText(text).then(() => {
            btn.innerText = "Copied!"
            btn.classList.add("success")
            
            setTimeout(() => {
              btn.innerText = "Copy"
              btn.classList.remove("success")
            }, 2000)
          })
        })
        
        title.appendChild(btn)
      }
    })
  })
})