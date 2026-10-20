# Element Text Editor

Element Text Editor lets you change text directly on a webpage. Right-click text, choose **Edit text on this page**, enter the replacement, and save. The change appears in the current tab and disappears when you reload the page.

## Features

- Adds **Edit text on this page** to the browser's right-click menu.
- Opens a compact editor with the text under the pointer already selected.
- Edits only the clicked text node, preserving surrounding links and formatting.
- Supports **Ctrl+Enter** to save and **Esc** to cancel.
- Includes a toolbar popup with quick instructions.
- Makes no network requests and stores no page text.

Element Text Editor is intended for desktop Chromium-based browsers that support Manifest V3 and unpacked extensions, including Microsoft Edge, Google Chrome, Brave, Opera, and Vivaldi.

## Install in Browser

1. On this repository's GitHub page, select **Code**, then **Download ZIP**. Extract the archive. You can also clone the repository with Git.
2. Open your browser's extension manager:
   - Microsoft Edge: `edge://extensions`
   - Google Chrome: `chrome://extensions`
   - Brave: `brave://extensions`
   - Opera: `opera:extensions`
   - Vivaldi: `vivaldi://extensions` or **Menu > Tools > Extensions**
3. Turn on **Developer mode**.
4. Select **Load unpacked** (called **Load Unpacked Extension** in Opera) and choose the extracted `Element-Text-Editor` folder that contains `manifest.json`.
5. Reload any pages that were already open.

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
