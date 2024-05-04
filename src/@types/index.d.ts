interface Shortcut {
  id: string;
  key: string;
  destination: string;
  isError: boolean;
}

interface ShortcutsListProps {
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
}

interface SiteMap {
  [category: string]: {
    [subCategory: string]: string;
  };
}
