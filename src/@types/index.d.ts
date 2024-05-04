interface Shortcut {
  id: string;
  key: string;
  destination: string;
  isError: boolean;
}

type NestedStringMap = {
  [key: string]: string | NestedStringMap;
};

interface ShortcutsListProps {
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
}
