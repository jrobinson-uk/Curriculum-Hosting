---
aliases:
context:
initials:
isGlossaryTerm: true
sidebar: false
---
<%*
tp.hooks.on_all_templates_executed(async () => {
  const file = tp.file.find_tfile(tp.file.path(true));
  await tp.app.fileManager.processFrontMatter(file, (frontmatter) => {
    frontmatter["context"] = `${context.trim()}`;
  });
});
%>
<%* 
const folderPath = "content/Glossary";
let term = await tp.system.prompt("Enter Glossary Term"); let context = await tp.system.prompt("Enter Context (if needed)");
if (!term || term.trim() === "") { term = tp.file.title; }
// 3. Determine Filename based on Context condition 
let finalFileName = term.trim(); 
if (context && context.trim() !== "") { 
finalFileName += ` (${context.trim()})`; }
let fullPath = `${folderPath}/${finalFileName}`
await tp.file.move(`${fullPath}`); 
%>
## Aliases 
%%ALIASES_START%%
%%ALIASES_END%%
## Definitions

> [!primary] Younger Learners
> 

> [!secondary] Older Learners
> 

> [!educator] Educators
>