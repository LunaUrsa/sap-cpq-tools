/* eslint-disable @typescript-eslint/no-explicit-any */
export const saveToStorage = (key: string, value: any) => {
  const storedValue = typeof value === 'string' ? value : JSON.stringify(value);
  // console.log(`Saving ${key} to storage:`, storedValue)
  chrome.storage.local.set({ [key]: storedValue });
};

export function isValidUserOptions(obj: any): obj is UserOptions {
  try {
    const parsedObj = JSON.parse(obj);
    return typeof parsedObj === "object" && typeof parsedObj.isDarkMode === "boolean" && typeof parsedObj.language === "string";
  } catch {
    return false;
  }
}

export function isValidCodeOptions(obj: any): obj is CodeMirrorOptions {
  try {
    const parsedObj = JSON.parse(obj);
    return typeof parsedObj === "object" && typeof parsedObj.autocapitalize === "boolean";
  } catch {
    return false;
  }
}

export function isValidModList(obj: any): obj is Mod[] {
  try {
    const parsedObj = JSON.parse(obj);
    return Array.isArray(parsedObj) && parsedObj.every(mod => typeof mod === "object" && typeof mod.id === "string");
  } catch {
    return false;
  }
}

export function isValidShortcutList(obj: any): obj is Shortcut[] {
  try {
    const parsedObj = JSON.parse(obj);
    return Array.isArray(parsedObj) && parsedObj.every(shortcut => typeof shortcut === "object" && typeof shortcut.id === "string");
  } catch {
    return false;
  }
}

export async function loadAndValidateStorageItem<T>(key: string, isValidFunction: (obj: any) => obj is T, defaultData: T): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.storage.local.get(key, (result) => {
      const storedData = result[key];
      if (storedData && isValidFunction(storedData)) {
        // console.log(`${key} is valid.`);
        resolve();
      } else {
        console.log(`${key} is invalid or empty, resetting to default.`);
        chrome.storage.local.set({ [key]: JSON.stringify(defaultData) }, resolve);
      }
    });
  });
}
