<%*
/*
BATCH SYNC SCRIPT
This version is designed to run on MULTIPLE files.
Ideal for use as a Startup Template or a "Maintenance" script.
*/

// --- CONFIGURATION ---
const targetFolder = "content/Glossary"; // Folder to scan
const requiredProperty = "isGlossaryTerm"; // Only sync files with this YAML key
const startMarker = "%%ALIASES_START%%";
const endMarker = "%%ALIASES_END%%";
// ---------------------

// 1. Get all markdown files in the vault
const files = app.vault.getMarkdownFiles();

// 2. Filter for files in our folder that have the specific property
const targets = files.filter(f => {
    const isInside = f.path.startsWith(targetFolder);
    const cache = app.metadataCache.getFileCache(f);
    const hasProperty = cache?.frontmatter?.[requiredProperty] === true;
    return isInside && hasProperty;
});

// 3. Process each file
for (const file of targets) {
    const metadata = app.metadataCache.getFileCache(file)?.frontmatter;
    const aliases = metadata?.aliases;

    let bulletList = "";
    if (aliases) {
        const aliasArray = Array.isArray(aliases) ? aliases : [aliases];
        bulletList = aliasArray.map(a => `- ${a}`).join("\n");
    } else {
        bulletList = "";
    }

    let content = await app.vault.read(file);
    const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, "g");
    const replacement = `${startMarker}\n${bulletList}\n${endMarker}`;

    if (content.match(regex)) {
        const newContent = content.replace(regex, replacement);
        if (newContent !== content) {
            await app.vault.modify(file, newContent);
            console.log(`Synced aliases for: ${file.path}`);
        }
    }
}

return ""; // Keep it silent
%>