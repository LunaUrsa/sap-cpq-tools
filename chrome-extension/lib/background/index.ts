/* eslint-disable @typescript-eslint/no-explicit-any */
import 'webextension-polyfill';
import { stripIndent } from "common-tags";

console.log('background loaded');
console.log("Edit 'apps/chrome-extension/lib/background/index.ts' and save to reload.");

async function initSettings() {

  const defaultUserPreferences = {
    isDarkMode: true,
    language: 'en',
  } as UserOptions;

  const defaultCodePreferences = {
    autocapitalize: true,
    autocorrect: true,
    autofocus: true,
    foldGutter: true,
    highlightActiveLine: true,
    highlightSelectionMatches: true,
    linting: true,
    matchTags: true,
    resize: true,
    scrollbarStyle: "overlay",
    shortcuts: {},
    spellcheck: true,
    styleActiveLine: true,
    tabMode: "shift",
    theme: 'dark',
  } as CodeMirrorOptions;

  const defaultMods = [
    {
      id: "1",
      name: "Example CSS Mod",
      content: stripIndent`
        body {
          background-color: red !important;
        }
      `,
      isEnabled: true,
      isValidCode: true,
    },
  ] as Mod[];

  const defaultShortcuts = [
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
  ] as Shortcut[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidUserOptions(obj: any): obj is UserOptions {
    const parsedObj = JSON.parse(obj);
    return (
      typeof parsedObj === "object" &&
      parsedObj.codeMirrorTheme &&
      typeof parsedObj.codeMirrorTheme === "string"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidCodeOptions(obj: any): obj is CodeMirrorOptions {
    const parsedObj = JSON.parse(obj);
    return (
      typeof parsedObj === "object" &&
      parsedObj.autocapitalize &&
      typeof parsedObj.autocapitalize === "boolean" &&
      parsedObj.autocorrect &&
      typeof parsedObj.autocorrect === "boolean" &&
      parsedObj.autofocus &&
      typeof parsedObj.autofocus === "boolean" &&
      parsedObj.foldGutter &&
      typeof parsedObj.foldGutter === "boolean" &&
      parsedObj.highlightActiveLine &&
      typeof parsedObj.highlightActiveLine === "boolean" &&
      parsedObj.linting &&
      typeof parsedObj.linting === "boolean" &&
      parsedObj.matchTags &&
      typeof parsedObj.matchTags === "boolean" &&
      parsedObj.resize &&
      typeof parsedObj.resize === "boolean" &&
      parsedObj.scrollbarStyle &&
      typeof parsedObj.scrollbarStyle === "string" &&
      parsedObj.shortcuts &&
      typeof parsedObj.shortcuts === "object" &&
      parsedObj.spellcheck &&
      typeof parsedObj.spellcheck === "boolean" &&
      parsedObj.styleActiveLine &&
      typeof parsedObj.styleActiveLine === "boolean" &&
      parsedObj.tabMode &&
      typeof parsedObj.tabMode === "string" &&
      parsedObj.theme &&
      typeof parsedObj.theme === "string"
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidModList(obj: any): obj is Mod[] {
    const parsedObj = JSON.parse(obj);
    return (
      Array.isArray(parsedObj) &&
      parsedObj.length > 0 &&
      parsedObj.every((mod) => {
        return (
          typeof mod === "object" &&
          mod.id &&
          mod.name &&
          mod.content &&
          mod.isEnabled &&
          mod.isValidCode
        );
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isValidShortcutList(obj: any): obj is Shortcut[] {
    const parsedObj = JSON.parse(obj);
    return (
      Array.isArray(parsedObj) &&
      parsedObj.length > 0 &&
      parsedObj.every((shortcut) => {
        return (
          typeof shortcut === "object" &&
          shortcut.id &&
          shortcut.key &&
          shortcut.destination &&
          shortcut.isUnique &&
          shortcut.isValidDestination
        );
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function loadAndValidateStorageItem<T>(key: string, isValidFunction: (obj: any) => obj is T, defaultData: T): Promise<void> {
    return new Promise<void>((resolve) => {
      chrome.storage.local.get(key, (result) => {
        const storedData = result[key];
        if (storedData) {
          try {
            if (isValidFunction(storedData)) {
              console.log(`background ${key} are valid!`);
              resolve();
            } else {
              console.log(`background ${key} are NOT valid, resetting to default!`, defaultData);
              chrome.storage.local.set({ [key]: JSON.stringify(defaultData) }, resolve);
            }
          } catch (error) {
            console.error(`Failed to parse ${key}:`, error);
            chrome.storage.local.set({ [key]: JSON.stringify(defaultData) }, resolve);
          }
        } else {
          console.error(`${key} are empty! Resetting to default`, result);
          chrome.storage.local.set({ [key]: JSON.stringify(defaultData) }, resolve);
        }
      });
    });
  }

  await Promise.all([
    loadAndValidateStorageItem('userOptions', isValidUserOptions, defaultUserPreferences),
    loadAndValidateStorageItem('codeMirrorOptions', isValidCodeOptions, defaultCodePreferences),
    loadAndValidateStorageItem('mods', isValidModList, defaultMods),
    loadAndValidateStorageItem('shortcuts', isValidShortcutList, defaultShortcuts)
  ]);

  console.log('All settings loaded and validated, applying mods now...');
  await applyMods();
  console.log('Handling shortcuts')
  await handleShortcuts();
}

async function applyMods() {
  const storage = await chrome.storage.local.get("mods");
  // console.log("storage", storage);
  if (!storage.mods) return;

  const mods = JSON.parse(storage.mods)

  if (Array.isArray(mods) && mods.length > 0) {
    // console.log("mods", mods);
    mods.forEach((mod: Mod) => {
      if (
        mod?.content &&
        mod?.isEnabled &&
        mod?.isValidCode
      ) {

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          if (!activeTab.id) {
            return;
          }

          if (!activeTab.url || activeTab.url.startsWith('chrome://')) {
            // console.error('Cannot i n j  ect scr  ip ts   i nto chrome:// pages or  extension pages.');
            return;
          }
          // console.log("activeTab", activeTab);

          // console.log('Applying mod:', mod.name, mod.content);
          chrome.scripting.insertCSS({
            target: { tabId: activeTab.id, allFrames: true },
            // css: mod.content,
            css: mod.content,
          })
          console.info('Mod applied')
        });
      }
    });
  } else {
    console.info('No mods found')
  };

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url) {
      applyMods();  // Re-run the function to apply mods
    }
  });
}

async function handleShortcuts() {
  chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
  });
}

async function codeChanges() {
  // Codemirror version 5.65.14

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let editor: any = document.querySelector(".CodeMirror");
  if (!editor) {
    editor = document.querySelectorAll(".CodeMirror")[1];
  }

  if (!editor) {
    console.info("CodeMirror not found");
    return;
  }

  // var sapDefaults = {
  //   "addModeClass": false,
  //   "allowDropFileTypes": null,
  //   "autocapitalize": false,
  //   "autocorrect": false,
  //   "autofocus": false,
  //   "configureMouse": null,
  //   "coverGutterNextToScrollbar": false,
  //   "cursorBlinkRate": 530,
  //   "cursorHeight": 1,
  //   "cursorScrollMargin": 0,
  //   "direction": "ltr",
  //   "disableInput": false,
  //   "dragDrop": true,
  //   "electricChars": true,
  //   "extraKeys": {
  //     "Ctrl-Space": "autocomplete"
  //   },
  //   "firstLineNumber": 1,
  //   "fixedGutter": true,
  //   "flattenSpans": true,
  //   "fullScreen": false,
  //   "gutters": [],
  //   "hintOptions": null,
  //   "historyEventDelay": 1250,
  //   "indentUnit": 4,
  //   "indentWithTabs": false,
  //   "inputStyle": "textarea",
  //   "keyMap": "default",
  //   "lineNumbers": true,
  //   "lineSeparator": null,
  //   "lineWiseCopyCut": true,
  //   "lineWrapping": true,
  //   "matchBrackets": true,
  //   "maxHighlightLength": 10000,
  //   "mode": {
  //     "name": "python",
  //     "singleLineStringErrors": false,
  //     "version": 3
  //   },
  //   "moveInputWithCursor": true,
  //   "pasteLinesPerSelection": true,
  //   "phrases": null,
  //   "pollInterval": 100,
  //   "resetSelectionOnContextMenu": true,
  //   "rtlMoveVisually": false,
  //   "screenReaderLabel": null,
  //   "scrollbarStyle": "native",
  //   "selectionsMayTouch": false,
  //   "showCursorWhenSelecting": false,
  //   "showTrailingSpace": true,
  //   "singleCursorHeightPerLine": true,
  //   "smartIndent": true,
  //   "specialChars": {},
  //   "spellcheck": false,
  //   "tabindex": null,
  //   "tabMode": "shift",
  //   "tabSize": 4,
  //   "theme": "default",
  //   "undoDepth": 200,
  //   "value": "",
  //   "viewportMargin": 10,
  //   "wholeLineUpdateBefore": true,
  //   "workDelay": 100,
  //   "workTime": 100
  // }

  const storage = await chrome.storage.local.get("codeMirrorOptions");
  const codeMirrorOptions = JSON.parse(storage.codeMirrorOptions) as CodeMirrorOptions;
  const codeMirrorTheme = codeMirrorOptions.theme;

  if (codeMirrorOptions.theme) {
    // Append CSS to the head
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/theme/${codeMirrorTheme}.min.css`;
    document.head.appendChild(link);

    editor.classList.remove(`cm-s-default`);
    editor.classList.add(`cm-s-${codeMirrorTheme}`);
  }

  const gutters = [
    "CodeMirror-linenumbers",
  ]

  editor.setOption("autocapitalize", codeMirrorOptions.autocapitalize);
  editor.setOption("autocorrect", codeMirrorOptions.autocorrect);
  editor.setOption("autofocus", codeMirrorOptions.autofocus);
  editor.setOption("foldGutter", codeMirrorOptions.foldGutter);
  if (codeMirrorOptions.foldGutter) {
    gutters.push("CodeMirror-foldgutter");
    // List of script URLs to load
    [
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/brace-fold.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/comment-fold.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/foldcode.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/foldgutter.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/indent-fold.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/markdown-fold.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/xml-fold.min.js",
    ].forEach((url) => {
      const script = document.createElement("script");
      script.type = 'text/javascript';
      script.src = url;
      document.body.appendChild(script);
    });

    // CSS Urls to load
    [
      "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/addon/fold/foldgutter.min.css"
    ].forEach((url) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = url;
      document.head.appendChild(link);
    });
  };
  editor.setOption("highlightActiveLine", codeMirrorOptions.highlightActiveLine);
  editor.setOption("highlightSelectionMatches", codeMirrorOptions.highlightSelectionMatches);
  editor.setOption("lint", codeMirrorOptions.linting);  // Need to look into hints
  if (codeMirrorOptions.linting) gutters.push("CodeMirror-lint-markers");
  editor.setOption("matchTags", codeMirrorOptions.matchTags);
  editor.setOption("resize", codeMirrorOptions.resize);
  editor.setOption("scrollbarStyle", codeMirrorOptions.scrollbarStyle);
  editor.setOption("spellcheck", codeMirrorOptions.spellcheck);
  editor.setOption("styleActiveLine", codeMirrorOptions.styleActiveLine);
  editor.setOption("theme", codeMirrorOptions.theme);

  editor.setOption("gutters", gutters);
  editor.setOption("hintOptions", { // Need to look into hints
    completeSingle: false
  });
  editor.setOption("extraKeys", {
    "Ctrl-Q": function (cm: any) {
      cm.foldCode(cm.getCursor());
    },
    "Cmd-Q": function (cm: any) {
      cm.foldCode(cm.getCursor());
    },
    "Ctrl-Space": "autocomplete",
    "Cmd-Space": "autocomplete",
    "Ctrl-/": "toggleComment",
    "Cmd-/": "toggleComment",
    "Ctrl-F": "findPersistent",
    "Cmd-F": "findPersistent",
    "Ctrl-Alt-F": "findPersistentNext",
    "Cmd-Alt-F": "findPersistentNext",
    "Ctrl-Shift-F": "findPersistentPrev",
    "Cmd-Shift-F": "findPersistentPrev",
    "Ctrl-R": "replace",
    "Cmd-R": "replace",
    "Ctrl-Shift-R": "replaceAll",
    "Cmd-Shift-R": "replaceAll",
    "Ctrl-G": "jumpToLine",
    "Cmd-G": "jumpToLine",
    "Tab": "indentMore",
  });
}

async function prodWarning() {
  const host = window.location.host;

  const modal = host.includes("sandbox")
    ? `
  <div id="toolButton">
      <div class="container-fluid">
          <div class="row">
              <div class="col-xs-12">
                  <a href="#" id='sandboxModal' class="btn btn-info btn-lg" data-toggle="modal" data-target="#devToolModal">
                      You are in Sandbox!
                  </a>
              </div>
          </div>
      </div>
  </div>
  `
    : `
  <div id="toolButton">
      <div class="container-fluid">
          <div class="row">
              <div class="col-xs-12">
                  <a href="#" id='prodWarningModal' class="btn btn-info btn-lg" data-toggle="modal" data-target="#devToolModal">
                      You are in Production!
                  </a>
              </div>
          </div>
      </div>
  </div>
  `;

  const respSetup = document.querySelector(".resp-setup");
  const wrap = document.getElementById("wrap");
  const body = document.body;
  if (respSetup) respSetup.innerHTML += modal;
  if (wrap) wrap.innerHTML += modal;
  body.innerHTML += modal;
}

function viewSelector(): void {
  function changeView(): void {
    const viewSlct = document.getElementById(
      "viewPickSlct",
    ) as HTMLSelectElement;
    const selectedView = viewSlct.value; // Simplified access to selected value
    const codeWindow = document.querySelector<HTMLDivElement>(".CodeMirror");
    const traceWindow = document.getElementById("tracesContainer");
    const buttonBar = document.querySelector(
      ".col-sm-6.control-label.text-right",
    );
    const traceTitle = document.querySelector(".tracetitle");

    // Clear all classes
    codeWindow?.classList.remove(
      "col-sm-6",
      "col-md-6",
      "leftscript",
      "col-sm-8",
      "col-md-8",
      "largeleft",
    );
    traceWindow?.classList.remove(
      "righttrace",
      "col-sm-6",
      "col-md-6",
      "col-md-4",
      "col-sm-4",
      "smallright",
      "col-md-12",
      "col-sm-12",
    );

    if (selectedView === "Default") {
      traceWindow?.classList.add("col-md-12", "col-sm-12");
      traceTitle?.setAttribute("style", "");
    } else if (selectedView === "Side By Side") {
      codeWindow?.classList.add("col-sm-6", "col-md-6", "leftscript");
      traceWindow?.classList.add("righttrace", "col-sm-6", "col-md-6");
      traceTitle?.setAttribute("style", "display: none;");
    } else if (selectedView === "Narrow Trace") {
      codeWindow?.classList.add("col-sm-8", "col-md-8", "largeleft");
      traceWindow?.classList.add("smallright", "col-sm-4", "col-md-4");
      traceTitle?.setAttribute("style", "display: none;");
    }

    // Manage the clear traces button
    manageClearTracesButton(buttonBar);

    localStorage.setItem("selectedView", selectedView);
  }

  function manageClearTracesButton(parentElement: Element | null): void {
    let clearTrace = document.getElementById(
      "traceControl",
    ) as HTMLAnchorElement;
    if (!clearTrace) {
      clearTrace = document.createElement("a");
      clearTrace.className = "btn btn-primary btn-sm traceControl";
      clearTrace.href = "#";
      clearTrace.role = "button";
      clearTrace.textContent = "Clear Traces";
      clearTrace.id = "traceControl";
      parentElement?.appendChild(clearTrace);
    }
  }

  // Creating view selection UI
  const optionsToolbar = document.getElementById("menuDiv");
  if (optionsToolbar) {
    const viewPick = document.createElement("div");
    viewPick.className = "form-group";
    viewPick.style.cssText = "float: left; margin-right: 10px";

    const viewPickLabel = document.createElement("label");
    viewPickLabel.setAttribute("for", "viewPickSlct");
    viewPickLabel.textContent = "Select View:";

    const viewPickSelect = document.createElement("select");
    viewPickSelect.className = "form-control";
    viewPickSelect.id = "viewPickSlct";
    ["Default", "Side By Side", "Narrow Trace"].forEach((view) => {
      const option = document.createElement("option");
      option.textContent = view;
      option.value = view;
      viewPickSelect.appendChild(option);
    });

    viewPick.appendChild(viewPickLabel);
    viewPick.appendChild(viewPickSelect);
    optionsToolbar.appendChild(viewPick);

    viewPickSelect.addEventListener("change", changeView);

    // Set the initial view from local storage or default
    const currentView = localStorage.getItem("selectedView") ?? "Default";
    viewPickSelect.value = currentView;
    changeView();
  }
}

console.log('Initializing settings')
initSettings();
codeChanges();
prodWarning();
viewSelector();