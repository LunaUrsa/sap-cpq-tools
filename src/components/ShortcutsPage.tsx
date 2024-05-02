import ShortcutsList from "./ShortcutsList";
import AddShortcutForm from "./AddShortcutForm";
import React from "react";

function ShortcutsPage() {
  return (
    <div style={{ marginTop: "16px" }}>
      <AddShortcutForm />
      <ShortcutsList />
    </div>
  );
}

export default ShortcutsPage;
