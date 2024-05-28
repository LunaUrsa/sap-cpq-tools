import { Route, Routes } from "react-router-dom"

import FormulaPage from "../views/FormulaPage"
import InfoPage from "../views/InfoPage"
import ModsPage from "../views/ModPage"
import ShortcutsPage from "../views/ShortcutsPage"
import OptionsView from "../views/OptionsView"


export const Routing: React.FC = () => {


  return (
    <Routes>
      <Route path="/" element={<ShortcutsPage />} />
      {/* This is needed to display the home page when the extension is opened */}
      <Route path="/#" element={<ShortcutsPage />} />
      <Route path="/shortcuts" element={<ShortcutsPage />} />
      <Route path="/formula" element={<FormulaPage />} />
      <Route path="/mods" element={<ModsPage />} />
      <Route path="/options" element={<OptionsView />} />
      <Route path="/info" element={<InfoPage />} />
    </Routes>
  )
}