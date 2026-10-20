let lastTarget = null;
let editorHost = null;

function findTextNodeAtPoint(event) {
  let range = null;

  if (document.caretPositionFromPoint) {
    const position = document.caretPositionFromPoint(event.clientX, event.clientY);
    if (position?.offsetNode?.nodeType === Node.TEXT_NODE) {
      return position.offsetNode;
    }
  }

  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  }

  return range?.startContainer?.nodeType === Node.TEXT_NODE
    ? range.startContainer
    : null;
}

document.addEventListener("contextmenu", (event) => {
  if (editorHost?.contains(event.target)) return;

  const textNode = findTextNodeAtPoint(event);
  const element = event.target instanceof Element ? event.target : null;
  lastTarget = textNode?.isConnected
    ? { node: textNode }
    : element?.childElementCount === 0 && element.firstChild?.nodeType === Node.TEXT_NODE
      ? { node: element.firstChild }
      : null;
}, true);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "OPEN_TEXT_EDITOR") openEditor();
});

function openEditor() {
  if (!lastTarget?.node?.isConnected) {
    showToast("Right-click some page text first.");
    return;
  }

  const originalText = lastTarget.node.nodeValue ?? "";

  if (!originalText.trim()) {
    showToast("That element does not contain editable text.");
    return;
  }

  editorHost?.remove();
  editorHost = document.createElement("div");
  editorHost.dataset.pageTextEditor = "true";
  const shadow = editorHost.attachShadow({ mode: "closed" });

  const panel = document.createElement("section");
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "Edit page text");
  panel.innerHTML = `
    <style>
      :host { all: initial; }
      section { position: fixed; z-index: 2147483647; top: 20px; right: 20px;
        width: min(360px, calc(100vw - 40px)); padding: 16px; border-radius: 12px;
        background: #fff; color: #182230; box-shadow: 0 8px 32px #0004;
        font: 14px/1.45 system-ui, sans-serif; }
      h2 { margin: 0 0 10px; font-size: 16px; }
      p { margin: 0 0 10px; color: #526071; font-size: 12px; }
      label { display: block; margin: 0 0 5px; color: #344257; font-size: 12px; font-weight: 600; }
      textarea { box-sizing: border-box; width: 100%; min-height: 110px; resize: vertical;
        padding: 9px; border: 1px solid #aab4c0; border-radius: 7px;
        color: #182230; background: white; font: inherit; }
      .hint { margin: 8px 0 0; color: #788397; font-size: 11px; }
      .actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
      button { border: 0; border-radius: 7px; padding: 8px 12px; cursor: pointer;
        font: 600 13px system-ui, sans-serif; }
      #cancel { background: #edf0f4; color: #182230; }
      #save { background: #2459d3; color: white; }
      button:focus-visible, textarea:focus-visible { outline: 2px solid #2459d3; outline-offset: 2px; }
    </style>
    <h2>Edit page text</h2>
    <p>Changes apply in this tab. Reload the page to restore its original text.</p>
    <label for="text-value">Selected text</label>
    <textarea id="text-value" aria-label="Selected text"></textarea>
    <p class="hint">Ctrl+Enter saves · Esc cancels</p>
    <div class="actions"><button id="cancel" type="button">Cancel</button>
    <button id="save" type="button">Save</button></div>
  `;

  const textarea = panel.querySelector("textarea");
  textarea.value = originalText;
  panel.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeEditor();
    }
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      panel.querySelector("#save").click();
    }
  });
  panel.querySelector("#cancel").addEventListener("click", closeEditor);
  panel.querySelector("#save").addEventListener("click", () => {
    if (!lastTarget?.node?.isConnected) {
      showToast("The selected text is no longer on the page.");
      closeEditor();
      return;
    }

    lastTarget.node.nodeValue = textarea.value;
    closeEditor();
  });
  shadow.append(panel);
  document.documentElement.append(editorHost);
  textarea.focus();
  textarea.select();
}

function closeEditor() {
  editorHost?.remove();
  editorHost = null;
}

function showToast(message) {
  editorHost?.remove();
  editorHost = document.createElement("div");
  const shadow = editorHost.attachShadow({ mode: "closed" });
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = "position:fixed;z-index:2147483647;top:20px;right:20px;padding:12px 16px;border-radius:9px;background:#182230;color:white;font:14px system-ui,sans-serif;box-shadow:0 4px 18px #0004";
  shadow.append(toast);
  document.documentElement.append(editorHost);
  setTimeout(closeEditor, 2400);
}
