import '@src/Popup.css';
import React, {
  useState,
  useEffect,
  useRef,
  // ComponentPropsWithoutRef 
} from "react";

import {
  // exampleThemeStorage,
  // useStorageSuspense,
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';
import { useNavigate } from 'react-router-dom';

// import { DOMMessage, DOMMessageResponse } from "./types";
import EnhancedToolbar from "./components/Toolbar";
import { Routing } from './routes';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  // Customize your theme here
});

const Popup = () => {
  // const theme = useStorageSuspense(exampleThemeStorage);
  const [mods, setMods] = useState<Mod[]>([]);
  const [preferences, setPreferences] = useState<UserOptions>({} as UserOptions);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('shortcuts' as Page);
  const isInitialMount = useRef(true);

  const navigate = useNavigate();

  // Load user preferences, mods, shortcuts, and last page from local storage
  useEffect(() => {
    chrome.storage.local.get(["userPreferences", "mods", "shortcuts", "currentPage"], (result) => {
      if (result.userPreferences) {
        setPreferences(JSON.parse(result.userPreferences));
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
    });
  }, []);

  // Navigate to the last visited page if different from the current page
  useEffect(() => {
    if (isInitialMount.current) {
      if (currentPage) {
        navigate(currentPage);
      }
    }
  }, [currentPage, navigate]);

  // If preferences change, save them to the local storage
  useEffect(() => {
    if (preferences) {
      chrome.storage.local.set({ userPreferences: JSON.stringify(preferences) });
    }
  }, [preferences]);

  // If mods change, save them to the local storage
  // ALSO: Execute the mods if they are valid
  useEffect(() => {
    if (mods) {
      chrome.storage.local.set({ mods: JSON.stringify(mods) });
    }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];


      if (!activeTab.url || activeTab.url.startsWith('chrome://')) {
        return;
      }

      mods.forEach((mod: Mod) => {
        if (
          mod?.content &&
          mod?.isEnabled &&
          mod?.isValidCode
        ) {

          if (!activeTab.id) {
            return;
          }

          // console.log('Applying mod:', mod.name, mod.content);
          chrome.scripting.insertCSS({
            target: { tabId: activeTab.id, allFrames: true },
            // css: mod.content,
            css: mod.content,
          })
        }
      });
      console.info('SAP CPQ Mods have been applied to this page!')
    });
  }, [mods]);

  useEffect(() => {
    if (shortcuts) {
      chrome.storage.local.set({ shortcuts: JSON.stringify(shortcuts) });
    }
  }, [shortcuts]);

  // Save the current page to local storage whenever it changes
  useEffect(() => {
    chrome.storage.local.set({ currentPage });
  }, [currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <div className=".App">
        <EnhancedToolbar
          mods={mods}
          setMods={setMods}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          preferences={preferences}
          setPreferences={setPreferences}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Routing
          mods={mods}
          setMods={setMods}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          preferences={preferences}
          setPreferences={setPreferences}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </ThemeProvider>
  );
};

// const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorageSuspense(exampleThemeStorage);
//   return (
//     <button
//       className={
//         props.className +
//         ' ' +
//         'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
//         (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </button>
//   );
// };

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
