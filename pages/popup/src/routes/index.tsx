import { Route, Routes } from "react-router-dom"

import FormulaPage from "../views/FormulaPage"
import InfoPage from "../views/InfoPage"
import ModsPage from "../views/ModPage"
import ShortcutsPage from "../views/ShortcutsPage"

export const Routing: React.FC<RoutingProps> = ({
  mods,
  setMods,
  shortcuts,
  setShortcuts,
  preferences,
  setPreferences
}) => (
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
      path="/shortcuts"
      element={
        <ShortcutsPage shortcuts={shortcuts} setShortcuts={setShortcuts} />
      }
    />
    <Route path="/formula" element={<FormulaPage preferences={preferences} />} />
    <Route
      path="/mods"
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
)