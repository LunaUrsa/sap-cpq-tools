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
import ShortcutListener from "./components/ShortcutListener";
import { stripIndent } from "common-tags";
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
      const storedPreferences = result.userPreferences;
      if (storedPreferences) {
        try {
          const parsedPreferences = JSON.parse(storedPreferences);
          if (parsedPreferences && typeof parsedPreferences === "object") setPreferences(parsedPreferences);
          else setPreferences(defaultPreferences);
        } catch (error) {
          console.error("Failed to parse user preferences:", error);
          setPreferences(defaultPreferences);
        }
      } else setPreferences(defaultPreferences);
    });
  }, []);

  // If preferences change, save them to the local storage
  useEffect(() => {
    if (preferences) {
      chrome.storage.local.set({ userPreferences: JSON.stringify(preferences) });
    }
  }, [preferences]);

  // Load the mods from the local storage when the app is activated
  useEffect(() => {
    chrome.storage.local.get("mods", (result) => {
      const storedMods = result.mods;
      if (storedMods) {
        try {
          const parsedMods = JSON.parse(storedMods);
          if (Array.isArray(parsedMods) && parsedMods.length > 0) {
            // console.log('Mods found:', parsedMods)
            setMods(parsedMods);
          } else {
            // console.error("Mods list is empty, resetting:")
            setMods(defaultMods)
          };
        } catch (error) {
          // console.error("Failed to parse mods:", error);
          setMods(defaultMods);
        }
      } else {
        // console.error('No mods found')
        setMods(defaultMods);
      }
    });
  }, []);

  // If mods change, save them to the local storage
  // ALSO: Execute the mods if they are valid
  useEffect(() => {
    if (mods) {
      chrome.storage.local.set({ mods: JSON.stringify(mods) });
    }
  }, [mods]);

  // Get the shortcut list from the local storage
  useEffect(() => {
    // console.log("shortcuts", shortcuts);
    chrome.storage.local.get("shortcuts", (result) => {
      const storedShortcuts = result.shortcuts;
      if (storedShortcuts) {
        try {
          const parsedShortcuts = JSON.parse(storedShortcuts);
          if (Array.isArray(parsedShortcuts) && parsedShortcuts.length > 0) {
            setShortcuts(parsedShortcuts);
          } else setShortcuts(defaultShortcuts);
        } catch (error) {
          console.error("Failed to parse shortcuts:", error);
          setShortcuts(defaultShortcuts);
        }
      } else setShortcuts(defaultShortcuts);
    });
  }, []);

  useEffect(() => {
    if (shortcuts) {
      chrome.storage.local.set({ shortcuts: JSON.stringify(shortcuts) });
    }
  }, [shortcuts]);

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <div className=".App">
          <ShortcutListener />
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

const defaultMods = [
  {
    id: "1",
    name: "Example CSS Mod",
    content: stripIndent`
        body {
          background: red;
        }
      `,
    isEnabled: true,
    isValidCode: true,
  },
] as Mod[];

const defaultPreferences = { codeMirrorTheme: "dark" } as UserOptions;

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

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
