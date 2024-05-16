/* eslint-disable import/namespace */
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from '@codemirror/view';
import { langs } from "@uiw/codemirror-extensions-langs";
// import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import {
  // autoCloseTags as javascriptCloseTags,
  esLint,
  // scopeCompletionSource as javascriptCompletionSource,
} from "@codemirror/lang-javascript";
import {
  linter,
  lintGutter,
  forEachDiagnostic,
} from "@codemirror/lint";

import type { Diagnostic } from "@codemirror/lint";

import * as eslint from "eslint-linter-browserify";

import * as themes from "@uiw/codemirror-themes-all";

const config = {
  // eslint configuration
  languageOptions: {
    // globals: {
    //   ...globals.node,
    // },
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  rules: {
    semi: ["error", "never"],
  },
};

/* See https://github.com/uiwjs/react-codemirror for documentation */

const ModEditor: React.FC<ModEditProps> = ({
  mod,
  setMod,
  preferences,
}) => {
  let lintProcessor: ((view: EditorView) => Diagnostic[]) | null = null;

  const extensions = [
    linter(lintProcessor),
    lintGutter(),
  ];

  const langData = langs[mod.language as keyof typeof langs];

  if (langData) {
    // console.log("Language data:", mod.language);
    extensions.splice(0, 0, langData());
  }

  // console.log(extensions);

  if (mod.language === "javascript") {
    lintProcessor = esLint(new eslint.Linter(), config);
  }

  if (mod.language === "typescript") {
    lintProcessor = esLint(new eslint.Linter(), config);
  }

  return (
    <div>
      <CodeMirror
        value={mod.content}
        style={{
          border: mod.isValidCode ? "none" : "1px solid red",
        }}
        height="200px"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        theme={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          themes[preferences?.codeMirrorTheme as keyof typeof themes] ||
          preferences?.codeMirrorTheme
        }
        basicSetup={{
          lineNumbers: true,
          // highlightActiveLineGutter: true,
          // foldGutter: true,
          // dropCursor: true,
          // allowMultipleSelections: true,
          // indentOnInput: true,
          // bracketMatching: true,
          // closeBrackets: true,
          autocompletion: true,
          // rectangularSelection: true,
          // crosshairCursor: true,
          // highlightActiveLine: true,
          // highlightSelectionMatches: true,
          // closeBracketsKeymap: true,
          // searchKeymap: true,
          // foldKeymap: true,
          // completionKeymap: true,
          lintKeymap: true,
          tabSize: 2,
        }}
        extensions={extensions}
        // As soon as this element is visible we check to see if the code is valid or not
        onCreateEditor={(view, state) => {
          let isValid = true;
          forEachDiagnostic(state, (d) => {
            if (d.severity === "error") {
              console.error("Error:", d);
              setMod(mod.id, "isValidCode", false);
              isValid = false;
            }
          });
          // Changing the state will trigger a re-render, which triggers an update
          // So only change the state when it's necessary
          if (!isValid && mod.isValidCode) {
            setMod(mod.id, "isValidCode", false);
          } else if (isValid && !mod.isValidCode) {
            setMod(mod.id, "isValidCode", true);
          }
        }}
        onUpdate={(viewUpdate) => {
          let isValid = true;
          forEachDiagnostic(viewUpdate.state, (d) => {
            if (d.severity === "error") {
              console.error("Error:", d);
              setMod(mod.id, "isValidCode", false);
              isValid = false;
            }
          });
          // Changing the state will trigger a re-render, which triggers an update
          // So only change the state when it's necessary
          if (!isValid && mod.isValidCode) {
            setMod(mod.id, "isValidCode", false);
          } else if (isValid && !mod.isValidCode) {
            setMod(mod.id, "isValidCode", true);
          }
        }}
      // If validCode is false, the editor will be highlighted in red
      />
    </div>
  );
};

export default ModEditor;
