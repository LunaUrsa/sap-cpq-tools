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
  isValidLanguage: boolean;
  isValidCode: boolean;
  language: string;
}

interface ModListProps {
  mods: Mod[];
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>;
  preferences: UserOptions | null;
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions | null>>;
}

interface ModEditProps {
  mod: Mod;
  setMod: (id: string, field: keyof Mod, value: string | boolean) => void;
  preferences: UserOptions | null;
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions | null>>;
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
  preferences: UserOptions | null;
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions | null>>;
}
