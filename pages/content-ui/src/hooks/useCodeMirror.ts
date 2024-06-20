import { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { editorState } from '../util/codeMirror';

export const useCodeMirror = (userOptions: any) => {
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorViewRef.current) {
      editorViewRef.current = new EditorView({
        state: editorState(userOptions, editorViewRef),
        parent: document.getElementById("custom-editor") as HTMLElement,
      });
      console.log('editorView', editorViewRef.current);
    }
  }, [userOptions]);

  return editorViewRef;
};
