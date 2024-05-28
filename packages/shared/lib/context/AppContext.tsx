import React, { createContext, useState, useEffect, ReactNode, FC, useMemo } from 'react';
import { defaultCodePreferences, defaultShortcuts, defaultMods, defaultUserPreferences } from '../constants';

export interface AppContextProps {
  mods: Mod[];
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>;
  userOptions: UserOptions;
  setUserOptions: React.Dispatch<React.SetStateAction<UserOptions>>;
  codeMirrorOptions: CodeMirrorOptions;
  setCodeMirrorOptions: React.Dispatch<React.SetStateAction<CodeMirrorOptions>>;
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
  currentPage: Page;
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [mods, setMods] = useState<Mod[]>(defaultMods);
  const [userOptions, setUserOptions] = useState<UserOptions>(defaultUserPreferences);
  const [codeMirrorOptions, setCodeMirrorOptions] = useState<CodeMirrorOptions>(defaultCodePreferences);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(defaultShortcuts);
  const [currentPage, setCurrentPage] = useState<Page>('shortcuts' as Page);

  useEffect(() => {
    chrome.storage.local.get(["userOptions", "mods", "shortcuts", "currentPage", "codeMirrorOptions"], (result) => {
      if (result.userOptions) {
        setUserOptions(JSON.parse(result.userOptions));
      }
      if (result.mods) {
        setMods(JSON.parse(result.mods));
      }
      if (result.shortcuts) {
        setShortcuts(JSON.parse(result.shortcuts));
      }
      if (result.currentPage) {
        setCurrentPage(result.currentPage);
      }
      if (result.codeMirrorOptions) {
        setCodeMirrorOptions(JSON.parse(result.codeMirrorOptions));
      }
    });
  }, []);
  const value = useMemo(() => ({
    mods,
    setMods,
    userOptions,
    setUserOptions,
    codeMirrorOptions,
    setCodeMirrorOptions,
    shortcuts,
    setShortcuts,
    currentPage,
    setCurrentPage,
  }), [mods, userOptions, codeMirrorOptions, shortcuts, currentPage]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
