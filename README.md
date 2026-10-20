# Element Text Editor

Element Text Editor lets you change text directly on a webpage. Right-click text, choose **Edit text on this page**, enter the replacement, and save. The change appears in the current tab and disappears when you reload the page.

## Features

- Adds **Edit text on this page** to the browser's right-click menu.
- Opens a compact editor with the text under the pointer already selected.
- Edits only the clicked text node, preserving surrounding links and formatting.
- Supports **Ctrl+Enter** to save and **Esc** to cancel.
- Includes a toolbar popup with quick instructions.
- Makes no network requests and stores no page text.

## Install in Microsoft Edge

1. Select **Code** on this repository's GitHub page, then **Download ZIP**, and extract the archive. You can also clone the repository with Git.
2. Open `edge://extensions` in Edge.
3. Turn on **Developer mode**.
4. Select **Load unpacked**.
5. Choose the extracted `Element-Text-Editor` folder. Select the folder that contains `manifest.json`.
6. Reload pages that were open before installation.

## Install in Google Chrome

1. Select **Code** on this repository's GitHub page, then **Download ZIP**, and extract the archive. You can also clone the repository with Git.
2. Open `chrome://extensions`.
3. Turn on **Developer mode**.
4. Select **Load unpacked**.
5. Choose the extracted `Element-Text-Editor` folder containing `manifest.json`.
6. Reload pages that were open before installation.

## Use it

1. Open a regular HTTP or HTTPS webpage.
2. Right-click the text you want to change.
3. Select **Edit text on this page**.
4. Replace the selected text, then choose **Save**. Choose **Cancel** or press **Esc** to close without saving.

For example, on the article “Creativity Is a Process, Not an Event,” right-click its heading and change it to “Creativity grows through practice.” The change stays in that tab until it is reloaded.

## Permissions and privacy

The extension runs on HTTP and HTTPS pages to identify the text under the pointer. It reads the clicked text to fill the editor, but it does not send page content anywhere or save it. There are no analytics or remote services. Changes affect only the page currently displayed in your browser and disappear after reload.

Browser-internal pages such as `edge://extensions`, `chrome://extensions`, and some built-in PDF viewers do not allow extensions to edit their content.

## Project files

| File | Purpose |
| --- | --- |
| `manifest.json` | Extension name, permissions, icons, and scripts |
| `background.js` | Creates the right-click menu and opens the editor |
| `content.js` | Finds the clicked text and displays the editor |
| `popup.html`, `popup.css` | Toolbar help popup |
| `icons/` | Extension icons at 16, 48, and 128 pixels |

## License

This project is licensed under the GNU General Public License, version 3. See [LICENSE](LICENSE).
