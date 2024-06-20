// import CodeMirror, { useCodeMirror } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python"
// import { basicSetup } from 'codemirror'
import { dracula } from '@uiw/codemirror-theme-dracula';
import {
  EditorState,
} from "@codemirror/state"
import {
  EditorView,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap,
  ViewUpdate,
  scrollPastEnd,
  placeholder,
} from '@codemirror/view';
import {
  indentUnit,
  indentOnInput,
  codeFolding,
  foldGutter,
  foldKeymap,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldAll,
  unfoldAll,
} from '@codemirror/language';
import { indentWithTab, history, defaultKeymap, historyKeymap } from '@codemirror/commands';
import { search, highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { linter, lintGutter, lintKeymap, LintSource } from '@codemirror/lint';
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap";
// import { oneDark, oneDarkTheme } from "@codemirror/theme-one-dark";
import {
  handleRunClick,
  updateHiddenElement,
  hideToastContainer,
  autoScrollTrace,
  repositionTraceWindow,
  handleModeChange,
  handlePythonClick,
  handleAliasClick,
  handleApiClick,
  handleApiExplorerClick,
  handleTraceClearClick
} from './scriptWorkbench';

export const logoString = `
      ⠀⠀⠀⠀⢀⣴⢿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⢀⡾⠁⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⢠⢺⠃⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⢠⠏⢸⡄⠈⣇⠀⠀Daedalus⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⢸⡀⢸⡄⠀⠹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⢀⡜⡇⠈⣿⡀⠀⠙⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⢸⠀⢳⠄⠹⣿⡄⠀⠈⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⣸⠆⢸⣧⡄⢸⣿⣶⠀⢠⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠷⡀⠹⣷⣄⣻⣿⡟⠺⣷⡀⠉⠓⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀
      ⢧⠀⣶⣄⡘⢿⣦⣽⣿⣄⠈⢱⡦⠀⠀⠉⠓⢤⡀⠀⠀⠀⠀⠀
      ⠘⣇⠈⠻⣷⡜⢻⣧⠉⠻⣄⠈⢻⣶⣴⠶⡄⠀⠙⡆⠀⠀⠀⠀
      ⠀⢻⠉⣄⠈⢿⣿⣿⣷⠀⠀⣶⣤⣀⣷⣀⠀⠀⠀⣸⠀⠀⠀⠀
      ⠀⠀⢧⡈⢿⣥⣍⣿⠉⠉⠃⢶⣦⣿⠀⠀⠀⠀⡚⠋⠀⠀⠀⠀
      ⠀⠀⠈⠳⣤⣈⠛⠻⢷⣦⣤⡄⣶⣾⣿⠃⠀⠀⠛⢦⡄⠀⠀⠀
      ⠀⠀⠀⠀⠀⠉⠒⠒⣾⠋⠁⠀⣈⣽⣿⣷⡆⠀⠀⠀⠘⡄⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠹⠦⢴⠋⠁⠀⠹⣿⣿⣿⠀⠀⠀⠙⣄⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢤⠴⠋⠀⡀⠛⠿⠟⡇⠠⠤⠤⠷
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠤⠴⣇⣠⣏⣰⠁⠀⠀⠀⠀
      `;

export const editorState = (
  userOptions: UserOptions,
  editorViewRef: React.MutableRefObject<EditorView | null>
) => {
  return EditorState.create({
    doc: userOptions.workbenchCode || logoString,
    extensions: [
      // // You could use basicSetup from the 'codemirror' npm package, but it's the same as below
      // basicSetup,
      // lineNumbers(),
      // highlightActiveLineGutter(),
      // highlightSpecialChars(),
      // history(),
      // foldGutter(),
      // codeFolding(),
      // drawSelection(),
      // dropCursor(),
      // indentOnInput(),
      // syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      // bracketMatching(),
      // closeBrackets(),
      // autocompletion(),
      // search(),
      // rectangularSelection(),
      // crosshairCursor(),
      // highlightActiveLine(),
      // highlightSelectionMatches(),

      // Language extension
      python(),

      // # Core Extensions

      // ## Editing https://codemirror.net/docs/extensions/#editing

      // ### Whitespace
      EditorState.tabSize.of(4), // Default: 4
      EditorState.lineSeparator.of('\n'), // Default: '\n'
      indentUnit.of('    '), // Default: '  ' (two spaces)
      indentOnInput(),

      // // ### Read-Only
      // EditorView.editable.of(true), // Default: true
      // EditorState.readOnly.of(false), // Default: false

      // // ### Editing Helpers
      EditorState.allowMultipleSelections.of(true), // Default: false
      autocompletion(),
      closeBrackets(),
      codeFolding(),
      history(),
      search(),

      // ## Presentation
      // oneDark, // Theme
      dracula, // Theme
      EditorView.theme({
        "&": { height: "100%", maxHeight: "100%" },
        ".cm-scroller": { overflow: "auto" },
        ".cm-content, .cm-gutter": { minHeight: "222px" }
      }), // Customization

      // ## Presentation Features
      drawSelection(),
      EditorView.lineWrapping,
      highlightActiveLine(),
      highlightSpecialChars(),
      scrollPastEnd(),
      bracketMatching(),
      highlightSelectionMatches(),
      placeholder("Enter your code here..."),

      // ## Gutters
      lineNumbers(),
      foldGutter(),
      lintGutter(),
      highlightActiveLineGutter(),

      // ## Tooltips
      // TODO: Add tooltips

      // Input Handling
      dropCursor(),
      keymap.of([
        ...defaultKeymap as any,
        ...closeBracketsKeymap as any,
        ...searchKeymap as any,
        ...historyKeymap as any,
        ...foldKeymap as any,
        ...completionKeymap as any,
        ...lintKeymap as any,
        ...vscodeKeymap as any,
        indentWithTab as any,
      ]),
      // EditorView.dragMovesSelection, // TODO: Figure this out
      rectangularSelection(),
      crosshairCursor(),

      // Language 
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      // linter(source: null),

      // Primitives
      EditorView.updateListener.of((update: ViewUpdate) => {
        if (update.docChanged) {
          updateHiddenElement(editorViewRef, userOptions);
        }
      }),
    ],
  })
}

export const handleFoldClick = (
  setIsFolded: React.Dispatch<React.SetStateAction<boolean>>,
  editorViewRef: React.MutableRefObject<EditorView | null>
) => {
  setIsFolded((prevValue) => {
    if (editorViewRef.current) {
      if (prevValue) {
        // console.log('unfolding code');
        unfoldAll(editorViewRef.current);
      } else {
        // console.log('folding code');
        foldAll(editorViewRef.current);
      }
    } else {
      console.error('CodeMirror editor not found');
    }
    return !prevValue;
  });
};

// const handleFullScreenClick = useCallback(() => {
//   if (editorRef.current && toolbarRef.current && scrollRef.current) {
//     editorRef.current.classList.add('col-sm-8', 'col-md-8', 'largeleft');
//     editorRef.current.style.position = 'fixed';
//     editorRef.current.style.top = '40px';
//     editorRef.current.style.left = '0';
//     editorRef.current.style.width = '100vw';
//     editorRef.current.style.height = 'calc(100vh - 40px)';
//     editorRef.current.style.zIndex = '1000';
//     editorRef.current.style.overflow = 'auto';

//     toolbarRef.current.style.position = 'fixed';
//     toolbarRef.current.style.top = '0';
//     toolbarRef.current.style.left = '0';
//     toolbarRef.current.style.width = '100vw';
//     toolbarRef.current.style.zIndex = '1001';
//     toolbarRef.current.style.display = 'flex';

//     scrollRef.current.style.maxHeight = 'none';

//     document.addEventListener('keydown', handleEscape);
//     if (showFullScreenAlert) {
//       setIsFullScreenAlertOpen(true);
//     }
//   } else {
//     console.error('CodeMirror editor or toolbar element not found');
//   }
// }, [handleEscape, showFullScreenAlert]);

// const handleEscape = useCallback((event: KeyboardEvent) => {
//   if (event.key === 'Escape' && editorRef.current && toolbarRef.current) {
//     editorRef.current.style.cssText = originalEditorStyle.current;
//     toolbarRef.current.style.cssText = originalToolbarStyle.current;
//     document.removeEventListener('keydown', handleEscape);
//   }
// }, []);

// const handleSplitEditorClick = (event: React.MouseEvent) => {
//   console.log('Split editor button clicked')
// };

// const handleFullScreenAlertClose = (doNotShowAgain: boolean) => {
//   setIsFullScreenAlertOpen(false);
//   if (doNotShowAgain) {
//     setShowFullScreenAlert(false);
//   }
// };