import ShortcutsList from "./ShortcutsList";
import AddShortcutForm from "./AddShortcutForm";
import React from "react";

function ShortcutsPage() {
  return (
    <div>
      <AddShortcutForm />
      <ShortcutsList />
    </div>
  );
}

export default ShortcutsPage;
