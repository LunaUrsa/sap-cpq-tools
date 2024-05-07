import React from "react";
import ShortcutsList from "./ShortcutsList";

const ShortcutsPage: React.FC<ShortcutsListProps> = ({
  shortcuts,
  setShortcuts,
}) => {
  return (
    <div>
      <ShortcutsList shortcuts={shortcuts} setShortcuts={setShortcuts} />
    </div>
  );
};

export default ShortcutsPage;
