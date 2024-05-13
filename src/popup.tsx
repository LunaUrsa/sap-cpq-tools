import { useEffect, useState } from "react"
import { MemoryRouter } from "react-router-dom"

import "./style.css"

import { AppBar } from "@mui/material"
import { stripIndent } from "common-tags"

import { Routing } from "~routes"

import ShortcutListener from "./components/ShortcutListener"
import EnhancedToolbar from "./components/Toolbar"

// This should match ./public/manifest.json
const hosts = [
  "localhost", // For testing
  "*.cpq.cloud.sap/*",
  "*.workflow.cloud.sap/*"
]

const defaultMods = [
  {
    id: "1",
    name: "Example Script Mod",
    language: "javascript",
    content: stripIndent`
        console.log("Hello, world!");
      `,
    isEnabled: true,
    isValidCode: true,
    isValidLanguage: true
  },
  {
    id: "2",
    name: "Example CSS Mod",
    language: "css",
    content: stripIndent`
        body {
          background: red;
        }
      `,
    isEnabled: true,
    isValidCode: true,
    isValidLanguage: true
  }
] as Mod[]

const defaultPreferences = { codeMirrorTheme: "dark" } as UserOptions

const defaultShortcuts = [
  {
    id: "0",
    key: "1",
    destination:
      "https://help.sap.com/docs/SAP_CPQ/884885f05e6b4c8082254d4d9d63f19b/e5f2e0b33a9e4e7ea2a22e27dba2e76f.html",
    isUnique: true,
    isValidDestination: true
  },
  {
    id: "1",
    key: "Q",
    destination: "Home > Quote List",
    isUnique: true,
    isValidDestination: true
  },
  {
    id: "2",
    key: "W",
    destination: "Home > Script Workbench",
    isUnique: true,
    isValidDestination: true
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
    isValidDestination: true
  },
  {
    id: "5",
    key: "T",
    destination: "Quotes > Quote Tables",
    isUnique: true,
    isValidDestination: true
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
    isValidDestination: true
  },
  {
    id: "9",
    key: "F",
    destination: "Quotes > Custom Fields",
    isUnique: true,
    isValidDestination: true
  },
  {
    id: "10",
    key: "G",
    destination: "Develop > Global Scripts",
    isUnique: true,
    isValidDestination: true
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
    isValidDestination: true
  }
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
] as Shortcut[]

function App() {
  const [mods, setMods] = useState<Mod[]>([])
  const [preferences, setPreferences] = useState<UserOptions | null>(null)
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([])

  // Load user preferences from the local storage when the app is activated
  // Set the default preferences if there are none
  useEffect(() => {
    const storedPreferences = localStorage.getItem("userPreferences")
    if (storedPreferences) {
      try {
        const parsedPreferences = storedPreferences
          ? JSON.parse(storedPreferences)
          : null
        if (parsedPreferences && typeof parsedPreferences === "object") {
          setPreferences(parsedPreferences)
        } else setPreferences(defaultPreferences)
      } catch (error) {
        console.error("Failed to parse user preferences:", error)
        setPreferences(defaultPreferences)
      }
    } else setPreferences(defaultPreferences)
  }, [])

  // If preferences change, save them to the local storage
  useEffect(() => {
    if (preferences) {
      localStorage.setItem("userPreferences", JSON.stringify(preferences))
    }
  }, [preferences])

  // Load the mods from the local storage when the app is activated
  useEffect(() => {
    const storedMods = localStorage.getItem("mods")
    if (storedMods) {
      // console.log("storedMods", storedMods);
      try {
        const parsedMods = JSON.parse(storedMods)
        if (Array.isArray(parsedMods) && parsedMods.length > 0) {
          // Check if it's actually an array
          setMods(parsedMods)
        } else setMods(defaultMods)
      } catch (e) {
        console.error("Failed to parse mods:", e)
        setMods(defaultMods)
      }
    } else setMods(defaultMods)
  }, [])

  // If mods change, save them to the local storage
  // ALSO: Execute the mods if they are valid
  useEffect(() => {
    localStorage.setItem("mods", JSON.stringify(mods))

    // Check if the page we're currently on is part of the hosts list above
    const currentHost = window.location.hostname
    if (!hosts.some((host) => currentHost === host)) {
      return
    }

    // console.log("mods", mods);
    mods.forEach((mod) => {
      if (
        mod.content &&
        mod.isEnabled &&
        mod.isValidCode &&
        mod.isValidLanguage
      ) {
        switch (mod.language) {
          case "javascript":
            try {
              const func = new Function(mod.content)
              func()
            } catch (error) {
              console.error("Error executing mod:", error)
            }
            break
          case "css": {
            const style = document.createElement("style")
            style.innerHTML = mod.content
            document.head.appendChild(style)
            break
          }
          default:
            break
        }
      }
    })
  }, [mods])

  // Get the shortcut list from the local storage
  useEffect(() => {
    const storedShortcuts = localStorage.getItem("shortcuts")
    if (storedShortcuts) {
      // console.log("storedShortcuts", storedShortcuts);
      try {
        const parsedShortcuts = JSON.parse(storedShortcuts)
        if (Array.isArray(parsedShortcuts) && parsedShortcuts.length > 0) {
          // Check if it's actually an array
          setShortcuts(parsedShortcuts)
        } else setShortcuts(defaultShortcuts)
      } catch (e) {
        setShortcuts(defaultShortcuts)
      }
    } else setShortcuts(defaultShortcuts)
  }, [])

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts))
  }, [shortcuts])

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
    <MemoryRouter>
      <div className="new-tab">
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
        <Routing
          mods={mods}
          setMods={setMods}
          shortcuts={shortcuts}
          setShortcuts={setShortcuts}
          preferences={preferences}
          setPreferences={setPreferences}
        />
      </div>
    </MemoryRouter>
  )
}

export default App
