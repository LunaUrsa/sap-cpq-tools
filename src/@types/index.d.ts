interface Shortcut {
  id: string;
  name: string;
  key: string;
  destination: string;
}

type NestedStringMap = {
  [key: string]: string | NestedStringMap;
};

interface ShortcutsListProps {
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
}
