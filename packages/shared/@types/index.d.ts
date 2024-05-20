interface Shortcut {
  id: string;
  key: string;
  destination: string;
  isUnique: boolean;
  isValidDestination: boolean;
}

interface ShortcutsListProps {
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
}

interface Mod {
  id: string;
  name: string;
  content: string;
  isEnabled: boolean;
  isValidCode: boolean;
}

interface ModListProps {
  mods: Mod[];
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>;
  preferences: UserOptions;
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions>>;
}

interface ModEditProps {
  mod: Mod;
  setMod: (id: string, field: keyof Mod, value: string | boolean) => void;
  preferences: UserOptions;
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions>>;
}

interface SiteMap {
  [category: string]: {
    [subCategory: string]: string;
  };
}

interface UserOptions {
  codeMirrorTheme: string;
}

interface ToolbarProps {
  mods: Mod[];
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>;
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
  preferences: UserOptions;
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions>>;
  currentPage: Page
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>
}

enum Page {
  MODS = 'mods',
  SHORTCUTS = 'shortcuts',
  INFO = 'info',
  FORMULA = 'formula'
}

interface RoutingProps {
  mods: Mod[]
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>
  shortcuts: Shortcut[]
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>
  preferences: UserOptions
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions>>
  currentPage: Page
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>
}