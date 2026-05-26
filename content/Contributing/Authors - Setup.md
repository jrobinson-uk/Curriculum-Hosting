---
draft: true
---
# Author: One-Time Setup Guide

This guide is for core team members and frequent contributors who will be actively authoring and editing content for the Teaching and Learning Hub.

Following these steps will configure your local machine with all the necessary tools to edit, preview, and contribute changes efficiently using Obsidian.

---

### Step 1: Prerequisites & Software Installation

Before you begin, you will need the following software. If you do not have administrative rights on your machine to install these, please contact the IT team first.

1.  **Node.js:** This is required to preview the website locally.
    * Download and install the latest LTS version from [the official Node.js website](https://nodejs.org/).
2.  **Git:** This is the underlying version control system.
    * Install Git from [the official Git website](https://git-scm.com/downloads). The Git Desktop app is optional but can be helpful.
3.  **Obsidian:** This will be our primary Markdown editor.
    * Download and install it from [the Obsidian website](https://obsidian.md/).

### Step 2: Clone the Content Repository

Now, you need to get a local copy of the site's content.

1.  Open your terminal (Terminal on Mac, PowerShell or Git Bash on Windows).
2.  Navigate to the directory where you want to store the project (e.g., `cd Documents/Projects`).
3.  Clone the repository using the following command. This downloads the entire project to a new folder.
    ```bash
    git clone <your-repository-url.git>
    ```
4.  Navigate into the newly created project folder:
    ```bash
    cd <repository-folder-name>
    ```
5.  Install the required Node.js packages. This is a one-time command that reads the `package.json` file and downloads the dependencies needed for the Quartz preview server.
    ```bash
    npm install
    ```

### Step 3: Configure Your Obsidian Vault

1.  Open the Obsidian application.
2.  In the startup screen, click **"Open folder as vault"**.
3.  Navigate to and select the repository folder you just cloned.
4.  Trust the author and turn off "Restricted Mode" by clicking the button when prompted. This is necessary to install community plugins.

### Step 4: Install and Configure the 'Obsidian Git' Plugin

This plugin allows you to manage commits and push changes directly from Obsidian.

1.  In Obsidian, go to **Settings > Community Plugins** and click **"Browse"**.
2.  Search for **"Obsidian Git"** and click **"Install"**, then **"Enable"**.
3.  Close the browser and open the settings for "Obsidian Git" under the "Community Plugins" section.
4.  We recommend enabling the following setting for convenience:
    * **Pull on vault open:** ON. This automatically fetches the latest changes when you open the vault.

> **Warning: Potential for Conflicts**
> Having "Pull on vault open" enabled is great, but remember to commit and push your own changes before closing Obsidian. If you have uncommitted local changes and the plugin pulls new remote changes, you may run into a "merge conflict" that will need to be resolved.

**Your setup is now complete!** You are ready to start editing and contributing. Please see the **"Active Author: Editing Workflows"** guide for next steps.