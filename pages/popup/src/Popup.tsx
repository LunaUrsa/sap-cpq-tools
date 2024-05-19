import '@src/Popup.css';
import React, {
  useState,
  useEffect,
  // ComponentPropsWithoutRef 
} from "react";

import {
  // exampleThemeStorage,
  // useStorageSuspense,
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';
import {
  // MemoryRouter, 
  HashRouter,
} from "react-router-dom"
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
  const [preferences, setPreferences] = useState<UserOptions | null>(null);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);


  // Load user preferences from the local storage when the app is activated
  // Set the default preferences if there are none
  useEffect(() => {
    chrome.storage.local.get("userPreferences", (result) => {
      setPreferences(JSON.parse(result.userPreferences));
    });

    chrome.storage.local.get("mods", (result) => {
      console.log("popup mods", result);
      setMods(JSON.parse(result.mods));
    });

    // console.log("shortcuts", shortcuts);
    chrome.storage.local.get("shortcuts", (result) => {
      setShortcuts(JSON.parse(result.shortcuts));
    });
  }, []);

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
  }, [mods]);

  useEffect(() => {
    if (shortcuts) {
      chrome.storage.local.set({ shortcuts: JSON.stringify(shortcuts) });
    }
  }, [shortcuts]);

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <div className=".App">
          <EnhancedToolbar
            mods={mods}
            setMods={setMods}
            shortcuts={shortcuts}
            setShortcuts={setShortcuts}
            preferences={preferences}
            setPreferences={setPreferences}
          />
          <Routing
            mods={mods}
            setMods={setMods}
            shortcuts={shortcuts}
            setShortcuts={setShortcuts}
            preferences={preferences}
            setPreferences={setPreferences}
          />
        </div>
      </ThemeProvider>
    </HashRouter>
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
