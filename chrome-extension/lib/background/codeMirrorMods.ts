import CodeMirror, { EditorConfiguration } from "codemirror";

export default async function codeMirrorMods(codeMirrorOptions: CodeMirrorOptions) {
  console.log('codeMirrorMods start')
  // Only run this on specific sites, we don't need to run this on every page
  const validHosts = ["cpq.cloud.sap", "codemirror.net"];
  if (!validHosts.some(h => new RegExp(h).test(window.location.host))) return

  // Declare constants
  const basicThemes = ["default", "light", "dark"];
  /* Okay so for some reason SAP uses multiple versions of codemirror. The most recent is version 6.
   4.0.3, the first 4.X version available
   > Script workbench
   > Custom actions
   > Product Scripts
   5.65.14, the second-to-last 5.X version  available
   > Global scripts 
  */
  const codeMirrorVersion = "5.65.14";
  const cdnBaseUrl = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/`;
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
    "activeLine": {
      'scripts': [
        `${cdnBaseUrl}addon/selection/active-line.min.js`,
      ],
      'css': []
    },
    // "autorefresh": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/display/autorefresh.min.js`,
    //   ],
    //   'css': []
    // },
    "comment": {
      'scripts': [
        `${cdnBaseUrl}addon/comment/comment.min.js`,
      ],
      'css': []
    },
    "continuecomment": {
      'scripts': [
        `${cdnBaseUrl}addon/comment/continuecomment.min.js`,
      ],
      'css': []
    },
    "closebrackets": {
      'scripts': [
        `${cdnBaseUrl}addon/edit/closebrackets.min.js`,
      ],
      'css': []
    },
    "closetag": {
      'scripts': [
        `${cdnBaseUrl}addon/edit/closetag.min.js`,
      ],
      'css': []
    },
    "continuelist": {
      'scripts': [
        `${cdnBaseUrl}addon/edit/continuelist.min.js`,
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
    "emacs": {
      'scripts': [
        `${cdnBaseUrl}keymap/emacs.min.js`,
      ],
      'css': []
    },
    "fold": {
      'scripts': [
        `${cdnBaseUrl}addon/fold/foldcode.min.js`,
        `${cdnBaseUrl}addon/fold/foldgutter.min.js`,
        `${cdnBaseUrl}addon/fold/brace-fold.min.js`,
        `${cdnBaseUrl}addon/fold/comment-fold.min.js`,
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
        `${cdnBaseUrl}addon/hint/show-hint.min.js`,
        `${cdnBaseUrl}addon/hint/anyword-hint.min.js`,
        // `${cdnBaseUrl}addon/hint/css-hint.min.js`,
        // `${cdnBaseUrl}addon/hint/html-hint.min.js`,
        // `${cdnBaseUrl}addon/hint/javascript-hint.min.js`,
        // `${cdnBaseUrl}addon/hint/sql-hint.min.js`,
        // `${cdnBaseUrl}addon/hint/xml-hint.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/hint/show-hint.min.css`,
      ]
    },
    "highlightSelectionMatches": {
      'scripts': [
        `${cdnBaseUrl}addon/search/match-highlighter.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/search/matchesonscrollbar.min.css`,
      ]
    },
    "jumpToLine": {
      'scripts': [
        `${cdnBaseUrl}addon/search/jump-to-line.min.js`,
      ],
      'css': []
    },
    "lint": {
      'scripts': [
        `${cdnBaseUrl}addon/lint/lint.min.js`,
        // `${cdnBaseUrl}addon/lint/coffeescript-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/css-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/html-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/javascript-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/json-lint.min.js`,
        // `${cdnBaseUrl}addon/lint/yaml-lint.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/lint/lint.min.css`,
      ]
    },
    "matchbrackets": {
      'scripts': [
        `${cdnBaseUrl}addon/edit/matchbrackets.min.js`,
      ],
      'css': []
    },
    // "merge": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/merge/merge.min.js`,
    //   ],
    //   'css': [
    //     `${cdnBaseUrl}addon/merge/merge.min.css`,
    //   ]
    // },
    // "mode": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/mode/loadmode.min.js`,
    //     `${cdnBaseUrl}addon/mode/multiplex.min.js`,
    //     `${cdnBaseUrl}addon/mode/multiplex_test.min.js`,
    //     // `${cdnBaseUrl}addon/mode/overlay.min.js`,
    //     `${cdnBaseUrl}addon/mode/simple.min.js`,
    //   ],
    //   'css': []
    // },
    "matchesOnScrollbar": {
      'scripts': [
        `${cdnBaseUrl}addon/scroll/annotatescrollbar.min.js`,
        `${cdnBaseUrl}addon/search/matchesonscrollbar.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/search/matchesonscrollbar.min.css`,
      ]
    },
    "matchtags": {
      'scripts': [
        `${cdnBaseUrl}addon/edit/matchtags.min.js`,
        `${cdnBaseUrl}addon/fold/xml-fold.min.js`,
      ],
      'css': []
    },

    "markSelection": {
      'scripts': [
        `${cdnBaseUrl}addon/selection/mark-selection.min.js`,
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
    // "runmode": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/runmode/colorize.min.js`,
    //     `${cdnBaseUrl}addon/runmode/runmode-standalone.min.js`,
    //     `${cdnBaseUrl}addon/runmode/runmode.min.js`,
    //     `${cdnBaseUrl}addon/runmode/runmode.node.min.js`,
    //   ],
    //   'css': []
    // },
    // "rulers": {
    //   'scripts': [
    //     `${cdnBaseUrl}addon/rulers/rulers.min.js`,
    //   ],
    //   'css': []
    // },
    "selectionPointer": {
      'scripts': [
        `${cdnBaseUrl}addon/selection/selection-pointer.min.js`,
      ],
      'css': []
    },
    "search": {
      'scripts': [
        `${cdnBaseUrl}addon/search/search.min.js`,
        `${cdnBaseUrl}addon/search/searchcursor.min.js`,
      ],
      'css': []
    },
    "scrollpastend": {
      'scripts': [
        `${cdnBaseUrl}addon/scroll/scrollpastend.min.js`,
      ],
      'css': []
    },
    "simpleScrollbars": {
      'scripts': [
        `${cdnBaseUrl}addon/scroll/simplescrollbars.min.js`,
      ],
      'css': [
        `${cdnBaseUrl}addon/scroll/simplescrollbars.min.css`,
      ]
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
    "trailingspace": {
      'scripts': [
        `${cdnBaseUrl}addon/edit/trailingspace.min.js`,
      ],
      'css': []
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
  // console.log('CodeMirror instance found:', editor)

  // Loads js and css addon files
  const loadAddon = async (addon: { scripts: string[]; css: string[] }) => {
    const loadResource = (tag: 'script' | 'link', url: string): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        const element = document.createElement(tag);

        if (tag === 'script') {
          Object.assign(element, {
            type: 'text/javascript',
            src: url,
          });
        } else {
          Object.assign(element, {
            rel: 'stylesheet',
            type: 'text/css',
            href: url,
          });
        }

        element.onload = () => resolve();
        element.onerror = () => reject(new Error(`Failed to load ${url}`));
        document.head.appendChild(element); // Use head instead of body for better practice
      });
    };

    try {
      const scriptPromises = addon.scripts.map(url => loadResource('script', url));
      const cssPromises = addon.css.map(url => loadResource('link', url));
      await Promise.all([...scriptPromises, ...cssPromises]);
      console.log('All resources loaded successfully');
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  };

  // Adds a hidden element to the page that allows the extension to read the code
  const addHiddenElement = (editor: CodeMirror.Editor) => {
    // console.log('addHiddenElement')
    // The editor instance is not available outside this script, so if we want the content of the editor
    // we need to create a new element on the page that the content script can read. 

    // Create a new div element that's invisible and add it to the page
    const hiddenElement = document.createElement('div');
    hiddenElement.id = 'hiddenContent';
    hiddenElement.style.display = 'none';
    // Set the type as 'text/x-python', this is read by the content script to determine how to save the file
    hiddenElement.setAttribute('type', 'text/x-python');
    document.body.appendChild(hiddenElement);

    // Function that updates the hidden element with the contents of CodeMirror
    const updateHiddenContent = () => {
      const hiddenContent = document.getElementById('hiddenContent');
      if (hiddenContent) {
        const editorElement = document.getElementsByClassName('CodeMirror')[0];
        if (editorElement) {
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          const editor: CodeMirror.Editor | undefined = (editorElement as any).CodeMirror;
          if (editor) {
            editor.setValue(hiddenContent.textContent ?? '')
          }
        }
      }
    };
    // Listen for changes in the CodeMirror instance
    hiddenElement.onchange = updateHiddenContent;
    // Update the initial hidden content
    updateHiddenContent();
  };
  addHiddenElement(editor);

  // Applies the options on the user's options page
  const applyCodeMirrorOptions = async (editor: CodeMirror.Editor) => {
    // console.log('applyCodeMirrorOptions')
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
    // console.debug('addToolbar')
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
      console.log('editor found:')
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
  await addToolbar();

  // CodeMirror options
  const gutters = ["CodeMirror-linenumbers"];

  // console.log('codeMirrorOptions:', codeMirrorOptions)
  if (!basicThemes.includes(codeMirrorOptions.theme)) {
    // console.log('Loading custom theme:', codeMirrorOptions.theme)
    await loadAddon({
      scripts: [],
      css: [`${cdnBaseUrl}theme/${codeMirrorOptions.theme}.min.css`],
    })
  };
  editor.setOption('theme' as keyof EditorConfiguration, codeMirrorOptions.theme);
  // console.debug('Theme set:', codeMirrorOptions.theme)

  // await loadAddon(cmFiles.main)

  // // Search
  // if (codeMirrorOptions.search) {
  //   await loadAddon(cmFiles.search)
  //   await loadAddon(cmFiles.dialog);
  //   // console.log('Search loaded')
  // }
  // if (codeMirrorOptions.jumpToLine) {
  //   await loadAddon(cmFiles.jumpToLine)
  //   await loadAddon(cmFiles.dialog);
  //   // console.log('jumpToLine loaded')

  // }
  // if (codeMirrorOptions.matchesOnScrollbar) {
  //   await loadAddon(cmFiles.matchesOnScrollbar)
  // }

  // if (codeMirrorOptions.matchBrackets) {
  //   await loadAddon(cmFiles.matchbrackets)
  // }
  // editor.setOption('matchBrackets' as keyof EditorConfiguration, codeMirrorOptions.matchBrackets);
  // // console.log('matchBrackets loaded')

  // if (codeMirrorOptions.autoCloseBrackets) {
  //   await loadAddon(cmFiles.closebrackets)
  // }
  // editor.setOption('autoCloseBrackets' as keyof EditorConfiguration, codeMirrorOptions.autoCloseBrackets);
  // // console.log('autoCloseBrackets loaded')

  // if (codeMirrorOptions.matchTags) {
  //   // console.log('matchTags loading', cmFiles.matchtags)
  //   await loadAddon(cmFiles.matchtags)
  //   // console.log('matchTags loaded')
  // }
  // editor.setOption('matchTags' as keyof EditorConfiguration, codeMirrorOptions.matchTags);

  // if (codeMirrorOptions.showTrailingSpace) {
  //   await loadAddon(cmFiles.trailingspace)
  // }
  // editor.setOption('showTrailingSpace' as keyof EditorConfiguration, codeMirrorOptions.showTrailingSpace);
  // // console.log('showTrailingSpace loaded')
  // // if (codeMirrorOptions.autoCloseTags) {
  // //   await loadAddon(cmFiles.closetag)
  // // }
  // // editor.setOption('autoCloseTags' as keyof EditorConfiguration, codeMirrorOptions.autoCloseTags);

  // // if (codeMirrorOptions.continueList) {
  // //   await loadAddon(cmFiles.continuelist)
  // // }

  // if (codeMirrorOptions.comments) {
  //   await loadAddon(cmFiles.comment)
  // }

  // // Code folding
  // if (codeMirrorOptions.foldCode) {
  //   await loadAddon(cmFiles.fold);
  //   gutters.push("CodeMirror-foldgutter");
  // }

  // editor.setOption('foldGutter' as keyof EditorConfiguration, codeMirrorOptions.foldCode);
  // // console.log('foldcode loaded')

  // // Wait for the DOM to be fully loaded

  // // const textarea = document.getElementsByClassName('form-control')[1] as HTMLElement;
  // // // Wait for the DOM to be fully loaded
  // // const codeMirrorInstance = $(textarea).data('CodeMirrorInstance');

  // // if (codeMirrorInstance) {
  // //   // Update the CodeMirror instance options to enable foldGutter
  // //   codeMirrorInstance.setOption('gutters', ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
  // //   codeMirrorInstance.setOption('foldGutter', true);

  // //   // Optionally, you can also specify fold functions (e.g., brace-fold, comment-fold)
  // //   // codeMirrorInstance.setOption('foldOptions', {
  // //   //   rangeFinder: (CodeMirror as any).fold.combine((CodeMirror as any).fold.brace, CodeMirror.fold.comment)
  // //   // });

  // //   // Refresh the CodeMirror instance to apply the new options
  // //   codeMirrorInstance.refresh();
  // //   console.log('CodeMirror instance updated.')
  // // } else {
  // //   console.error('CodeMirror instance not found.');
  // // }

  // // Autocomplete
  // if (codeMirrorOptions.autoComplete) {
  //   await loadAddon(cmFiles.hint);
  //   editor.setOption('hintOptions' as keyof EditorConfiguration, {
  //     completeSingle: false,
  //     closeOnUnfocus: false,
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     // hint: (CodeMirror as any).hint.anyword,
  //   });
  //   editor.setOption('extraKeys' as keyof EditorConfiguration, {
  //     'Ctrl-Space': 'autocomplete',
  //     'Cmd-Space': 'autocomplete',
  //     'Ctrl-Enter': () => {
  //       editor.execCommand('autocomplete');
  //     },
  //     'Cmd-Enter': () => {
  //       editor.execCommand('autocomplete');
  //     },
  //   });
  // }

  // if (codeMirrorOptions.highlightSelectionMatches) {
  //   await loadAddon(cmFiles.highlightSelectionMatches)
  // }
  // editor.setOption('highlightSelectionMatches' as keyof EditorConfiguration, codeMirrorOptions.highlightSelectionMatches);

  // // Linting TODO
  // if (codeMirrorOptions.linting) {
  //   await loadAddon(cmFiles.lint)
  // }
  // // editor.setOption('lint' as keyof EditorConfiguration, codeMirrorOptions.highlightSelectionMatches);

  // if (codeMirrorOptions.markSelection) {
  //   await loadAddon(cmFiles.markSelection)
  // }
  // editor.setOption('styleSelectedText' as keyof EditorConfiguration, codeMirrorOptions.markSelection);


  // if (codeMirrorOptions.styleActiveLine) {
  //   await loadAddon(cmFiles.activeLine)
  //   gutters.push("CodeMirror-activeline");
  // }
  // editor.setOption('styleActiveLine' as keyof EditorConfiguration, codeMirrorOptions.styleActiveLine);

  // if (codeMirrorOptions.selectionPointer) {
  //   await loadAddon(cmFiles.selectionPointer)
  // }
  // editor.setOption('selectionPointer' as keyof EditorConfiguration, codeMirrorOptions.selectionPointer);

  // // Set the mode
  // // await loadAddon(cmFiles.modes)
  // // editor.modeOption = {
  // //   name: "python",
  // //   singleLineStringErrors: false,
  // //   version: 2,
  // // };
  // // editor.setOption('mode' as keyof EditorConfiguration, editor.modeOption);
  // // console.log(`CM Mode: `, editor.modeOption)

  // if (codeMirrorOptions.continueComments) {
  //   await loadAddon(cmFiles.continuecomment)
  //   // console.log('continuecomment loaded')
  // }

  // // This is kind of gross, i can probably make a better one
  // // Fullscreen
  // // addonPromises.push(...loadAddon(cmFiles.fullscreen));
  // // editor.setOption("extraKeys", {
  // //   F11: function (cm) {
  // //     if (cm.getOption('fullScreen' as keyof EditorConfiguration)) {
  // //       cm.setOption('fullScreen' as keyof EditorConfiguration, false);
  // //     } else {
  // //       cm.setOption('fullScreen' as keyof EditorConfiguration, true);
  // //     }
  // //   }
  // // });

  // if (['overlay', 'simple'].includes(codeMirrorOptions.scrollbarStyle)) {
  //   await loadAddon(cmFiles.simpleScrollbars)
  // }
  // editor.setOption('scrollbarStyle' as keyof EditorConfiguration, codeMirrorOptions.scrollbarStyle);

  // if (codeMirrorOptions.scrollPastEnd) {
  //   await loadAddon(cmFiles.scrollpastend)
  // }
  // editor.setOption('scrollPastEnd' as keyof EditorConfiguration, codeMirrorOptions.scrollPastEnd);

  // // Keymaps
  // switch (codeMirrorOptions.keyMap) {
  //   case "sublime":
  //     await loadAddon(cmFiles.sublime)
  //     editor.addKeyMap("sublime")
  //     break;
  //   case "vim":
  //     await loadAddon(cmFiles.vim)
  //     editor.addKeyMap("vim")
  //     break;
  //   case "emacs":
  //     await loadAddon(cmFiles.emacs)
  //     editor.addKeyMap("emacs")
  //     break;
  //   default:
  //     editor.addKeyMap("default")
  // }

  // editor.setOption('gutters', gutters);
  // console.log('Gutters set:', gutters)

  // // Set the options defined in the codeMirrorOptions object
  // // Needs to happen after the scripts are loaded
  // await applyCodeMirrorOptions(editor);

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // console.log('codeMirrorMods ended with options:', (editor as any).options)
  return true;
}