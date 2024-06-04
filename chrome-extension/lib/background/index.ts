import 'webextension-polyfill';
import { loadAndValidateStorageItem, isValidUserOptions, isValidCodeOptions, isValidModList, isValidShortcutList } from '../../../packages/shared/lib/utils';
import { defaultUserPreferences, defaultCodePreferences, defaultMods, defaultShortcuts } from '../../../packages/shared/lib/constants';
import customCode from './codeMirrorMods';
import handleShortcuts from './shortcuts';

// console.log('Background script loaded');

async function injectCss() {
  // console.log('Applying mods');

  const storage = await chrome.storage.local.get("mods"); // asdf
  if (!storage.mods) return;
  // console.debug('Mods:', storage.mods);

  const mods = JSON.parse(storage.mods) as Mod[];
  if (Array.isArray(mods) && mods.length > 0) {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab?.url || activeTab.url.startsWith('chrome')) {
        // console.debug(`Not applying mods to ${activeTab?.url}`)
        return;
      }
      const modPromises = mods.map(mod => {
        if (activeTab?.id && mod.isEnabled && mod.isValidCode && activeTab.id > -1) {
          return chrome.scripting.insertCSS({
            target: { tabId: activeTab.id, allFrames: true },
            css: mod.content,
          }).then(() => {
            // console.info('Mod applied', mod);
          }).catch(err => {
            console.error('Failed to apply mod:', mod, err);
          });
        } else {
          // console.info('Mod not applied:', mod);
          return Promise.resolve();
        }
      });

      await Promise.all(modPromises);
      // console.log('Mods applied');
    });
  } else {
    // console.log('No mods to apply');
  }
}

async function injectCode() {
  // console.log('Injecting code changes')

  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url || !activeTab.id || activeTab.url.startsWith('chrome')) {
      return;
    }
    // Need to get the storage here because chrome.s torage doesn't work in injected scripts
    const storage = await chrome.storage.local.get("codeMirrorOptions");
    // console.log('Storage:', storage)
    if (!storage.codeMirrorOptions) return;
    const codeMirrorOptions = JSON.parse(storage.codeMirrorOptions) as CodeMirrorOptions;
    // console.log('CodeMirror options:', codeMirrorOptions)
    chrome.scripting
      .executeScript({
        target: { tabId: activeTab.id, allFrames: true },
        world: 'MAIN', // This is VERY important, otherwise it doesn't work
        func: customCode,
        args: [codeMirrorOptions],
      });
    // .then(() => console.log("injected a function"));
  });
}

async function initSettings() {
  // console.log('Initializing settings');
  await Promise.all([
    loadAndValidateStorageItem('userOptions', isValidUserOptions, defaultUserPreferences),
    loadAndValidateStorageItem('codeMirrorOptions', isValidCodeOptions, defaultCodePreferences),
    loadAndValidateStorageItem('mods', isValidModList, defaultMods),
    loadAndValidateStorageItem('shortcuts', isValidShortcutList, defaultShortcuts)
  ]);

  // Allows users to open the side panel by clicking on the action toolbar icon
  const userOptions = await chrome.storage.local.get('userOptions');
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: userOptions.openInSidePanel })
    .catch((error) => console.error(error));

  // console.log('Settings initialized, applying mods and handling shortcuts.');
  await injectCss();
  await injectCode();
  handleShortcuts();
}

initSettings();


chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // Any time a tab changes, attempt to inject the code and apply mods
  // console.log('Tab updated:', tabId, changeInfo, tab.url)
  if (changeInfo.status === 'complete') {
    injectCss();
    injectCode();
    handleShortcuts();
  }
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   // This generic listener is used to handle messages from the content script
//   console.log('Background script received message:', request)
//   if (request.action === 'download') {
//     // When the "open in vscode" button is clicked, the content script sends a message to the background script
//     // The background script downloads the code and then opens it in VSCode
//     chrome.downloads.download({
//       url: request.url,
//       filename: request.filename,
//       saveAs: false,
//       conflictAction: 'overwrite',
//     }, (downloadId) => {
//       if (chrome.runtime.lastError) {
//         console.log(' Sending error response')
//         sendResponse({ success: false, error: chrome.runtime.lastError.message });
//         return;
//       }

//       // Listen for the download to complete
//       chrome.downloads.onChanged.addListener(function listener(downloadDelta) {
//         // console.log('Download delta:', downloadDelta)
//         if (downloadDelta.id === downloadId && downloadDelta.state && downloadDelta.state.current === 'complete') {
//           // console.log('Download complete:', downloadDelta)
//           chrome.downloads.search({ id: downloadId }, (results) => {
//             if (results && results.length > 0) {
//               // console.log('Download item:', results[0])
//               // console.log('Sending message to content script: downloadComplete')
//               // console.log('Sending success response')
//               sendResponse({
//                 action: 'downloadComplete',
//                 filePath: results[0].filename // Note: This is not the full file path, but the download item
//               });
//             }
//           });
//           // Remove the listener once the download is complete
//           chrome.downloads.onChanged.removeListener(listener);
//         }
//       });
//     });
//     return true; // Indicates that the response will be sent asynchronously
//   }
// });
