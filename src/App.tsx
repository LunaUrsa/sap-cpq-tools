import React, { useState, useEffect } from "react";
import "./App.css";
// import { DOMMessage, DOMMessageResponse } from "./types";
import ShortcutsPage from "./components/ShortcutsPage";
import InfoPage from "./components/InfoPage";
import { AppBar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import EnhancedToolbar from "./components/Toolbar";
import ShortcutListener from "./components/ShortcutListener";
import ModsPage from "./components/ModPage";
import FormulaPage from "./components/FormulaPage";
import { stripIndent } from "common-tags";

function App() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [preferences, setPreferences] = useState<UserOptions | null>(null);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences");
    try {
      const parsedPreferences = storedPreferences
        ? JSON.parse(storedPreferences)
        : null;
      if (parsedPreferences && typeof parsedPreferences === "object") {
        setPreferences(parsedPreferences);
      } else {
        setPreferences({ codeMirrorTheme: "none" }); // Default theme
      }
    } catch (error) {
      console.error("Failed to parse user preferences:", error);
      setPreferences({ codeMirrorTheme: "none" }); // Default theme in case of error
    }
  }, []);

  useEffect(() => {
    if (preferences) {
      localStorage.setItem("userPreferences", JSON.stringify(preferences));
    }
  }, [preferences]);

  const defaultMods = [
    {
      id: "1",
      name: "Example Mod",
      language: "javascript",
      content: stripIndent`
          // This is an example mod
          console.log("Hello, world!");
        `,
      isEnabled: true,
      isValidCode: true,
      isValidLanguage: true,
    },
  ] as Mod[];
  // Get the mod list from the local storage
  useEffect(() => {
    const storedMods = localStorage.getItem("mods");
    if (storedMods) {
      // console.log("storedMods", storedMods);
      try {
        const parsedMods = JSON.parse(storedMods);
        if (Array.isArray(parsedMods) && parsedMods.length > 0) {
          // Check if it's actually an array
          setShortcuts(parsedMods);
        } else {
          setMods(defaultMods);
        }
      } catch (e) {
        console.error("Failed to parse shortcuts:", e);
        setMods(defaultMods);
      }
    } else {
      setMods(defaultMods);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mods", JSON.stringify(mods));
    console.log("mods", mods);
    mods.forEach((mod) => {
      if (
        mod.content &&
        mod.isEnabled &&
        mod.isValidCode &&
        mod.isValidLanguage
      ) {
        try {
          const func = new Function(mod.content);
          func();
        } catch (error) {
          console.error("Error executing mod:", error);
        }
      }
    });
  }, [mods]);

  const defaultShortcuts = [
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

  // Get the shortcut list from the local storage
  useEffect(() => {
    const storedShortcuts = localStorage.getItem("shortcuts");
    if (storedShortcuts) {
      // console.log("storedShortcuts", storedShortcuts);
      try {
        const parsedShortcuts = JSON.parse(storedShortcuts);
        if (Array.isArray(parsedShortcuts) && parsedShortcuts.length > 0) {
          // Check if it's actually an array
          setShortcuts(parsedShortcuts);
        } else {
          setShortcuts(defaultShortcuts);
        }
      } catch (e) {
        console.error("Failed to parse shortcuts:", e);
        setShortcuts(defaultShortcuts);
      }
    } else {
      setShortcuts(defaultShortcuts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  // const [title, setTitle] = React.useState("");
  // const [headlines, setHeadlines] = React.useState<string[]>([]);

  // React.useEffect(() => {
  //   /**
  //    * We can't use "chrome.runtime.sendMessage" for sending messages from React.
  //    * For sending messages from React we need to specify which tab to send it to.
  //    */
  //   chrome.tabs &&
  //     chrome.tabs.query(
  //       {
  //         active: true,
  //         currentWindow: true,
  //       },
  //       (tabs) => {
  //         /**
  //          * Sends a single message to the content script(s) in the specified tab,
  //          * with an optional callback to run when a response is sent back.
  //          *
  //          * The runtime.onMessage event is fired in each content script running
  //          * in the specified tab for the current extension.
  //          */
  //         chrome.tabs.sendMessage(
  //           tabs[0].id ?? 0,
  //           { type: "GET_DOM" } as DOMMessage,
  //           (response: DOMMessageResponse) => {
  //             setTitle(response.title);
  //             setHeadlines(response.headlines);
  //           },
  //         );
  //       },
  //     );
  // });

  return (
    <div className="App">
      <ShortcutListener />
      <AppBar position="static">
        <EnhancedToolbar
          mods={mods}
          setMods={setMods}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </AppBar>
      <Routes>
        <Route
          path="/"
          element={
            <ShortcutsPage shortcuts={shortcuts} setShortcuts={setShortcuts} />
          }
        />
        {/* This is needed to display the home page when the extension is opened */}
        <Route
          path="/#"
          element={
            <ShortcutsPage shortcuts={shortcuts} setShortcuts={setShortcuts} />
          }
        />
        <Route
          path="/shortcut"
          element={
            <ShortcutsPage shortcuts={shortcuts} setShortcuts={setShortcuts} />
          }
        />
        <Route path="/formula" element={<FormulaPage />} />
        <Route
          path="/styling"
          element={
            <ModsPage
              mods={mods}
              setMods={setMods}
              preferences={preferences}
              setPreferences={setPreferences}
            />
          }
        />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
