import { stripIndent } from 'common-tags';

export const defaultUserPreferences: UserOptions = {
  isDarkMode: true,
  language: 'en',
  openInSidePanel: false,
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
    name: "Edit Icon",
    content: stripIndent`
      img[title="Edit"] {
        width: 28px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "2",
    name: "Add New Document Pop-up",
    content: stripIndent`
      #popup1 {
        position: fixed;
        top: 350px;
        left: 1100px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "3",
    name: "Product Configuration Layout",
    content: stripIndent`
      #divConfiguratorLayout {
        width: 1500px;
      }

      #ctl00_cph1_tabsDiv {
        width: 100%;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "4",
    name: "Document Preview Modal",
    content: stripIndent`
      #preview_popup {
        position: fixed;
        top: 20px;
        height: 900px;
        width: 1500px;
      }

      #preview_container {
        height: 100%;
      }

      iframe[src*="tempdoc/preview"] {
        height: 800px;
        width: 1400px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "5",
    name: "Adding Attributes from Simple Products Modal",
    content: stripIndent`
      #ctl00_cph1_attributeControl_ps_pnlTable {
        height: 850px;
        position: fixed;
        top: 25px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "6",
    name: "Tag Builder",
    content: stripIndent`
      #tab-container-1 {
        width: 800px;
      }

      #ddlTags {
        height: 250px;
        width: 750px;
      }

      #PA_ID {
        width: 750px;
      }

      #PAV_ID {
        width: 750px;
        height: 250px;
      }

      textarea.consolelook.form-control {
        height: 200px;
        width: 750px;
      }

      #txtResult {
        height: 300px;
        width: 762px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "7",
    name: "Product Configuration Fields",
    content: stripIndent`
      textarea.form-control[name*="DynPartNumber"] {
        height: 150px;
        width: 600px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "8",
    name: "Rule Text Boxes",
    content: stripIndent`
      #ctl00_cph1_pnlRuleAdministration {
        width: 1600px;
      }

      #conditionDiv {
        width: 550px;
      }

      textarea.form-control[name*="RuleCondition"] {
        height: 250px;
        width: 500px;
      }

      #actionDiv {
        width: 550px;
      }

      #ctl00_cph1_txtRuleAction {
        height: 250px;
        width: 500px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "9",
    name: "Script Events",
    content: stripIndent`
      #ctl00_cph1_lbAfterAdding1 {
        height: 150px;
        width: 400px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "10",
    name: "Promo Banner on Quote Page",
    content: stripIndent`
      div.alert.alert-info {
        z-index: 5;
        opacity: 1;
        position: fixed;
        width: 95%;
        height: 55px;
        top: 135px;
      }

      div.quote-page-main-container {
        margin-top: 55px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "11",
    name: "Save Notifications",
    content: stripIndent`
      #ctl00_cph1_labError {
        font-weight: bold;
        font-size: 18pt;
        position: fixed;
        left: 1200px;
        top: 50px;
        border: solid 1px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "12",
    name: "Window Relocation Formatting",
    content: stripIndent`
      .optsButton {
        background-color: #f5f5f5;
      }

      .rowheight_win {
        height: 675px;
      }

      .leftscript {
        height: inherit !important;
        max-height: 20000px !important;
        width: 50% !important;
      }

      .righttrace {
        display: block !important;
        height: inherit !important;
        max-height: 20000px !important;
        float: right !important;
      }

      .largeleft {
        height: inherit !important;
        max-height: 20000px !important;
        width: 65% !important;
      }

      .smallright {
        height: inherit !important;
        max-height: 20000px !important;
        width: 35% !important;
      }

      .btn_cust1 {
        margin: 0px 5px 8px 5px !important;
      }

      .toolbar_margin_match {
        margin: 10px 0px 10px 0px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "13",
    name: "Script Info",
    content: stripIndent`
      .script-info {
        width: 50%;
      }

      .cm-tab {
        background-color: red !important;
      }

      #wfOptsButton {
        width: 10px;
        width: 70px;
        margin-left: 20px;
        margin-right: 5px;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "14",
    name: "Prod Warning Popup Format",
    content: stripIndent`
      #toolButton img {
        width: 100px;
      }

      #toolButton {
        position: fixed;
        width: 100%;
        bottom: 0px;
        z-index: 1048;
      }

      #toolButton .row {
        float: right;
        margin-right: 5%;
        width: 15%;
      }

      .includeFrame {
        width: 100%;
      }

      #devToolModal .modal-dialog {
        width: 90vw;
        height: 70vh;
      }

      #prodWarningModal {
        background: red;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "15",
    name: "Script IDE",
    content: stripIndent`
      #script-ide>div.head.scriptsNavigationDiv>h2 {
        cursor: pointer;
      }

      #script-ide-section-editor-output {
        float: left;
        width: 100%;
      }

      #script-ide-section {
        float: left;
        width: 100%;
        margin-top: 5px;
      }

      #script-ide-tree {
        width: 100%;
      }

      #script-ide-section-context>div,
      .scriptResouceObjectContent,
      .classInfoMethod {
        font-size: 20px;
      }

      #script-ide-section-context {
        float: left;
        width: 97%;
        position: absolute;
        background-color: #ffff;
        z-index: 100;
      }

      .mattblackmenu ul {
        position: inherit;
      }

      #script-ide-section-empty {
        width: 100%;
      }

      #script-ide {
        width: 99%;
        min-height: inherit;
      }

      #tree {
        height: inherit;
      }

      #newActionButtonDiv {
        position: inherit;
      }

      .floatLeft {}

      #footer {
        display: none;
      }

      .scriptsNavigationDiv h2 {
        display: block;
        float: left;
      }

      .scriptsNavigationDiv a {
        display: block;
        float: right;
        color: #FFFFFF;
      }

      .scriptsNavigationDiv {
        height: 20px;
      }

      #script-ide-section-context.invisible,
      #script-ide-tree.invisible,
      #header.invisible {
        display: none;
      }

      #moreActionButtonDiv,
      #script-ide-action-buttons,
      #draftOpenedMessageDiv {
        display: inline-block;
      }

      #script-ide-section-editor {
        width: 50%;
        max-width: 50%;
        float: left;
        overflow: hidden;
      }

      #script-ide-section-output {
        width: 48%;
        float: left;
      }

      .scriptsNavigationDiv a {
        padding: 0 5px 0 5px;
      }

      .scriptOutputDiv .CodeMirror-wrap {
        text-align: left;
        float: left;
        width: 100%;
      }

      .scriptOutputDiv {
        text-align: right;
        line-height: 32px;
      }

      #script-ide-section-editor .CodeMirror-wrap {}

      #script-ide-section-history {
        margin-top: 263px;
      }

      #script-ide-section-unit-tests {
        height: 170px;
      }

      #script-ide-tabs {
        text-align: right;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },
  {
    id: "16",
    name: "Domain Selector",
    content: stripIndent`
      .select-editable {
        position:relative; 
        background-color:white; 
        border:solid grey 1px;  
        width:120px; 
        height:100%;
      }

      .select-editable select {
        position:absolute; 
        top:0px; 
        left:0px; 
        font-size:14px; 
        border:none; 
        width:120px;
        margin:0;
      }

      .select-editable input {
        position:absolute; 
        top:0px; 
        left:0px; 
        width:90%; 
        padding:1px; 
        font-size:12px; 
        border:none;
        height: 100%;
      }

      .select-editable select:focus, .select-editable input:focus {
        outline:none;
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
    destination:
      "https://help.sap.com/docs/SAP_CPQ/884885f05e6b4c8082254d4d9d63f19b/e5f2e0b33a9e4e7ea2a22e27dba2e76f.html",
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: "1",
    key: "Q",
    destination: "Home > Quote List",
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: "2",
    key: "W",
    destination: "Home > Script Workbench",
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "3",
  //   key: "E",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  {
    id: "4",
    key: "R",
    destination: "UI Design > Responsive Templates",
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: "5",
    key: "T",
    destination: "Quotes > Quote Tables",
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "6",
  //   key: "A,
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  // {
  //   id: "7",
  //   key: "S",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  {
    id: "8",
    key: "D",
    destination: "Home > Developer Console",
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: "9",
    key: "F",
    destination: "Quotes > Custom Fields",
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: "10",
    key: "G",
    destination: "Develop > Global Scripts",
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "11",
  //   key: "Z",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  // {
  //   id: "12",
  //   key: "X",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  {
    id: "13",
    key: "C",
    destination: "Develop > Custom Actions",
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "14",
  //   key: "V",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  // {
  //   id: "15",
  //   key: "B",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
];
