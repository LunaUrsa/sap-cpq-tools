import '@src/Popup.css';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EnhancedToolbar from "./components/Toolbar";
import { Routing } from './routes';
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';

const theme = createTheme({
  // Customize your theme here
});

const Popup = () => {
  const [mods, setMods] = useState<Mod[]>([]);
  const [userOptions, setUserOptions] = useState<UserOptions>({} as UserOptions);
  const [codeMirrorOptions, setCodeMirrorOptions] = useState<CodeMirrorOptions>({} as CodeMirrorOptions);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('shortcuts' as Page);
  const isInitialMount = useRef(true);
  const navigate = useNavigate();

  console.debug('popup page loaded');

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

  useEffect(() => {
    if (isInitialMount.current) {
      if (currentPage) {
        navigate(currentPage);
      }
      isInitialMount.current = false;
    }
  }, [currentPage, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveToStorage = useCallback((key: string, value: any) => {
    chrome.storage.local.set({ [key]: JSON.stringify(value) });
  }, []);

  useEffect(() => {
    saveToStorage('userOptions', userOptions);
  }, [userOptions, saveToStorage]);

  useEffect(() => {
    saveToStorage('mods', mods);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab.url || activeTab.url.startsWith('chrome://')) {
        return;
      }
      mods.forEach((mod: Mod) => {
        if (mod?.content && mod?.isEnabled && mod?.isValidCode && activeTab.id) {
          chrome.scripting.insertCSS({
            target: { tabId: activeTab.id, allFrames: true },
            css: mod.content,
          });
        }
      });
      console.info('Mods have been applied to this page!');
    });
  }, [mods, saveToStorage]);

  useEffect(() => {
    saveToStorage('shortcuts', shortcuts);
  }, [shortcuts, saveToStorage]);

  useEffect(() => {
    saveToStorage('currentPage', currentPage);
  }, [currentPage, saveToStorage]);

  return (
    <ThemeProvider theme={theme}>
      <div className=".App">
        <EnhancedToolbar
          mods={mods}
          setMods={setMods}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Routing
          mods={mods}
          setMods={setMods}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          preferences={userOptions}
          setPreferences={setUserOptions}
          codeMirrorOptions={codeMirrorOptions}
          setCodeMirrorOptions={setCodeMirrorOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
