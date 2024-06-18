import '@src/Newtab.css';
import '@src/Newtab.scss';
import {
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import Editor, { loader } from '@monaco-editor/react';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });

loader.init();

const Newtab = () => {
  const handleEditorChange = (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => {
    console.log('here is the current model value:', value);
    console.log('here is the event:', event);
  };

  return (
    <div className="App">
      <div style={{ height: '70vh', margin: '20px 0' }}>
        <Editor
          height="100%"
          defaultLanguage="python"
          defaultValue="if (true):
          print('Hello World')
          else:
          print('Bye World')"
          onChange={handleEditorChange}
          options={{
            wordWrap: 'bounded',
            rulers: [120],
          }}
        />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Newtab, <div> Loading ... </div>), <div> Error Occur </div>);
