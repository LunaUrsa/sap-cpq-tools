/* eslint-disable import/namespace */
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {
  css,
} from "@codemirror/lang-css";

import * as themes from "@uiw/codemirror-themes-all";

/* See https://github.com/uiwjs/react-codemirror for documentation */

const ModEditor: React.FC<ModEditProps> = ({
  mod,
  setMod,
  preferences,
}) => {
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
          themes[preferences?.codeMirrorTheme as keyof typeof themes] ||
          preferences?.codeMirrorTheme
        }
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
          tabSize: 2,
        }}
        extensions={[
          css(),
        ]}
        onUpdate={(viewUpdate) => {
          setMod(mod.id, "content", viewUpdate.state.doc.toString());
        }}
      />
    </div>
  );
};

export default ModEditor;
