interface Shortcut {
  id: string;
  name: string;
  key: string;
  destination: string;
}

type NestedStringMap = {
  [key: string]: string | NestedStringMap;
};
