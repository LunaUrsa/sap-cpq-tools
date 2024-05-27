import '@src/Popup.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EnhancedToolbar from "./components/Toolbar";
import { Routing } from './routes';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';
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
  // const isInitialMount = useRef(true);
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
        console.debug('setting current page stage from storage', result.currentPage);
        setCurrentPage(result.currentPage);
      }
      if (result.codeMirrorOptions) {
        setCodeMirrorOptions(JSON.parse(result.codeMirrorOptions));
      }
    });
  }, []);

  useEffect(() => {
    if (currentPage) {
      navigate(currentPage);
    }
  }, [currentPage, navigate]);

  useEffect(() => {
    saveToStorage('userOptions', userOptions);
  }, [userOptions]);

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
    });
  }, [mods]);

  useEffect(() => {
    saveToStorage('shortcuts', shortcuts);
  }, [shortcuts]);

  useEffect(() => {
    saveToStorage('currentPage', currentPage);
  }, [currentPage]);

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
