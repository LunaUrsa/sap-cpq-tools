import 'webextension-polyfill';
import { stripIndent } from "common-tags";

console.log('background loaded');
console.log("Edit 'apps/chrome-extension/lib/background/index.ts' and save to reload.");

async function initSettings() {

  const defaultPreferences = { codeMirrorTheme: "dark" } as UserOptions;

  const defaultMods = [
    {
      id: "1",
      name: "Example CSS Mod",
      content: stripIndent`
        body {
          background-color: red !important;
        }
      `,
      isEnabled: true,
      isValidCode: true,
    },
  ] as Mod[];

  const defaultShortcuts = [
    {
      id: "0",
      key: "1",
      destination:
        "https://help.sap.com/docs/SAP_CPQ/884885f05e6b4c8082254d4d9d63f19b/e5f2e0b33a9e4e7ea2a22e27dba2e76f.html",
      isUnique: true,
      isValidDestination: true,
    },
    {
      id: "1",
      key: "Q",
      destination: "Home > Quote List",
      isUnique: true,
      isValidDestination: true,
    },
    {
      id: "2",
      key: "W",
      destination: "Home > Script Workbench",
      isUnique: true,
      isValidDestination: true,
    },
    // {
    //   id: "3",
    //   key: "E",
    //   destination: "",
    //   isUnique: true,
    //   isValidDestination: true,
    // },
    {
      id: "4",
      key: "R",
      destination: "UI Design > Responsive Templates",
      isUnique: true,
      isValidDestination: true,
    },
    {
      id: "5",
      key: "T",
      destination: "Quotes > Quote Tables",
      isUnique: true,
      isValidDestination: true,
    },
    // {
    //   id: "6",
    //   key: "A,
    //   destination: "",
    //   isUnique: true,
    //   isValidDestination: true,
    // },
    // {
    //   id: "7",
    //   key: "S",
    //   destination: "",
    //   isUnique: true,
    //   isValidDestination: true,
    // },
    {
      id: "8",
      key: "D",
      destination: "Home > Developer Console",
      isUnique: true,
      isValidDestination: true,
    },
    {
      id: "9",
      key: "F",
      destination: "Quotes > Custom Fields",
      isUnique: true,
      isValidDestination: true,
    },
    {
      id: "10",
      key: "G",
      destination: "Develop > Global Scripts",
      isUnique: true,
      isValidDestination: true,
    },
    // {
    //   id: "11",
    //   key: "Z",
    //   destination: "",
    //   isUnique: true,
    //   isValidDestination: true,
    // },
    // {
    //   id: "12",
    //   key: "X",
    //   destination: "",
    //   isUnique: true,
    //   isValidDestination: true,
    // },
    {
      id: "13",
      key: "C",
      destination: "Develop > Custom Actions",
      isUnique: true,
      isValidDestination: true,
    },
    // {
    //   id: "14",
    //   key: "V",
    //   destination: "",
    //   isUnique: true,
    //   isValidDestination: true,
    // },
    // {
    //   id: "15",
    //   key: "B",
    //   destination: "",
    //   isUnique: true,
    //   isValidDestination: true,
    // },
  ] as Shortcut[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidUserOptions(obj: any): obj is UserOptions {
    const parsedObj = JSON.parse(obj);
    return (
      typeof parsedObj === "object" &&
      parsedObj.codeMirrorTheme &&
      typeof parsedObj.codeMirrorTheme === "string"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidModList(obj: any): obj is Mod[] {
    const parsedObj = JSON.parse(obj);
    return (
      Array.isArray(parsedObj) &&
      parsedObj.length > 0 &&
      parsedObj.every((mod) => {
        return (
          typeof mod === "object" &&
          mod.id &&
          mod.name &&
          mod.content &&
          mod.isEnabled &&
          mod.isValidCode
        );
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidShortcutList(obj: any): obj is Shortcut[] {
    const parsedObj = JSON.parse(obj);
    return (
      Array.isArray(parsedObj) &&
      parsedObj.length > 0 &&
      parsedObj.every((shortcut) => {
        return (
          typeof shortcut === "object" &&
          shortcut.id &&
          shortcut.key &&
          shortcut.destination &&
          shortcut.isUnique &&
          shortcut.isValidDestination
        );
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function loadAndValidateStorageItem<T>(key: string, isValidFunction: (obj: any) => obj is T, defaultData: T): Promise<void> {
    return new Promise<void>((resolve) => {
      chrome.storage.local.get(key, (result) => {
        const storedData = result[key];
        if (storedData) {
          try {
            if (isValidFunction(storedData)) {
              console.log(`background ${key} are valid!`);
              resolve();
            } else {
              console.log(`background ${key} are NOT valid, resetting to default!`, defaultData);
              chrome.storage.local.set({ [key]: JSON.stringify(defaultData) }, resolve);
            }
          } catch (error) {
            console.error(`Failed to parse ${key}:`, error);
            chrome.storage.local.set({ [key]: JSON.stringify(defaultData) }, resolve);
          }
        } else {
          console.error(`${key} are empty! Resetting to default`, result);
          chrome.storage.local.set({ [key]: JSON.stringify(defaultData) }, resolve);
        }
      });
    });
  }

  await Promise.all([
    loadAndValidateStorageItem('userPreferences', isValidUserOptions, defaultPreferences),
    loadAndValidateStorageItem('mods', isValidModList, defaultMods),
    loadAndValidateStorageItem('shortcuts', isValidShortcutList, defaultShortcuts)
  ]);

  console.log('All settings loaded and validated, applying mods now...');
  await applyMods();
  console.log('Handling shortcuts')
  await handleShortcuts();
}

async function applyMods() {
  const storage = await chrome.storage.local.get("mods");
  // console.log("storage", storage);
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
            css: mod.content,
          })
          console.log('Mod applied')
        });
      }
    });
  } else {
    console.log('No mods found')
  };

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url) {
      applyMods();  // Re-run the function to apply mods
    }
  });
}

async function handleShortcuts() {
  chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
  });
}

console.log('Initializing settings')
initSettings();
