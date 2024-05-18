import 'webextension-polyfill';

console.log('background loaded');
console.log("Edit 'apps/chrome-extension/lib/background/index.ts' and save to reload.");

async function applyMods() {
  const storage = await chrome.storage.local.get("mods");
  console.log("storage", storage);
  if (!storage.mods) return;

  const mods = JSON.parse(storage.mods)

  if (Array.isArray(mods) && mods.length > 0) {
    console.log("mods", mods);
    mods.forEach((mod: Mod) => {
      if (
        mod &&
        mod.content &&
        mod.isEnabled &&
        mod.isValidCode
      ) {

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          if (!activeTab.id) {
            return;
          }

          if (!activeTab.url || activeTab.url.startsWith('chrome://')) {
            // console.error('Cannot i n j  ect scr  ip ts   i nto chrome:// pages or  extension pages.');
            return;
          }
          console.log("activeTab", activeTab);

          console.log('Applying mod:', mod.name, mod.content);
          chrome.scripting.insertCSS({
            target: { tabId: activeTab.id, allFrames: true },
            // css: mod.content,
            css: 'body { background-color: red !important; }',
          })
          console.log('Mod applied')
        });
      }
    });
  } else {
    console.log('No mods found')
  };
}

applyMods();

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    applyMods();  // Re-run the function to apply mods
  }
});