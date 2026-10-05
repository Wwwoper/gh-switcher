const COLOR = { 16: "icons/icon16.png", 32: "icons/icon32.png" };
const GRAY = { 16: "icons/icon16_gray.png", 32: "icons/icon32_gray.png" };

function update(tabId, url) {
  let onGithub = false;
  try {
    onGithub = !!url && new URL(url).hostname === "github.com";
  } catch {}
  chrome.action.setIcon({ tabId, path: onGithub ? COLOR : GRAY });
}

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.url || info.status) update(tabId, tab.url);
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => update(tabId, tab.url));
});
