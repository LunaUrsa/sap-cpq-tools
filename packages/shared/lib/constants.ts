export const defaultUserPreferences: UserOptions = {
  isDarkMode: true,
  language: 'en',
};

export const codeMirrorThemes = {
  Default: "default",
  Light: "light",
  Dark: "dark",
  Day3024: "3024-day",
  Night3024: "3024-night",
  Abbott: "abbott",
  Abcdef: "abcdef",
  AmbianceMobile: "ambiance-mobile",
  Ambiance: "ambiance",
  AyuDark: "ayu-dark",
  AyuMirage: "ayu-mirage",
  Base16Dark: "base16-dark",
  Base16Light: "base16-light",
  Bespin: "bespin",
  Blackboard: "blackboard",
  Cobalt: "cobalt",
  Colorforth: "colorforth",
  Darcula: "darcula",
  Dracula: "dracula",
  DuotoneDark: "duotone-dark",
  DuotoneLight: "duotone-light",
  Eclipse: "eclipse",
  Elegant: "elegant",
  ErlangDark: "erlang-dark",
  GruvboxDark: "gruvbox-dark",
  Hopscotch: "hopscotch",
  Icecoder: "icecoder",
  Idea: "idea",
  Isotope: "isotope",
  Juejin: "juejin",
  LesserDark: "lesser-dark",
  Liquibyte: "liquibyte",
  Lucario: "lucario",
  MaterialDarker: "material-darker",
  MaterialOcean: "material-ocean",
  MaterialPalenight: "material-palenight",
  Material: "material",
  Mbo: "mbo",
  MdnLike: "mdn-like",
  Midnight: "midnight",
  Monokai: "monokai",
  Moxer: "moxer",
  Neat: "neat",
  Neo: "neo",
  Night: "night",
  Nord: "nord",
  OceanicNext: "oceanic-next",
  PandaSyntax: "panda-syntax",
  ParaisoDark: "paraiso-dark",
  ParaisoLight: "paraiso-light",
  PastelOnDark: "pastel-on-dark",
  Railscasts: "railscasts",
  Rubyblue: "rubyblue",
  Seti: "seti",
  Shadowfox: "shadowfox",
  Solarized: "solarized",
  Ssms: "ssms",
  TheMatrix: "the-matrix",
  TomorrowNightBright: "tomorrow-night-bright",
  TomorrowNightEighties: "tomorrow-night-eighties",
  Ttcn: "ttcn",
  Twilight: "twilight",
  VibrantInk: "vibrant-ink",
  XqDark: "xq-dark",
  XqLight: "xq-light",
  Yeti: "yeti",
  Yonce: "yonce",
  Zenburn: "zenburn"
}

export const defaultCodePreferences: CodeMirrorOptions = {
  // The starting value of the editor. Can be a string, or a document object.
  // value: '',
  // The mode to use.
  // When not given, this will default to the first mode that was loaded.
  // It may be a string, which either simply names the mode or is a MIME type associated with the mode.
  // Alternatively, it may be an object containing configuration options for the mode.
  // mode: {
  //   name: "python",
  //   singleLineStringErrors: false, 
  //   version: 3
  // },
  pythonVersion: 2,
  // Explicitly set the line separator for the editor. 
  // By default (value null), the document will be split on CRLFs as well as lone CRs and LFs,
  // and a single LF will be used as line separator in all output (such as getValue). 
  lineSeparator: null,
  // The theme to style the editor with. 
  // You must make sure the CSS file defining the corresponding .cm-s-[name] styles is loaded.
  theme: 'darcula' as CodeMirrorTheme, // SAP default = "default"
  // How many spaces a block (whatever that means in the edited language) should be indented.
  indentUnit: 4,
  // Whether to use the context-sensitive indentation that the mode provides (or just indent the same as the line before).
  smartIndent: true,
  // The width of a tab character.
  tabSize: 4,
  // Whether, when indenting, the first N*tabSize spaces should be replaced by N tabs.
  indentWithTabs: false,
  // Configures whether the editor should re-indent the current line when a character is typed that might 
  // change its proper indentation (only works if the mode supports indentation).
  electricChars: true,
  // Flips overall layout and selects base paragraph direction to be left-to-right or right-to-left. 
  direction: "ltr",
  // Determines whether horizontal cursor movement through right-to-left (Arabic, Hebrew) text is 
  // visual (pressing the left arrow moves the cursor left) or
  // logical (pressing the left arrow moves to the next lower index in the string, which is visually right in right-to-left text). 
  rtlMoveVisually: false,
  // Configures the key map to use. The default is "default", which is the only key map defined in codemirror.js itself.
  // You can also use 'emacs', 'sublime', 'vim' or a custom key map that you define.
  // https://codemirror.net/5/doc/manual.html#keymaps
  // TODO: Add more keymaps
  // keyMap: "default",
  // Can be used to specify extra key bindings for the editor, alongside the ones defined by keyMap.
  // extraKeys: {
  //   "Ctrl-Space": "autocomplete"
  // },
  // Allows you to configure the behavior of mouse selection and dragging.
  // configureMouse: null,
  // Whether CodeMirror should scroll or wrap for long lines.
  lineWrapping: true,
  // Whether to show line numbers to the left of the editor.
  lineNumbers: true,
  // At which number to start counting lines. 
  firstLineNumber: 1,
  // Can be used to add extra gutters (beyond or instead of the line number gutter).
  // gutters: [],
  // Determines whether the gutter scrolls along with the content horizontally (false) 
  // or whether it stays fixed during horizontal scrolling (true, the default).
  fixedGutter: true,
  // Chooses a scrollbar implementation. The default is "native", showing native scrollbars.
  // scrollbarStyle: "native", // SAP default = "native"
  // When fixedGutter is on, and there is a horizontal scrollbar, by default the gutter will be visible to the left of this scrollbar.
  coverGutterNextToScrollbar: false,
  // Selects the way CodeMirror handles input and focus.
  // inputStyle: "textarea",
  // This label is read by the screenreaders when CodeMirror text area is focused.
  // screenReaderLabel: null,
  // Whether the cursor should be drawn when a selection is active. 
  showCursorWhenSelecting: false,
  // When enabled, which is the default, doing copy or cut when there is no selection will copy or cut the whole lines that have cursors on them.
  lineWiseCopyCut: true,
  // When pasting something from an external source (not from the editor itself), 
  // if the number of lines matches the number of selection, CodeMirror will by default insert one line per selection.
  pasteLinesPerSelection: true,
  // Determines whether multiple selections are joined as soon as they touch (the default) or only when they overlap (true).
  selectionsMayTouch: false,
  // The maximum number of undo levels that the editor stores. Note that this includes selection change events. Defaults to 200.
  undoDepth: 200,
  // The period of inactivity (in milliseconds) that will cause a new history event to be started when typing or deleting. 
  historyEventDelay: 1250,
  // The tab index to assign to the editor. If not given, no tab index will be assigned.
  // tabindex: null,
  // Can be used to make CodeMirror focus itself on initialization.
  autofocus: true, // SAP default = false
  // Some addons run user-visible strings (such as labels in the interface) through the phrase method to allow for translation. 
  // phrases: null,

  // Below this a few more specialized, low-level options are listed. 
  //These are only useful in very specific situations.
  // You might want to skip them the first time you read this manual.

  // Controls whether drag-and-drop is enabled.
  // dragDrop: true,
  // When set (default is null) only files whose type is in the array can be dropped into the editor. 
  // allowDropFileTypes: null,
  // Half-period in milliseconds used for cursor blinking.
  cursorBlinkRate: 530,
  // How much extra space to always keep above and below the cursor when approaching the top or bottom of the visible view in a scrollable document.
  cursorScrollMargin: 0,
  // Determines the height of the cursor. Default is 1, meaning it spans the whole height of the line.
  // cursorHeight: 1,
  // If set to true (the default), will keep the cursor height constant for an entire line (or wrapped part of a line). 
  // When false, the cursor's height is based on the height of the adjacent reference character.
  // singleCursorHeightPerLine: true,
  // Controls whether, when the context menu is opened with a click outside of the current selection, the cursor is moved to the point of the click. 
  resetSelectionOnContextMenu: true,
  // Highlighting is done by a pseudo background-thread that will work for workTime milliseconds, and then use timeout to sleep for workDelay milliseconds. 
  // workTime: 100,
  // workDelay: 100,
  // Indicates how quickly CodeMirror should poll its input textarea for changes (when focused).
  // pollInterval: 100,
  // By default, CodeMirror will combine adjacent tokens into a single span if they have the same class.
  // flattenSpans: true,
  // When enabled (off by default), an extra CSS class will be added to each token, indicating the (inner) mode that produced it, prefixed with "cm-m-".
  // addModeClass: false,
  // When highlighting long lines, in order to stay responsive, the editor will give up and simply style the rest of the line as plain text when it reaches a certain position.
  maxHighlightLength: 10000,
  // Specifies the amount of lines that are rendered above and below the part of the document that's currently scrolled into view.
  // Can be set to Infinity to make sure the whole document is always rendered, and thus the browser's text search works on it.
  // This will have bad effects on performance of big documents.
  viewportMargin: 10,
  // Specifies whether or not spellcheck will be enabled on the input.
  spellcheck: true, // SAP default = false
  // Specifies whether or not autocapitalization will be enabled on the input.
  autocapitalize: false,
  // Specifies whether or not autocorrect will be enabled on the input.
  autocorrect: false,
  // when set to true, will make the editor full-screen (as in, taking up the whole browser window). 
  // fullScreen: false,
  // SAP addons
  // The following are addon options that are not enabled by default.
  // TODO: Add more options
  // hintOptions: null,
  // Defines an option matchBrackets which, when set to true or an options object, causes matching brackets to be highlighted whenever the cursor is next to them.
  matchBrackets: true,
  // Adds an option showTrailingSpace which, when enabled, adds the CSS class cm-trailingspace to stretches of whitespace at the end of lines.
  showTrailingSpace: true,
  // SAP custom options, id what these are
  // disableInput: false,
  // moveInputWithCursor: true,
  // tabMode: "shift",
  // wholeLineUpdateBefore: true,
  // My custom options
  foldGutter: true,
  matchTags: true,
  linting: true,
  highlightSelectionMatches: true,
  styleActiveLine: true,
  autoCloseTags: true,
  closeBrackets: true,
  // Maybe CM6?
  // highlightActiveLine: true,
  // shortcuts: {},
  // resize: true,
};

export const sapDefaultPreferences: CodeMirrorOptions = {
  // The starting value of the editor. Can be a string, or a document object.
  // value: '',
  // The mode to use.
  // When not given, this will default to the first mode that was loaded.
  // It may be a string, which either simply names the mode or is a MIME type associated with the mode.
  // Alternatively, it may be an object containing configuration options for the mode.
  // mode: {
  //   name: "python",
  //   singleLineStringErrors: false,
  //   version: 3
  // },
  pythonVersion: 3,
  // Explicitly set the line separator for the editor. 
  // By default (value null), the document will be split on CRLFs as well as lone CRs and LFs,
  // and a single LF will be used as line separator in all output (such as getValue). 
  lineSeparator: null,
  // The theme to style the editor with. 
  // You must make sure the CSS file defining the corresponding .cm-s-[name] styles is loaded.
  theme: 'default' as CodeMirrorTheme,
  // How many spaces a block (whatever that means in the edited language) should be indented.
  indentUnit: 4,
  // Whether to use the context-sensitive indentation that the mode provides (or just indent the same as the line before).
  smartIndent: true,
  // The width of a tab character.
  tabSize: 4,
  // Whether, when indenting, the first N*tabSize spaces should be replaced by N tabs.
  indentWithTabs: false,
  // Configures whether the editor should re-indent the current line when a character is typed that might 
  // change its proper indentation (only works if the mode supports indentation).
  electricChars: true,
  // Flips overall layout and selects base paragraph direction to be left-to-right or right-to-left. 
  direction: "ltr",
  // Determines whether horizontal cursor movement through right-to-left (Arabic, Hebrew) text is 
  // visual (pressing the left arrow moves the cursor left) or
  // logical (pressing the left arrow moves to the next lower index in the string, which is visually right in right-to-left text). 
  rtlMoveVisually: false,
  // Configures the key map to use. The default is "default", which is the only key map defined in codemirror.js itself.
  // You can also use 'emacs', 'sublime', 'vim' or a custom key map that you define.
  // https://codemirror.net/5/doc/manual.html#keymaps
  // TODO: Add more keymaps
  // keyMap: "default",
  // Can be used to specify extra key bindings for the editor, alongside the ones defined by keyMap.
  // extraKeys: {
  //   "Ctrl-Space": "autocomplete"
  // },
  // Allows you to configure the behavior of mouse selection and dragging.
  // configureMouse: null,
  // Whether CodeMirror should scroll or wrap for long lines.
  lineWrapping: true,
  // Whether to show line numbers to the left of the editor.
  lineNumbers: true,
  // At which number to start counting lines. 
  firstLineNumber: 1,
  // Can be used to add extra gutters (beyond or instead of the line number gutter).
  // gutters: [],
  // Determines whether the gutter scrolls along with the content horizontally (false) 
  // or whether it stays fixed during horizontal scrolling (true, the default).
  fixedGutter: true,
  // Chooses a scrollbar implementation. The default is "native", showing native scrollbars.
  // scrollbarStyle: "native",
  // When fixedGutter is on, and there is a horizontal scrollbar, by default the gutter will be visible to the left of this scrollbar.
  coverGutterNextToScrollbar: false,
  // Selects the way CodeMirror handles input and focus.
  // inputStyle: "textarea",
  // This label is read by the screenreaders when CodeMirror text area is focused.
  // screenReaderLabel: null,
  // Whether the cursor should be drawn when a selection is active. 
  showCursorWhenSelecting: false,
  // When enabled, which is the default, doing copy or cut when there is no selection will copy or cut the whole lines that have cursors on them.
  lineWiseCopyCut: true,
  // When pasting something from an external source (not from the editor itself), 
  // if the number of lines matches the number of selection, CodeMirror will by default insert one line per selection.
  pasteLinesPerSelection: true,
  // Determines whether multiple selections are joined as soon as they touch (the default) or only when they overlap (true).
  selectionsMayTouch: false,
  // The maximum number of undo levels that the editor stores. Note that this includes selection change events. Defaults to 200.
  undoDepth: 200,
  // The period of inactivity (in milliseconds) that will cause a new history event to be started when typing or deleting. 
  historyEventDelay: 1250,
  // The tab index to assign to the editor. If not given, no tab index will be assigned.
  // tabindex: null,
  // Can be used to make CodeMirror focus itself on initialization.
  autofocus: false,
  // Some addons run user-visible strings (such as labels in the interface) through the phrase method to allow for translation. 
  // phrases: null,

  // Below this a few more specialized, low-level options are listed. 
  //These are only useful in very specific situations.
  // You might want to skip them the first time you read this manual.

  // Controls whether drag-and-drop is enabled.
  // dragDrop: true,
  // When set (default is null) only files whose type is in the array can be dropped into the editor. 
  // allowDropFileTypes: null,
  // Half-period in milliseconds used for cursor blinking.
  cursorBlinkRate: 530,
  // How much extra space to always keep above and below the cursor when approaching the top or bottom of the visible view in a scrollable document.
  cursorScrollMargin: 0,
  // Determines the height of the cursor. Default is 1, meaning it spans the whole height of the line.
  // cursorHeight: 1,
  // If set to true (the default), will keep the cursor height constant for an entire line (or wrapped part of a line). 
  // When false, the cursor's height is based on the height of the adjacent reference character.
  // singleCursorHeightPerLine: true,
  // Controls whether, when the context menu is opened with a click outside of the current selection, the cursor is moved to the point of the click. 
  resetSelectionOnContextMenu: true,
  // Highlighting is done by a pseudo background-thread that will work for workTime milliseconds, and then use timeout to sleep for workDelay milliseconds. 
  // workTime: 100,
  // workDelay: 100,
  // Indicates how quickly CodeMirror should poll its input textarea for changes (when focused).
  // pollInterval: 100,
  // By default, CodeMirror will combine adjacent tokens into a single span if they have the same class.
  // flattenSpans: true,
  // When enabled (off by default), an extra CSS class will be added to each token, indicating the (inner) mode that produced it, prefixed with "cm-m-".
  // addModeClass: false,
  // When highlighting long lines, in order to stay responsive, the editor will give up and simply style the rest of the line as plain text when it reaches a certain position.
  maxHighlightLength: 10000,
  // Specifies the amount of lines that are rendered above and below the part of the document that's currently scrolled into view.
  // Can be set to Infinity to make sure the whole document is always rendered, and thus the browser's text search works on it.
  // This will have bad effects on performance of big documents.
  viewportMargin: 10,
  // Specifies whether or not spellcheck will be enabled on the input.
  spellcheck: false,
  // Specifies whether or not autocapitalization will be enabled on the input.
  autocapitalize: false,
  // Specifies whether or not autocorrect will be enabled on the input.
  autocorrect: false,
  // when set to true, will make the editor full-screen (as in, taking up the whole browser window). 
  // fullScreen: false,
  // SAP addons
  // The following are addon options that are not enabled by default.
  // TODO: Add more options
  // hintOptions: null,
  // Defines an option matchBrackets which, when set to true or an options object, causes matching brackets to be highlighted whenever the cursor is next to them.
  matchBrackets: true,
  // Adds an option showTrailingSpace which, when enabled, adds the CSS class cm-trailingspace to stretches of whitespace at the end of lines.
  showTrailingSpace: true,
  // SAP custom options, id what these are
  // disableInput: false,
  // moveInputWithCursor: true,
  // tabMode: "shift",
  // wholeLineUpdateBefore: true,
  // My custom options
  foldGutter: true,
  matchTags: true,
  linting: true,
  highlightSelectionMatches: true,
  styleActiveLine: true,
  autoCloseTags: false,
  closeBrackets: false,
  // Maybe CM6?
  // highlightActiveLine: true,
  // shortcuts: {},
  // resize: true,
};

export const defaultMods: Mod[] = [
  {
    id: "1",
    name: "Example CSS Mod",
    content: `
      body {
        background-color: purple !important;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
];

export const defaultShortcuts: Shortcut[] = [
  {
    id: "0",
    key: "1",
    destination: "https://help.sap.com/docs/SAP_CPQ/884885f05e6b4c8082254d4d9d63f19b/e5f2e0b33a9e4e7ea2a22e27dba2e76f.html",
    isUnique: true,
    isValidDestination: true,
  },
  // Add other shortcuts as needed
];
