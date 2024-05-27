import 'webextension-polyfill';
import { loadAndValidateStorageItem, isValidUserOptions, isValidCodeOptions, isValidModList, isValidShortcutList } from './utils';
import { defaultUserPreferences, defaultCodePreferences, defaultMods, defaultShortcuts } from '../../../packages/shared/lib/constants';
import customCode from './codeMirrorMods';

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

async function handleShortcuts() {
  // console.info('Handling shortcuts');
  chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
  });
  // console.log('Shortcuts handled');
}

async function initSettings() {
  // console.log('Initializing settings');
  await Promise.all([
    loadAndValidateStorageItem('userOptions', isValidUserOptions, defaultUserPreferences),
    loadAndValidateStorageItem('codeMirrorOptions', isValidCodeOptions, defaultCodePreferences),
    loadAndValidateStorageItem('mods', isValidModList, defaultMods),
    loadAndValidateStorageItem('shortcuts', isValidShortcutList, defaultShortcuts)
  ]);

  // console.log('Settings initialized, applying mods and handling shortcuts.');
  await injectCss();
  await injectCode();
  await handleShortcuts();
}

initSettings();


chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  // Any time a tab changes, attempt to inject the code and apply mods
  // console.log('Tab updated:', tabId, changeInfo, tab.url)
  if (changeInfo.status === 'complete') {
    injectCss();
    injectCode();
  }
});