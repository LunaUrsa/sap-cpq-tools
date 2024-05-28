/* eslint-disable import/namespace */
import '../Popup.css';
import { Restore, SettingsBackupRestore } from '@mui/icons-material';
import { FormControl, MenuItem, Select, Switch, Typography, FormControlLabel, Card, Box, Divider, Grid, Input, TextField, Tooltip, Button } from '@mui/material';
import { sapDefaultPreferences, defaultCodePreferences, codeMirrorThemes, defaultShortcuts, defaultMods } from '@chrome-extension-boilerplate/shared/lib/constants';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';
import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';


const OptionsView: React.FC = () => {
  const { userOptions, setUserOptions, codeMirrorOptions, setCodeMirrorOptions, setMods, setShortcuts } = useAppContext();

  async function revertToSapDefaults() {
    setCodeMirrorOptions(sapDefaultPreferences);
    saveToStorage("codeMirrorOptions", sapDefaultPreferences);
    console.log('Reverted to SAP defaults')
  }

  async function revertToCustomDefaults() {
    setCodeMirrorOptions(defaultCodePreferences);
    saveToStorage("codeMirrorOptions", defaultCodePreferences);
    console.log('Reverted to custom defaults')
  }

  async function revertShortcuts() {
    setShortcuts(defaultShortcuts);
    saveToStorage("shortcuts", defaultShortcuts);
    console.log('Reverted shortcuts to ', defaultShortcuts)
  }

  async function revertMods() {
    setMods(defaultMods);
    saveToStorage("mods", defaultMods);
    console.log('Reverted mods')
  }

  const themeOptions = Object.values(codeMirrorThemes);

  type Option = {
    label: string;
    key: keyof CodeMirrorOptions | keyof UserOptions;
    type: "switch" | "select" | "number" | "string";
    tooltip: string;
    options?: string[];
  };

  const userOptionsConfig = [
    { label: "Dark Mode", key: "isDarkMode", type: "switch" },
    { label: "Language", key: "language", type: "select", options: ["en", "es", "fr"] },
    { label: "Open app in side panel", key: "openInSidePanel", type: "switch" },
  ] as Option[];

  const codeMirrorOptionsConfig: Option[] = [
    // { label: "Mode", key: "mode", type: "select", tooltip: "The mode to use. It may be a string or an object containing configuration options for the mode.", options: ["python", "javascript", "html", "css", "xml", "markdown"] },
    { label: "Python Version", key: "pythonVersion", type: "select", tooltip: "Which version of python are you aiming for?", options: ['2', '3'] },
    { label: "Line Separator", key: "lineSeparator", type: "string", tooltip: "Explicitly set the line separator for the editor." },
    { label: "Theme", key: "theme", type: "select", tooltip: "The theme to style the editor with.", options: themeOptions },
    { label: "Indent Unit", key: "indentUnit", type: "number", tooltip: "How many spaces a block should be indented." },
    { label: "Smart Indent", key: "smartIndent", type: "switch", tooltip: "Whether to use the context-sensitive indentation that the mode provides." },
    { label: "Tab Size", key: "tabSize", type: "number", tooltip: "The width of a tab character." },
    { label: "Indent with Tabs", key: "indentWithTabs", type: "switch", tooltip: "Whether to replace spaces with tabs when indenting." },
    { label: "Electric Characters", key: "electricChars", type: "switch", tooltip: "Configures whether the editor should re-indent the current line when a character is typed that might change its proper indentation." },
    { label: "Direction", key: "direction", type: "select", tooltip: "Flips overall layout and selects base paragraph direction to be left-to-right or right-to-left.", options: ["ltr", "rtl"] },
    { label: "RTL Move Visually", key: "rtlMoveVisually", type: "switch", tooltip: "Determines whether horizontal cursor movement through right-to-left text is visual or logical." },
    // { label: "Key Map", key: "keyMap", type: "select", tooltip: "Configures the key map to use.", options: ["default", "emacs", "sublime", "vim"] },
    // { label: "Extra Keys", key: "extraKeys", type: "select", tooltip: "Specifies extra key bindings for the editor." },
    // { label: "Configure Mouse", key: "configureMouse", type: "select", tooltip: "Allows you to configure the behavior of mouse selection and dragging." },
    { label: "Line Wrapping", key: "lineWrapping", type: "switch", tooltip: "Whether CodeMirror should scroll or wrap for long lines." },
    { label: "Line Numbers", key: "lineNumbers", type: "switch", tooltip: "Whether to show line numbers to the left of the editor." },
    { label: "First Line Number", key: "firstLineNumber", type: "number", tooltip: "At which number to start counting lines." },
    // { label: "Gutters", key: "gutters", type: "select", tooltip: "Can be used to add extra gutters (beyond or instead of the line number gutter)." },
    { label: "Fixed Gutter", key: "fixedGutter", type: "switch", tooltip: "Determines whether the gutter scrolls along with the content horizontally or stays fixed." },
    // { label: "Scrollbar Style", key: "scrollbarStyle", type: "select", tooltip: "Chooses a scrollbar implementation.", options: ["native", "overlay"] },
    { label: "Cover Gutter Next to Scrollbar", key: "coverGutterNextToScrollbar", type: "switch", tooltip: "When fixedGutter is on, determines whether the gutter will be visible to the left of the scrollbar." },
    // { label: "Input Style", key: "inputStyle", type: "select", tooltip: "Selects the way CodeMirror handles input and focus.", options: ["textarea", "contenteditable"] },
    // { label: "Screen Reader Label", key: "screenReaderLabel", type: "select", tooltip: "This label is read by the screen readers when CodeMirror text area is focused." },
    { label: "Show Cursor When Selecting", key: "showCursorWhenSelecting", type: "switch", tooltip: "Whether the cursor should be drawn when a selection is active." },
    { label: "Line Wise Copy Cut", key: "lineWiseCopyCut", type: "switch", tooltip: "Whether doing copy or cut when there is no selection will copy or cut the whole lines that have cursors on them." },
    { label: "Paste Lines Per Selection", key: "pasteLinesPerSelection", type: "switch", tooltip: "When pasting from an external source, determines whether to insert one line per selection." },
    { label: "Selections May Touch", key: "selectionsMayTouch", type: "switch", tooltip: "Determines whether multiple selections are joined as soon as they touch or only when they overlap." },
    { label: "Undo Depth", key: "undoDepth", type: "number", tooltip: "The maximum number of undo levels that the editor stores." },
    { label: "History Event Delay", key: "historyEventDelay", type: "number", tooltip: "The period of inactivity that will cause a new history event to be started when typing or deleting." },
    // { label: "Tab Index", key: "tabindex", type: "select", tooltip: "The tab index to assign to the editor." },
    { label: "Autofocus", key: "autofocus", type: "switch", tooltip: "Can be used to make CodeMirror focus itself on initialization." },
    // { label: "Phrases", key: "phrases", type: "select", tooltip: "Some addons run user-visible strings through the phrase method to allow for translation." },
    // { label: "Drag Drop", key: "dragDrop", type: "switch", tooltip: "Controls whether drag-and-drop is enabled." },
    // { label: "Allow Drop File Types", key: "allowDropFileTypes", type: "select", tooltip: "Only files whose type is in the array can be dropped into the editor." },
    { label: "Cursor Blink Rate", key: "cursorBlinkRate", type: "number", tooltip: "Half-period in milliseconds used for cursor blinking." },
    { label: "Cursor Scroll Margin", key: "cursorScrollMargin", type: "number", tooltip: "How much extra space to always keep above and below the cursor." },
    // { label: "Cursor Height", key: "cursorHeight", type: "select", tooltip: "Determines the height of the cursor." },
    // { label: "Single Cursor Height Per Line", key: "singleCursorHeightPerLine", type: "switch", tooltip: "When true, will keep the cursor height constant for an entire line." },
    { label: "Reset Selection on Context Menu", key: "resetSelectionOnContextMenu", type: "switch", tooltip: "Controls whether the cursor is moved to the point of the click when the context menu is opened." },
    // { label: "Work Time", key: "workTime", type: "select", tooltip: "Highlighting is done by a pseudo background-thread that will work for workTime milliseconds." },
    // { label: "Work Delay", key: "workDelay", type: "select", tooltip: "The delay in milliseconds for the background-thread used for highlighting." },
    // { label: "Poll Interval", key: "pollInterval", type: "select", tooltip: "Indicates how quickly CodeMirror should poll its input textarea for changes." },
    // { label: "Flatten Spans", key: "flattenSpans", type: "switch", tooltip: "Whether to combine adjacent tokens into a single span if they have the same class." },
    // { label: "Add Mode Class", key: "addModeClass", type: "switch", tooltip: "When enabled, an extra CSS class will be added to each token indicating the mode that produced it." },
    { label: "Max Highlight Length", key: "maxHighlightLength", type: "number", tooltip: "The maximum length of lines to highlight before styling the rest as plain text." },
    { label: "Viewport Margin", key: "viewportMargin", type: "number", tooltip: "Specifies the amount of lines rendered above and below the part of the document currently scrolled into view." },
    { label: "Spellcheck", key: "spellcheck", type: "switch", tooltip: "Specifies whether spellcheck will be enabled on the input." },
    { label: "Autocapitalize", key: "autocapitalize", type: "switch", tooltip: "Specifies whether autocapitalization will be enabled on the input." },
    { label: "Autocorrect", key: "autocorrect", type: "switch", tooltip: "Specifies whether autocorrect will be enabled on the input." },
    // { label: "Full Screen", key: "fullScreen", type: "switch", tooltip: "When set to true, will make the editor full-screen." },
    // { label: "Hint Options", key: "hintOptions", type: "select", tooltip: "Addon options that are not enabled by default." },
    { label: "Match Brackets", key: "matchBrackets", type: "switch", tooltip: "Causes matching brackets to be highlighted whenever the cursor is next to them." },
    { label: "Show Trailing Space", key: "showTrailingSpace", type: "switch", tooltip: "Adds a CSS class to stretches of whitespace at the end of lines." },
    // { label: "Disable Input", key: "disableInput", type: "switch", tooltip: "Controls whether the input is disabled." },
    // { label: "Move Input With Cursor", key: "moveInputWithCursor", type: "switch", tooltip: "When set to true, will make the editor full-screen." },
    // { label: "Tab Mode", key: "tabMode", type: "select", tooltip: "Controls the tab behavior.", options: ["shift", "space"] },
    // { label: "Whole Line Update Before", key: "wholeLineUpdateBefore", type: "switch", tooltip: "Whether to update the whole line before making changes." }
    { label: "Fold Gutter", key: "foldGutter", type: "switch", tooltip: "Whether the gutter with line-folding controls should be shown." },
    { label: "Match Tags", key: "matchTags", type: "switch", tooltip: "Whether to highlight the matching tag." },
    { label: "Lint", key: "linting", type: "switch", tooltip: "Whether to use linting." },
    { label: "Style Active Line", key: "styleActiveLine", type: "switch", tooltip: "Whether to highlight the currently active line." },
    { label: "Highlight Selection Matches", key: "highlightSelectionMatches", type: "switch", tooltip: "Whether to highlight other occurrences of the currently selected text." },
  ];

  const generateUserFormControl = (
    option: Option,
    values: UserOptions,
    setValues: React.Dispatch<React.SetStateAction<UserOptions>>
  ) => {
    if (option.type === "switch") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4">
            <FormControlLabel
              control={
                <Switch
                  checked={values[option.key as keyof UserOptions] as boolean}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      [option.key]: e.target.checked
                    }))
                    saveToStorage("userOptions", {
                      ...userOptions,
                      [option.key]: e.target.checked
                    });
                  }}
                  name={option.key as string}
                  color="primary"
                />
              }
              label={option.label}
            />
          </FormControl>
        </Grid>
      );
    }

    if (option.type === "select") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4" fullWidth>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography>{option.label}</Typography>
              </Grid>
              <Grid item>
                <Select
                  value={values[option.key as keyof UserOptions] || ""}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      [option.key]: e.target.value
                    }))
                    saveToStorage("userOptions", {
                      ...userOptions,
                      [option.key]: e.target.value
                    });
                  }}
                  sx={{
                    fontSize: "0.875rem",
                    maxHeight: "40px",
                    "& .MuiSelect-select": {
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    },
                  }}
                >
                  {option.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      );
    }

    return null;
  };

  const generateCodeMirrorFormControl = (
    option: Option,
    values: CodeMirrorOptions,
    setValues: React.Dispatch<React.SetStateAction<CodeMirrorOptions>>
  ) => {
    if (option.type === "switch") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4" fullWidth>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Tooltip title={option.tooltip}>
                  <Typography>{option.label}</Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values[option.key as keyof CodeMirrorOptions] as boolean}
                      onChange={(e) => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          [option.key]: e.target.checked
                        }))
                        saveToStorage("codeMirrorOptions", {
                          ...codeMirrorOptions,
                          [option.key]: e.target.checked
                        });
                      }}
                      name={option.key as string}
                      color="primary"
                    />
                  }
                  label=""
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      );
    }

    if (option.type === "select") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4" fullWidth>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Tooltip title={option.tooltip}>
                  <Typography>{option.label}</Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Select
                  value={values[option.key as keyof CodeMirrorOptions] || ""}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      [option.key]: e.target.value
                    }))
                    saveToStorage("codeMirrorOptions", {
                      ...codeMirrorOptions,
                      [option.key]: e.target.value
                    });
                  }}
                  sx={{
                    fontSize: "0.875rem",
                    maxHeight: "40px",
                    "& .MuiSelect-select": {
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    },
                  }}
                  fullWidth
                >
                  {option.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      );
    }

    if (option.type === "number") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4" fullWidth>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Tooltip title={option.tooltip}>
                  <Typography>{option.label}</Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  type="number"
                  value={values[option.key as keyof CodeMirrorOptions] || ""}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      [option.key]: e.target.value
                    }))
                    saveToStorage("codeMirrorOptions", {
                      ...codeMirrorOptions,
                      [option.key]: e.target.value
                    });
                  }}
                  InputProps={{ inputProps: { maxLength: 2, style: { width: '50px' } } }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      );
    }

    if (option.type === "string") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4" fullWidth>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Tooltip title={option.tooltip}>
                  <Typography>{option.label}</Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={1}>
                <Input
                  type="text"
                  value={values[option.key as keyof CodeMirrorOptions] || ""}
                  onChange={(e) => {
                    setValues((prevValues) => ({
                      ...prevValues,
                      [option.key]: e.target.value
                    }))
                    saveToStorage("codeMirrorOptions", {
                      ...codeMirrorOptions,
                      [option.key]: e.target.value
                    });
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      );
    }

    return null;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Box className="space-y-6">
        <Card className="p-4">
          <Typography variant="h4" gutterBottom>
            Extension Options
          </Typography>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            {userOptionsConfig.map((option) =>
              generateUserFormControl(option, userOptions, setUserOptions)
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Tooltip title="Reset Shortcuts">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Restore />}
                  onClick={revertShortcuts}
                >
                  Revert Shortcuts
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Revert Mods">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SettingsBackupRestore />}
                  onClick={revertMods}
                >
                  Revert Mods
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Card>
        <Card className="p-4">
          <Typography variant="h4" gutterBottom>
            Code Editor Options
          </Typography>
          <Divider className="mb-40" />
          <Grid container spacing={2}>
            <Grid item>
              <Tooltip title="Revert to SAP Defaults">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Restore />}
                  onClick={revertToSapDefaults}
                >
                  Revert to SAP Defaults
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Revert to Custom Defaults">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SettingsBackupRestore />}
                  onClick={revertToCustomDefaults}
                >
                  Revert to Custom Defaults
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Divider className="mb-40" />
          <Grid container spacing={2}>
            {codeMirrorOptionsConfig.map((option) =>
              generateCodeMirrorFormControl(option, codeMirrorOptions, setCodeMirrorOptions)
            )}
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default OptionsView;