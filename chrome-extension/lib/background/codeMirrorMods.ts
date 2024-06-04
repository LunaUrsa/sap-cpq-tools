import CodeMirror, { EditorConfiguration } from "codemirror";

export default async function codeMirrorMods(codeMirrorOptions: CodeMirrorOptions) {
  console.log('codeMirrorMods start')
  // Only run this on specific sites, we don't need to run this on every page
  const validHosts = ["cpq.cloud.sap", "codemirror.net"];
  if (!validHosts.some(h => new RegExp(h).test(window.location.host))) return

  // Declare constants
  const codeMirrorVersion = "5.65.16";
  const cdnBaseUrl = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/`;
  const basicThemes = ["default", "light", "dark"];
  const cmFiles = {
    "main": {
      'scripts': [
        `${cdnBaseUrl}codemirror.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}codemirror.min.css`,
      ]
    },
    "modes": {
      'scripts': [
        // `${cdnBaseUrl}mode/meta.min.js`,
        // `${cdnBaseUrl}mode/apl/apl.min.js`,
        `${cdnBaseUrl}mode/python/python.min.js`,
      ],
      'css': []
    },
    // "autorefresh": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/display/autorefresh.min.js`,
    //   ],
    //   'css': []
    // },
    "comments": {
      'scripts': [
        `${cdnBaseUrl}addon/comment/comment.min.js`,
        `${cdnBaseUrl}addon/comment/continuecomment.min.js`,
      ],
      'css': []
    },
    "dialog": {
      'scripts': [
        `${cdnBaseUrl}addon/dialog/dialog.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/dialog/dialog.min.css`,
      ]
    },
    "edit": {
      'scripts': [
        `${cdnBaseUrl}addon/edit/closebrackets.min.js`,
        `${cdnBaseUrl}addon/edit/closetag.min.js`,
        `${cdnBaseUrl}addon/edit/continuelist.min.js`,
        `${cdnBaseUrl}addon/edit/matchbrackets.min.js`,
        `${cdnBaseUrl}addon/edit/matchtags.min.js`,
        `${cdnBaseUrl}addon/edit/trailingspace.min.js`,
      ],
      'css': []
    },
    // "emacs": {
    //   'scripts': [
    //     `${cdnBaseUrl}keymap/emacs.min.js`,
    //   ],
    //   'css': []
    // },
    "fold": {
      'scripts': [
        `${cdnBaseUrl}addon/fold/brace-fold.min.js`,
        `${cdnBaseUrl}addon/fold/comment-fold.min.js`,
        `${cdnBaseUrl}addon/fold/foldcode.min.js`,
        `${cdnBaseUrl}addon/fold/foldgutter.min.js`,
        `${cdnBaseUrl}addon/fold/indent-fold.min.js`,
        `${cdnBaseUrl}addon/fold/markdown-fold.min.js`,
        `${cdnBaseUrl}addon/fold/xml-fold.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/fold/foldgutter.min.css`,
      ]
    },
    "fullscreen": {
      'scripts': [
        `${cdnBaseUrl}addon/display/fullscreen.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/display/fullscreen.min.css`,
      ]
    },
    "hint": {
      'scripts': [
        `${cdnBaseUrl}addon/hint/anyword-hint.min.js`,
        `${cdnBaseUrl}addon/hint/css-hint.min.js`,
        `${cdnBaseUrl}addon/hint/html-hint.min.js`,
        `${cdnBaseUrl}addon/hint/javascript-hint.min.js`,
        `${cdnBaseUrl}addon/hint/show-hint.min.js`,
        `${cdnBaseUrl}addon/hint/sql-hint.min.js`,
        `${cdnBaseUrl}addon/hint/xml-hint.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/hint/show-hint.min.css`,
      ]
    },
    "lint": {
      'scripts': [
        // `${cdnBaseUrl}addon/lint/coffeescript-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/css-lint.min.js`,
        `${cdnBaseUrl}addon/lint/html-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/javascript-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/json-lint.min.js`,
        `${cdnBaseUrl}addon/lint/lint.min.js`,
        // `${cdnBaseUrl}addon/lint/yaml-lint.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/lint/lint.min.css`,
      ]
    },
    // "merge": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/merge/merge.min.js`,
    //   ],
    //   'css': [
    //     `${cdnBaseUrl}addon/merge/merge.min.css`,
    //   ]
    // },
    "mode": {
      'scripts': [
        `${cdnBaseUrl}addon/mode/loadmode.min.js`,
        `${cdnBaseUrl}addon/mode/multiplex.min.js`,
        `${cdnBaseUrl}addon/mode/multiplex_test.min.js`,
        `${cdnBaseUrl}addon/mode/overlay.min.js`,
        `${cdnBaseUrl}addon/mode/simple.min.js`,
      ],
      'css': []
    },
    // "panel": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/panel/panel.min.js`,
    //   ],
    //   'css': []
    // },
    // "placeholder": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/display/placeholder.min.js`,
    //   ],
    //   'css': []
    // },
    "runmode": {
      'scripts': [
        `${cdnBaseUrl}addon/runmode/colorize.min.js`,
        `${cdnBaseUrl}addon/runmode/runmode-standalone.min.js`,
        `${cdnBaseUrl}addon/runmode/runmode.min.js`,
        `${cdnBaseUrl}addon/runmode/runmode.node.min.js`,
      ],
      'css': []
    },
    // "rulers": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/rulers/rulers.min.js`,
    //   ],
    //   'css': []
    // },
    "search": {
      'scripts': [
        `${cdnBaseUrl}addon/scroll/annotatescrollbar.min.js`,
        `${cdnBaseUrl}addon/search/jump-to-line.min.js`,
        `${cdnBaseUrl}addon/search/match-highlighter.min.js`,
        `${cdnBaseUrl}addon/search/matchesonscrollbar.min.js`,
        `${cdnBaseUrl}addon/scroll/scrollpastend.min.js`,
        `${cdnBaseUrl}addon/search/search.min.js`,
        `${cdnBaseUrl}addon/search/searchcursor.min.js`,
        `${cdnBaseUrl}addon/scroll/simplescrollbars.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/search/matchesonscrollbar.min.css`,
        `${cdnBaseUrl}addon/scroll/simplescrollbars.min.css`,
      ]
    },
    "selection": {
      'scripts': [
        `${cdnBaseUrl}addon/selection/active-line.min.js`,
        `${cdnBaseUrl}addon/selection/mark-selection.min.js`,
        `${cdnBaseUrl}addon/selection/selection-pointer.min.js`,
      ],
      'css': []
    },
    "sublime": {
      'scripts': [
        `${cdnBaseUrl}keymap/sublime.min.js`,
      ],
      'css': []
    },
    "tern": {
      'scripts': [
        `${cdnBaseUrl}addon/tern/tern.min.js`,
        `${cdnBaseUrl}addon/tern/worker.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/tern/tern.min.css`,
      ]
    },
    "theme": {
      'scripts': [],
      'css': [
        `${cdnBaseUrl}theme/${codeMirrorOptions.theme}.min.css`,
      ],
    },
    "vim": {
      'scripts': [
        `${cdnBaseUrl}keymap/vim.min.js`,
      ],
      'css': []
    },
    "wrap": {
      'scripts': [
        `${cdnBaseUrl}addon/wrap/hardwrap.min.js`,
      ],
      'css': []
    },
  };

  // Finds the codemirror instance on the page
  const findCodemirror = async (): Promise<CodeMirror.Editor | undefined> => {
    const maxRetries = 10;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (let retries = 0; retries < maxRetries; retries++) {
      const editorElement = document.getElementsByClassName('CodeMirror')[0];
      if (editorElement) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const editor: CodeMirror.Editor | undefined = (editorElement as any).CodeMirror;
        if (editor) return editor;
      }
      await delay(500);
    }
    console.error('CodeMirror instance not found after retries');
    return undefined;
  };

  const editor = await findCodemirror();

  if (!editor) {
    console.error('CodeMirror instance not found after retries');
    return;
  }

  // Loads js and css addon files
  const loadAddon = (addon: {
    scripts: string[];
    css: string[];
  }) => {
    const loadResource = (tag: 'script' | 'link', url: string) => {
      return new Promise<void>((resolve, reject) => {
        const element = document.createElement(tag);
        if (tag === 'script') {
          (element as HTMLScriptElement).type = 'text/javascript';
          (element as HTMLScriptElement).src = url;
        } else {
          (element as HTMLLinkElement).rel = 'stylesheet';
          (element as HTMLLinkElement).type = 'text/css';
          (element as HTMLLinkElement).href = url;
        }
        element.onload = () => resolve();
        element.onerror = () => reject(new Error(`Failed to load ${url}`));
        document.body.appendChild(element);
      });
    };

    const promises = [];
    promises.push(...addon.scripts.map(url => loadResource('script', url)));
    promises.push(...addon.css.map(url => loadResource('link', url)));
    return promises;
  };

  // Adds a hidden element to the page that allows the extension to read the code
  const addHiddenElement = (editor: CodeMirror.Editor) => {
    // The editor instance is not available outside this script, so if we want the content of the editor
    // we need to create a new element on the page that the content script can read. 

    // Create a new div element that's invisible and add it to the page
    const newDiv = document.createElement('div');
    newDiv.id = 'hiddenContent';
    newDiv.style.display = 'none';
    // Set the type as 'text/x-python', this is read by the content script to determine how to save the file
    newDiv.setAttribute('type', 'text/x-python');
    document.body.appendChild(newDiv);

    // Function that updates the hidden element with the contents of CodeMirror
    const updateHiddenContent = () => {
      const hiddenContent = document.getElementById('hiddenContent');
      if (hiddenContent) {
        const editorElement = document.getElementsByClassName('CodeMirror')[0];
        if (editorElement) {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          const editor: CodeMirror.Editor | undefined = (editorElement as any).CodeMirror;
          if (editor) {
            const editorContent = editor.getValue();
            hiddenContent.textContent = editorContent;
          }
        }
      }
    };
    // Listen for changes in the CodeMirror instance
    editor.on('change', updateHiddenContent);
    // Update the initial hidden content
    updateHiddenContent();
  };

  // Applies the options on the user's options page
  const applyCodeMirrorOptions = async (editor: CodeMirror.Editor) => {
    for (const [key, value] of Object.entries(codeMirrorOptions)) {
      try {
        editor.setOption(key as keyof EditorConfiguration, value);
      } catch (error) {
        console.error('Failed to set option:', key, value, error);
      }
    }
    // console.log('Options set:', codeMirrorOptions)
  };

  const addToolbar = async () => {
    // We need to add a new, hidden, toolbar to the webpage that will contain buttons that the user will not see
    // This is because we cannot interact with the CodeMirror instance from the extension popup directly
    // The extension will add visible toolbar in the Content UI script that the user will click on
    // Those clicks are then passed to the hidden toolbar that will interact with the CodeMirror instance
    const root = document.createElement('div');
    root.id = 'sap-cpq-tools-shadow';

    const editorElement = document.getElementsByClassName('CodeMirror')[0];
    editorElement?.parentElement?.prepend(root);

    const toolbar = document.createElement('div');
    toolbar.id = 'toolbar';
    toolbar.style.display = 'none';
    root.appendChild(toolbar);

    // Helper function to create an IconButton with Tooltip
    function createIconButton(buttonId: string, onClickHandler: () => void) {
      const shadowButton = document.createElement('button');
      shadowButton.id = buttonId;
      shadowButton.type = 'button';
      shadowButton.style.display = 'none';
      shadowButton.addEventListener('click', onClickHandler);
      return shadowButton;
    }

    async function handleFoldCode() {
      const editor = await findCodemirror();
      if (!editor) {
        console.error('CodeMirror instance not found after retries');
        return;
      }
      editor.operation(function () {
        for (let i = editor.firstLine(); i <= editor.lastLine(); ++i) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (editor as any).foldCode({ line: i, ch: 0 }, null, "fold");
        }
      });
    }

    async function handleUnFoldCode() {
      const editor = await findCodemirror();
      if (!editor) {
        console.error('CodeMirror instance not found after retries');
        return;
      }
      editor.operation(function () {
        for (let i = editor.firstLine(); i <= editor.lastLine(); ++i) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (editor as any).foldCode({ line: i, ch: 0 }, null, "unfold");
        }
      });
    }

    // Create the container div
    const containerDiv = document.createElement('div');
    containerDiv.style.display = 'none';

    // Append the buttons to the container div
    containerDiv.appendChild(createIconButton('foldCode', handleFoldCode));
    containerDiv.appendChild(createIconButton('unfoldCode', handleUnFoldCode));

    // Append the container div to the desired location in your DOM
    toolbar.appendChild(containerDiv); // Change this to the appropriate parent element
  };

  addHiddenElement(editor);
  addToolbar();

  // CodeMirror options
  const gutters = ["CodeMirror-linenumbers"];

  // Promises for loading CodeMirror scripts and CSS all at once
  const addonPromises: Promise<void>[] = [];

  // Set the mode
  // addonPromises.push(...loadAddon(cmFiles.modes));
  // editor.modeOption = {
  //   name: "python",
  //   singleLineStringErrors: false,
  //   version: codeMirrorOptions.pythonVersion,
  // };
  // editor.setOption('mode' as keyof EditorConfiguration, editor.modeOption);
  // console.log(`CM Mode: `, editor.modeOption)

  // Keymaps
  addonPromises.push(...loadAddon(cmFiles.sublime));

  // Selection
  addonPromises.push(...loadAddon(cmFiles.selection));

  // Dialogs, used by search
  addonPromises.push(...loadAddon(cmFiles.dialog));
  addonPromises.push(...loadAddon(cmFiles.edit));

  // Autocomplete
  addonPromises.push(...loadAddon(cmFiles.hint));
  editor.setOption('hintOptions' as keyof EditorConfiguration, {
    completeSingle: false,
    closeOnUnfocus: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // hint: (CodeMirror as any).hint.anyword,
  });
  editor.setOption('extraKeys' as keyof EditorConfiguration, {
    'Ctrl-Space': 'autocomplete',
    'Cmd-Space': 'autocomplete',
    'Ctrl-Enter': () => {
      editor.execCommand('autocomplete');
    },
    'Cmd-Enter': () => {
      editor.execCommand('autocomplete');
    },
  });

  // Commenting
  addonPromises.push(...loadAddon(cmFiles.comments));
  editor.setOption('continueComments' as keyof EditorConfiguration, true);

  // Code folding
  if (codeMirrorOptions.foldGutter) {
    gutters.push("CodeMirror-foldgutter");
    addonPromises.push(...loadAddon(cmFiles.fold));
  }

  // This is kind of gross, i can probably make a better one
  // Fullscreen
  // addonPromises.push(...loadAddon(cmFiles.fullscreen));
  // editor.setOption("extraKeys", {
  //   F11: function (cm) {
  //     if (cm.getOption('fullScreen' as keyof EditorConfiguration)) {
  //       cm.setOption('fullScreen' as keyof EditorConfiguration, false);
  //     } else {
  //       cm.setOption('fullScreen' as keyof EditorConfiguration, true);
  //     }
  //   }
  // });

  // Themes
  if (!basicThemes.includes(codeMirrorOptions.theme)) addonPromises.push(...loadAddon(cmFiles.theme));

  // Linting
  if (codeMirrorOptions.linting) {
    addonPromises.push(...loadAddon(cmFiles.lint));
  }

  // Search
  if (codeMirrorOptions.search) {
    addonPromises.push(...loadAddon(cmFiles.search));
  }

  editor.setOption('gutters', gutters);
  console.log('Gutters set:', gutters)

  // Load all the scripts and CSS files
  // THIS NEEDS TO HAPPEN BEFORE WE APPLY THE OPTIONS FOR SOME REASON
  await Promise.all(addonPromises);

  // These need to happen after the scripts are loaded
  editor.addKeyMap("default")
  editor.addKeyMap("sublime")

  // Set the options defined in the codeMirrorOptions object
  // Needs to happen after the scripts are loaded
  await applyCodeMirrorOptions(editor);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  console.log('codeMirrorMods ended with options:', (editor as any).options)
  return true;
}