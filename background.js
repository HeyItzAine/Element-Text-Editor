const MENU_ID = "edit-page-text";

function createContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: "Edit text on this page",
      contexts: ["all"]
    });
  });
}

chrome.runtime.onInstalled.addListener(createContextMenu);
chrome.runtime.onStartup.addListener(createContextMenu);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== MENU_ID || !tab?.id) return;

  chrome.tabs.sendMessage(tab.id, { type: "OPEN_TEXT_EDITOR" }, () => {
    // Browser-internal pages do not allow content scripts.
    if (chrome.runtime.lastError) return;
  });
});
