/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback, useRef } from 'react';
// import ReactDOM from 'react-dom';
import {
  Button, Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography
} from '@mui/material';
import { ResizableBox } from 'react-resizable';
import type { SelectChangeEvent } from '@mui/material';
import {
  // ZoomOutMap,
  // ZoomInMap,
  // Fullscreen,
  KeyboardArrowUp,
  KeyboardArrowDown,
  PlayArrow, Clear, Code, Functions, Api, Search
} from '@mui/icons-material';
import '@mui/material/styles';
import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';
import FullScreenAlert from './FullScreenAlert';

// import * as monaco from 'monaco-editor';
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
// import Editor, { loader } from '@monaco-editor/react';

// self.MonacoEnvironment = {
//   getWorker(_, label) {
//     if (label === 'json') {
//       return new jsonWorker();
//     }
//     if (label === 'css' || label === 'scss' || label === 'less') {
//       return new cssWorker();
//     }
//     if (label === 'html' || label === 'handlebars' || label === 'razor') {
//       return new htmlWorker();
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return new tsWorker();
//     }
//     return new editorWorker();
//   },
// };

// loader.config({ monaco });

// loader.init();

export default function App() {
  const { userOptions, setUserOptions } = useAppContext();
  // console.log('init userOptions:', userOptions)

  const [isFolded, setIsFolded] = useState(false);

  const [selectedWorkbenchView, setSelectedWorkbenchView] = useState(userOptions.workbenchView || 'Default');
  // console.log('selectedWorkbenchView:', selectedWorkbenchView)
  const [selectedScriptingView, setSelectedScriptingView] = useState(userOptions.scriptingView || 'Default');
  // console.log('selectedScriptingView:', selectedScriptingView)
  const [scriptingMode, setScriptingMode] = useState(userOptions.scriptingMode || 'Default');

  const [isWorkbench, setIsWorkbench] = useState<boolean>(false);

  const [showFullScreenAlert, setShowFullScreenAlert] = useState(true);
  const [isFullScreenAlertOpen, setIsFullScreenAlertOpen] = useState(false);

  const editorRef = useRef<HTMLElement | null>(null);
  const editorInfoRef = useRef<HTMLElement | null>(null);
  const toolbarRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLElement | null>(null);
  const traceContainerRef = useRef<HTMLElement | null>(null);
  const traceRef = useRef<HTMLElement | null>(null);
  const traceBodyRef = useRef<HTMLElement | null>(null);
  const traceTitleRef = useRef<HTMLElement | null>(null);
  const buttonBarRef = useRef<HTMLElement | null>(null);
  const workbenchTitleRef = useRef<HTMLElement | null>(null);
  const scriptToolbarRef = useRef<HTMLElement | null>(null);

  const originalEditorStyle = useRef<string>('');
  const originalToolbarStyle = useRef<string>('');

  useEffect(() => {
    console.log('content ui loaded');
    editorRef.current = document.getElementsByClassName('CodeMirror')[0] as HTMLElement;
    editorInfoRef.current = document.getElementsByClassName('script-info')[0] as HTMLElement;
    toolbarRef.current = document.getElementById('sap-cpq-tools') as HTMLElement;
    scrollRef.current = document.getElementsByClassName('CodeMirror-scroll')[0] as HTMLElement;
    traceContainerRef.current = document.querySelector('.form-horizontal div') as HTMLElement;
    traceRef.current = document.getElementById('tracesContainer') as HTMLElement;
    traceBodyRef.current = document.querySelector('#tracesContainer table tbody') as HTMLElement;
    traceTitleRef.current = document.querySelector('.tracetitle') as HTMLElement;
    buttonBarRef.current = document.querySelector('.col-sm-6.control-label.text-right') as HTMLElement;
    workbenchTitleRef.current = document.querySelector('#scriptDebuggerContainer div div h3') as HTMLElement;
    scriptToolbarRef.current = document.querySelector('.script-toolbar') as HTMLElement;

    if (editorRef.current) {
      originalEditorStyle.current = editorRef.current.style.cssText;
    }
    if (toolbarRef.current) {
      originalToolbarStyle.current = toolbarRef.current.style.cssText;
      setIsWorkbench(true);
    }
    // Retrieve userOptions from storage when the component mounts
    chrome.storage.local.get("userOptions", (result) => {
      if (result.userOptions) {
        const storedUserOptions = JSON.parse(result.userOptions);
        setUserOptions(storedUserOptions);
        setSelectedWorkbenchView(storedUserOptions.workbenchView || 'Default');
        setSelectedScriptingView(storedUserOptions.scriptingView || 'Default');
      }
    });

    // Auto-scroll logic
    if (traceRef.current) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            traceRef.current!.scrollTop = traceRef.current!.scrollHeight;
          }
        });
      });

      observer.observe(traceRef.current, { childList: true, subtree: true });

      // Clean up observer on component unmount
      // return () => {
      //   observer.disconnect();
      // };
    }
  }, [setUserOptions]);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && editorRef.current && toolbarRef.current) {
      editorRef.current.style.cssText = originalEditorStyle.current;
      toolbarRef.current.style.cssText = originalToolbarStyle.current;
      document.removeEventListener('keydown', handleEscape);
    }
  }, []);

  const handleFullScreenClick = useCallback(() => {
    if (editorRef.current && toolbarRef.current && scrollRef.current) {
      editorRef.current.classList.add('col-sm-8', 'col-md-8', 'largeleft');
      editorRef.current.style.position = 'fixed';
      editorRef.current.style.top = '40px';
      editorRef.current.style.left = '0';
      editorRef.current.style.width = '100vw';
      editorRef.current.style.height = 'calc(100vh - 40px)';
      editorRef.current.style.zIndex = '1000';
      editorRef.current.style.overflow = 'auto';

      toolbarRef.current.style.position = 'fixed';
      toolbarRef.current.style.top = '0';
      toolbarRef.current.style.left = '0';
      toolbarRef.current.style.width = '100vw';
      toolbarRef.current.style.zIndex = '1001';
      toolbarRef.current.style.display = 'flex';

      scrollRef.current.style.maxHeight = 'none';

      document.addEventListener('keydown', handleEscape);
      if (showFullScreenAlert) {
        setIsFullScreenAlertOpen(true);
      }
    } else {
      console.error('CodeMirror editor or toolbar element not found');
    }
  }, [handleEscape, showFullScreenAlert]);

  const handleSideBySideEditor = useCallback(() => {
    if (editorRef.current
      && traceRef.current
      && traceTitleRef.current
      && traceBodyRef.current
      && editorInfoRef.current
      && workbenchTitleRef.current
      && scriptToolbarRef.current
      && toolbarRef.current) {
      let wrapper = document.getElementById('editor-trace-wrapper');
      if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.id = 'editor-trace-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'row';
        wrapper.style.width = '100%';

        // Append the editor and trace containers to the wrapper
        editorRef.current.parentElement?.insertBefore(wrapper, editorInfoRef.current);
        wrapper.appendChild(editorRef.current);
        wrapper.appendChild(traceRef.current);
      }

      const parentContainer = editorRef.current.parentElement;

      if (parentContainer) {
        // Apply flexbox to the parent container
        parentContainer.style.display = 'flex';
        parentContainer.style.flexDirection = 'row';
        parentContainer.style.width = '100%';
      }

      editorRef.current.classList.remove('col-sm-8', 'col-md-8', 'col-md-12', 'col-sm-12');
      editorRef.current.classList.add('col-sm-6', 'col-md-6');
      // editorRef.current.style.display = 'inline-flex'; //  breaks scroll placement in shifted view
      editorRef.current.style.height = 'calc(100vh - 225px)';
      // editorRef.current.style.maxHeight = '500px';
      editorRef.current.style.display = 'block';
      editorRef.current.style.float = 'left';
      editorRef.current.style.width = '50%';
      console.log('editorRef:', editorRef.current);

      editorInfoRef.current.classList.remove('text-right');
      editorInfoRef.current.classList.add('text-left');
      // editorInfoRef.current.style.display = 'inline-flex'; //  breaks scroll placement in shifted view
      // editorInfoRef.current.style.height = 'inherit';
      // editorInfoRef.current.style.maxHeight = '20000px';
      // editorInfoRef.current.style.float = 'left';
      editorInfoRef.current.style.width = '50%';
      console.log('editorRef:', editorRef.current);

      traceRef.current.classList.remove('col-md-4', 'col-sm-4', 'col-md-12', 'col-sm-12');
      traceRef.current.classList.add('col-sm-6', 'col-md-6');
      traceRef.current.style.display = 'block';
      traceRef.current.style.height = 'calc(100vh - 225px)';
      traceRef.current.style.maxHeight = 'calc(100vh - 225px)';
      traceRef.current.style.float = 'right';
      traceRef.current.style.width = '50%';
      console.log('traceRef:', traceRef.current);

      // Normally the trace element doesn't appear until there is something to display

      // Get the parent of the traceRef element and make it display by default
      if (traceRef.current.parentElement?.parentElement) {
        traceRef.current.parentElement.parentElement.style.display = ''; // Used to be 'none'
      }

      // Just for funzies we add something to the trace container by default

      //       traceBodyRef.current.textContent = `
      //                           SAP CPQ REBORN

      //                 (                           )
      //           ) )( (                           ( ) )( (
      //        ( ( ( )  ) )                     ( (   (  ) )(
      //       ) )     ,,\\                     ///,,       ) (
      //    (  ((    (\\\\//                     \\////)      )
      //     ) )    (-(__//                       \\__)-)     (
      //    (((   ((-(__||                         ||__)-))    ) )
      //   ) )   ((-(-(_||           \`\`\`\\__        ||_)-)-))   ((
      //   ((   ((-(-(/(/\\        \`\`; 9.- \`      //\\)\\)-)-))    )
      //    )   (-(-(/(/(/\\      \`\`;;;;-\\~      //\\)\\)\\)-)-)   (  )
      //  ( (   ((-(-(/(/(/\\======,:;:;:;:,======/\\)\\)\\)-)-))   )
      //     )  \`(((-(/(/(/(//////:%%%%%%%:\\\\\\)\\)\\)\\)-)))\`  ( (
      //    ((   \`((-(/(/(/(\`uuuu:WWWWWWWWW:uuuu\`)\\)\\)\\)-))\`    )
      //      ))  \`((-(/(/(/(\`|||:wwwwwwwww:|||\`)\\)\\)\\)-))\`    ((
      //     ( ((   \`((((/(/(\`uuu:WWWWWWWWW:uuu\`)\\)\\))))\`     ))
      //         ))   \`\`:::UUUUUU:wwwwwwwww:UUUUUU:::\`\`     (( )
      //           ((      \`\`\`\`\`\`\`\\uuuuuuuu/\`\`\`\`\`\`         ))
      //            ))            \`JJJJJJJJJ\`           ((
      //              ((            LLLLLLLLLLL         ))
      //                ))         ///|||||||\\       ((
      //                  ))      (/(/(/(^)\\)\\)\\)       ((
      //                   ((                           ))
      //                     ((                       ((
      //                       ( )( ))( ( ( ) )( ) (()
      // `;

      // traceBodyRef.current.textContent = `SAP CPQ REBORN`;

      // Move the toolbar ref to be in the scriptToolbarRef, but the second element in the list
      scriptToolbarRef.current.insertBefore(toolbarRef.current, scriptToolbarRef.current.children[1]);



      // const handleEditorChange = (value: string | undefined, event: monaco.editor.IModelContentChangedEvent) => {
      //   console.log('here is the current model value:', value);
      //   console.log('here is the event:', event);
      // };

      // Create a portal for MyComponent
      // const componentElement = document.createElement('div');
      // scriptToolbarRef.current.insertBefore(componentElement, scriptToolbarRef.current.children[1]);
      // ReactDOM.createPortal(<Editor
      //   height="100%"
      //   defaultLanguage="python"
      //   defaultValue="if (true):
      //     print('Hello World')
      //     else:
      //     print('Bye World')"
      //   onChange={handleEditorChange}
      //   options={{
      //     wordWrap: 'bounded',
      //     rulers: [120],
      //   }}
      // />, componentElement);

      // // Make the mode selector smaller
      // const modeDiv = scriptToolbarRef.current.querySelector('div form div') as HTMLElement
      // modeDiv.classList.remove('col-sm-10');
      // modeDiv.classList.add('col-sm-8');

      // const modeSelector = scriptToolbarRef.current.querySelector('div form div select') as HTMLElement
      // modeSelector.style.width = '100px';
      // modeSelector.style.minWidth = '100px';

      // 
      // const runMenu = scriptToolbarRef.current.querySelector('.col-sm-6') as HTMLElement
      // runMenu.style.display = 'None';

      // const buttonMenu = scriptToolbarRef.current.querySelector('.col-sm-5') as HTMLElement
      // buttonMenu.style.display = 'None';

      // Move around classes to make things fit better
      // scriptToolbarRef.current.children[0].classList.remove('col-sm-6');
      // scriptToolbarRef.current.children[0].classList.add('col-sm-3');
      // scriptToolbarRef.current.children[2].classList.remove('col-sm-6');
      // scriptToolbarRef.current.children[2].classList.add('col-sm-5');

      (scriptToolbarRef.current.children[1] as HTMLElement).style.display = 'None';
      (scriptToolbarRef.current.children[2] as HTMLElement).style.display = 'None';

      // Hide the workbench title, useless wasted space
      workbenchTitleRef.current.style.display = 'none';

      traceTitleRef.current.style.display = 'none';
      console.log('traceTitleRef:', traceTitleRef.current);
    } else {
      console.error('Trace window or title not found');
    }
  }, []);

  const handleRunClick = (event: React.MouseEvent) => {
    // console.log('Run button clicked!')
    event.preventDefault();
    if (scriptToolbarRef.current) {
      const runButton = scriptToolbarRef.current.querySelector('.col-sm-6 button') as HTMLAnchorElement;
      console.log('runButton:', runButton)
      if (runButton) {
        runButton.click();
        // console.log('Run element clicked!')
      }
    }
  };

  const handleModeChange = useCallback((event: SelectChangeEvent<ScriptingModes>) => {
    // console.log('handleViewChange:', event.target.value)
    console.log('userOptions:', userOptions)
    const mode = event.target.value as ScriptingModes;
    // const mode = 'Standard' as ScriptingModes;
    userOptions.scriptingMode = mode;
    setUserOptions((prevValues) => ({
      ...prevValues,
      ['scriptingMode']: mode,
    }));
    saveToStorage("userOptions", {
      ...userOptions,
      ['scriptingMode']: mode,
    });
    setScriptingMode(mode);

    if (scriptToolbarRef.current) {
      const modeSelect = scriptToolbarRef.current.querySelector('.col-sm-6 form div select') as HTMLSelectElement;
      console.log('modeSelect:', modeSelect)
      if (modeSelect) {
        console.log(`setting mode to ${mode}`)
        modeSelect.value = mode.toLowerCase();
        // console.log('Run element clicked!')

        // Dispatch a change event to ensure the change is recognized
        const changeEvent = new Event('change', { bubbles: true });
        modeSelect.dispatchEvent(changeEvent);
      }
    }

  }, [setUserOptions, userOptions]);

  const handleTraceClearClick = (event: React.MouseEvent) => {
    console.log('Clear traces button clicked')
    event.preventDefault();
    const clearLink = document.querySelector('.tracetitle a') as HTMLAnchorElement;
    console.log('clearLink:', clearLink)
    if (clearLink) {
      clearLink.click();
      console.log('Clear traces button clicked')
    }
  };

  const handleFoldClick = (event: React.MouseEvent) => {
    console.log('Fold button clicked')
  };

  const handleFullscreenClick = (event: React.MouseEvent) => {
    console.log('Fullscreen button clicked')
  };

  const handlePythonClick = (event: React.MouseEvent) => {
    console.log('Python Snippets button clicked')
    event.preventDefault();
    if (scriptToolbarRef.current) {
      const buttonList = scriptToolbarRef.current.querySelector('.control-label') as HTMLAnchorElement;
      console.log('buttonList:', buttonList)
      if (buttonList) {
        (buttonList.children[0] as HTMLAnchorElement).click();
      }
    }
  };

  const handleAliasClick = (event: React.MouseEvent) => {
    console.log('Alias snippets button clicked')
    event.preventDefault();
    if (scriptToolbarRef.current) {
      const buttonList = scriptToolbarRef.current.querySelector('.control-label') as HTMLAnchorElement;
      console.log('buttonList:', buttonList)
      if (buttonList) {
        (buttonList.children[1] as HTMLAnchorElement).click();
      }
    }
  };

  const handleApiClick = (event: React.MouseEvent) => {
    console.log('API snippets  button clicked')
    event.preventDefault();
    if (scriptToolbarRef.current) {
      const buttonList = scriptToolbarRef.current.querySelector('.control-label') as HTMLAnchorElement;
      console.log('buttonList:', buttonList)
      if (buttonList) {
        (buttonList.children[2] as HTMLAnchorElement).click();
      }
    }
  };

  const handleApiExplorerClick = (event: React.MouseEvent) => {
    console.log('API Explorer button clicked')
    event.preventDefault();
    if (scriptToolbarRef.current) {
      const buttonList = scriptToolbarRef.current.querySelector('.control-label') as HTMLAnchorElement;
      console.log('buttonList:', buttonList)
      if (buttonList) {
        (buttonList.children[3] as HTMLAnchorElement).click();
      }
    }
  };

  const handleFullScreenAlertClose = (doNotShowAgain: boolean) => {
    setIsFullScreenAlertOpen(false);
    if (doNotShowAgain) {
      setShowFullScreenAlert(false);
    }
  };

  if (isWorkbench) {
    handleSideBySideEditor();
  }

  return (
    <Grid container direction="row" spacing={2} alignItems="center">
      {isWorkbench && (
        <>
          <Grid item>
            <Button
              onClick={handleRunClick}
              tabIndex={0}
              variant="contained"
              color="primary"
              sx={{
                height: '30px',
                padding: '0 16px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '14px',
              }}
              startIcon={<PlayArrow />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Run</Typography>
            </Button>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: '120px', fontSize: '14px' }}>
              <InputLabel id="modePickSlctLabel">Mode</InputLabel>
              <Select
                labelId="modePickSlctLabel"
                id="modePickSlct"
                value={scriptingMode}
                onChange={handleModeChange}
                label="Mode"
                sx={{
                  height: '30px',
                  fontSize: '14px',
                }}
                MenuProps={{
                  MenuListProps: {
                    sx: {
                      padding: '0px',
                    },
                  },
                }}
              >
                <MenuItem key="standard" value="Standard">Standard</MenuItem>
                <MenuItem key="test" value="Test">Test</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              onClick={handleTraceClearClick}
              tabIndex={0}
              variant="contained"
              color="secondary"
              sx={{
                height: '30px',
                padding: '0 16px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '14px',
              }}
              startIcon={<Clear />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Clear Trace</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleFoldClick}
              tabIndex={0}
              variant="outlined"
              sx={{
                height: '30px',
                padding: '0 16px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '14px',
              }}
              startIcon={<KeyboardArrowUp />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Fold</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleFullScreenClick}
              tabIndex={0}
              variant="outlined"
              sx={{
                height: '30px',
                padding: '0 16px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '14px',
              }}
              startIcon={<KeyboardArrowDown />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Fullscreen</Typography>
            </Button>
          </Grid>
          <Grid item sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
            <Button
              onClick={handlePythonClick}
              tabIndex={0}
              variant="outlined"
              sx={{
                height: '30px',
                padding: '0 8px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '12px',
                backgroundColor: '#e0e0e0',
              }}
              startIcon={<Code />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Python</Typography>
            </Button>
            <Button
              onClick={handleAliasClick}
              tabIndex={0}
              variant="outlined"
              sx={{
                height: '30px',
                padding: '0 8px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '12px',
                backgroundColor: '#e0e0e0',
              }}
              startIcon={<Functions />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Alias</Typography>
            </Button>
            <Button
              onClick={handleApiClick}
              tabIndex={0}
              variant="outlined"
              sx={{
                height: '30px',
                padding: '0 8px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '12px',
                backgroundColor: '#e0e0e0',
              }}
              startIcon={<Api />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>API</Typography>
            </Button>
            <Button
              onClick={handleApiExplorerClick}
              tabIndex={0}
              variant="outlined"
              sx={{
                height: '30px',
                padding: '0 8px',
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 'normal',
                fontSize: '12px',
                backgroundColor: '#e0e0e0',
              }}
              startIcon={<Search />}
            >
              <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Explorer</Typography>
            </Button>
          </Grid>
        </>
      )}
      <FullScreenAlert open={isFullScreenAlertOpen} onClose={handleFullScreenAlertClose} />
    </Grid>
  );
}
