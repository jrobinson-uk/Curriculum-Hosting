---
draft: true
---

# Active Author: Editing Workflows

This guide covers the day-to-day process for creating, editing, and previewing content. Please ensure you have completed the **"Active Author: One-Time Setup Guide"** before proceeding.

---

### Previewing Your Changes Locally

Before you submit your work, it is crucial to preview it to ensure formatting is correct and links are working.

1.  Open a terminal window.
2.  Make sure you are in the root directory of the repository.
3.  Run the following command:
    ```bash
    npx quartz build --serve
    ```
4.  Your terminal will show a local address, usually `http://localhost:8080`. Open this URL in your web browser to see a live, local version of the site. The site will automatically refresh as you save changes to your files.
5.  To stop the server, go back to your terminal and press `Ctrl + C`.

> **Advanced Tip:** You can use an Obsidian plugin like "Shell commands" to create a button within Obsidian that runs the `npx quartz build --serve` command for you.

---

### Choosing Your Workflow

There are two main ways to contribute, depending on the scope of your work:

* **Workflow A (Direct to `draft`):** For small, quick fixes and minor additions. This is faster for simple changes.
* **Workflow B (Feature Branch):** For larger, multi-file changes, new sections, or work that will take a long time. **This is the recommended and safest approach.** It isolates your work and makes it easier for others to review.

---

### Workflow A: Quick Edits on the `draft` Branch

1.  **Ensure you are on the `draft` branch.** You can check this in the bottom status bar in Obsidian or by using the Obsidian Git plugin's sidebar.
2.  **Pull the latest changes.** The "Obsidian Git" plugin should do this automatically when you open the vault. You can also trigger it manually from the command palette or plugin sidebar.
3.  **Make your edits** in Obsidian as you normally would.
4.  **Commit and Push your changes:**
    * Open the "Obsidian Git" pane from the left sidebar.
    * You will see a list of your changed files.
    * Write a clear commit message in the text box (e.g., "Corrected definition of pedagogy").
    * Click **"Stage all"** then **"Commit"**. Or, stage files individually.
    * Click the **"Push"** icon (up arrow) to send your committed changes to the remote `draft` branch on GitHub.

### Workflow B: Major Changes on a Feature Branch

1.  **Start from an up-to-date `draft` branch.** Before creating a new branch, make sure you have the latest changes from `draft` by pulling from the remote.
2.  **Create a New Branch:**
    * Open the command palette (`Ctrl/Cmd + P`).
    * Search for "Obsidian Git: Create new branch".
    * Give your branch a descriptive name. Good practice is to prefix it with a type, like `feature/glossary-update` or `fix/broken-links`.
3.  **Work on Your Branch:** Make all your edits as needed. You can commit your work to this branch as many times as you like. It is completely isolated from the main `draft` branch, so you can take your time.
4.  **Push Your Branch:** When you are ready for a review (or just to back up your work), use the "Obsidian Git" plugin to **push** your changes. The first time you do this, it will publish your new branch to the central GitHub repository.
5.  **Create a Pull Request on GitHub:**
    * Go to the repository on the GitHub website.
    * You will see a yellow banner prompting you to "Compare & pull request" for your newly pushed branch. Click it.
    * Set the title and a clear description of the changes you made.
    * Ensure the base branch is **`draft`** and the compare branch is your feature branch.
    * Click "Create pull request". This notifies the team to review your work.
6.  **Merge and Clean Up:** Once your PR is reviewed and approved by a teammate, it can be merged into the `draft` branch. After merging, you can safely delete the feature branch.

