import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  // ZoomOutMap,
  // ZoomInMap,
  // Fullscreen,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';
import '@mui/material/styles';
import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';
import FullScreenAlert from './FullScreenAlert';

export default function App() {
  const { userOptions, setUserOptions } = useAppContext();
  // console.log('init userOptions:', userOptions)

  const [selectedWorkbenchView, setSelectedWorkbenchView] = useState(userOptions.workbenchView || 'Default');
  // console.log('selectedWorkbenchView:', selectedWorkbenchView)
  const [selectedScriptingView, setSelectedScriptingView] = useState(userOptions.scriptingView || 'Default');
  // console.log('selectedScriptingView:', selectedScriptingView)

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

  const handleViewChange = useCallback((event: SelectChangeEvent<WorkbenchViews | ScriptingViews>) => {
    console.log('handleViewChange:', event.target.value)
    console.log('userOptions:', userOptions)
    const view = event.target.value;
    if (isWorkbench) {
      userOptions.workbenchView = view as WorkbenchViews;
      setUserOptions((prevValues) => ({
        ...prevValues,
        ['workbenchView']: view as WorkbenchViews,
      }));
      saveToStorage("userOptions", {
        ...userOptions,
        ['workbenchView']: view as WorkbenchViews,
      });
      setSelectedWorkbenchView(view as WorkbenchViews);
    } else {
      userOptions.scriptingView = view as ScriptingViews;
      setUserOptions((prevValues) => ({
        ...prevValues,
        ['scriptingView']: view as ScriptingViews,
      }));
      saveToStorage("userOptions", {
        ...userOptions,
        ['workbenchView']: view as ScriptingViews,
      });
      setSelectedScriptingView(view as ScriptingViews);
    }
  }, [setUserOptions, userOptions]);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && editorRef.current && toolbarRef.current) {
      editorRef.current.style.cssText = originalEditorStyle.current;
      toolbarRef.current.style.cssText = originalToolbarStyle.current;
      document.removeEventListener('keydown', handleEscape);
    }
  }, []);

  const handleDefaultEditor = useCallback(() => {
    if (editorRef.current
      && traceRef.current
      && traceTitleRef.current
      && editorInfoRef.current
      && toolbarRef.current
      && traceBodyRef.current) {
      // Remove the wrapper if it exists
      const wrapper = document.getElementById('editor-trace-wrapper');
      if (wrapper) {
        traceContainerRef.current?.appendChild(traceRef.current);
        wrapper.parentElement?.insertBefore(editorRef.current, editorInfoRef.current);
        wrapper.parentElement?.removeChild(wrapper);
      }

      const parentContainer = editorRef.current?.parentElement;
      if (parentContainer) {
        // Reset the flexbox styles of the parent container
        parentContainer.style.display = '';
        parentContainer.style.flexDirection = '';
        parentContainer.style.width = '';
      }

      // editorRef.current.style.cssText = originalEditorStyle.current;
      editorRef.current.classList.remove('col-sm-6', 'col-md-6', 'leftscript');
      editorRef.current.classList.add('col-md-12', 'col-sm-12');
      editorRef.current.style.height = '';
      editorRef.current.style.display = '';
      editorRef.current.style.float = '';
      editorRef.current.style.width = '';

      editorInfoRef.current.classList.remove('text-left');
      editorInfoRef.current.classList.add('text-right');
      editorInfoRef.current.style.width = '';

      traceRef.current.classList.remove('col-sm-6', 'col-md-6');
      traceRef.current.classList.add('col-md-12', 'col-sm-12');
      traceRef.current.style.display = '';
      traceRef.current.style.height = '';
      traceRef.current.style.maxHeight = '';
      traceRef.current.style.float = '';
      traceRef.current.style.width = '';

      traceTitleRef.current.style.display = '';

      // toolbarRef.current.style.cssText = originalToolbarStyle.current;
      traceTitleRef.current.style.display = 'e';

      traceBodyRef.current.textContent = '';

      traceTitleRef.current.style.cssText = '';

      // Optionally remove the clear traces button if necessary
      // const clearTrace = document.getElementById("traceControl");
      // if (clearTrace) {
      //   clearTrace.parentElement?.removeChild(clearTrace);
      // }

    }
  }, []);

  const handleFullScreenEditor = useCallback(() => {
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

  const handleExpandEditor = useCallback(() => {
    if (editorRef.current && toolbarRef.current) {
      editorRef.current.classList.add('col-sm-6', 'col-md-6', 'leftscript');
      document.addEventListener('keydown', handleEscape);
    } else {
      console.error('CodeMirror editor or toolbar element not found');
    }

    if (scrollRef.current) {
      // Remove the max height
      scrollRef.current.style.maxHeight = 'none';
    } else {
      console.error('CodeMirror scroll element not found');
    }
  }, [handleEscape]);

  const handleSideBySideEditor = useCallback(() => {
    if (editorRef.current && traceRef.current && traceTitleRef.current && traceBodyRef.current && editorInfoRef.current) {

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
        traceRef.current.parentElement.parentElement.style.display = '';
      }

      // Just for funzies we add something to the trace container by default
      // traceBodyRef.current.textContent = 'oh hi there';

      traceTitleRef.current.style.display = 'none';
      console.log('traceTitleRef:', traceTitleRef.current);
    } else {
      console.error('Trace window or title not found');
    }
  }, []);

  const handleNarrowTraceEditor = useCallback(() => {
    if (editorRef.current && traceRef.current && traceTitleRef.current && traceBodyRef.current && editorInfoRef.current) {
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

      editorRef.current.classList.remove('col-sm-6', 'col-md-6', 'largeLeft', 'col-md-12', 'col-sm-12');
      editorRef.current.classList.add('col-sm-8', 'col-md-8');
      // editorRef.current.style.display = 'inline-flex'; //  breaks scroll placement in shifted view
      editorRef.current.style.height = 'calc(100vh - 225px)';
      // editorRef.current.style.maxHeight = '500px';
      editorRef.current.style.display = 'block';
      editorRef.current.style.float = 'left';
      editorRef.current.style.width = '65%';
      console.log('editorRef:', editorRef.current);

      editorInfoRef.current.classList.remove('text-right');
      editorInfoRef.current.classList.add('text-left');
      // editorInfoRef.current.style.display = 'inline-flex'; //  breaks scroll placement in shifted view
      // editorInfoRef.current.style.height = 'inherit';
      // editorInfoRef.current.style.maxHeight = '20000px';
      // editorInfoRef.current.style.float = 'left';
      editorInfoRef.current.style.width = '35%';
      console.log('editorRef:', editorRef.current);

      traceRef.current.classList.remove('col-sm-6', 'col-md-6', 'smallright', 'col-md-12', 'col-sm-12');
      traceRef.current.classList.add('col-md-4', 'col-sm-4');
      traceRef.current.style.display = 'block';
      traceRef.current.style.height = 'calc(100vh - 225px)';
      traceRef.current.style.maxHeight = 'calc(100vh - 225px)';
      traceRef.current.style.float = 'right';
      traceRef.current.style.width = '50%';
      console.log('traceRef:', traceRef.current);

      // Normally the trace element doesn't appear until there is something to display
      // Get the parent of the traceRef element and make it display by default
      if (traceRef.current.parentElement?.parentElement) {
        traceRef.current.parentElement.parentElement.style.display = '';
      }

      // Just for funzies we add something to the trace container by default
      // traceBodyRef.current.textContent = 'oh hi there';

      // traceTitleRef.current.style.display = 'none';
      console.log('traceTitleRef:', traceTitleRef.current);
    } else {
      console.error('Trace window or title not found');
    }
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    console.log('Clear traces button clicked')
    event.preventDefault();
    const clearLink = document.querySelector('.tracetitle a') as HTMLAnchorElement;
    console.log('clearLink:', clearLink)
    if (clearLink) {
      clearLink.click();
      console.log('Clear traces button clicked')
    }
  };

  const handleFullScreenAlertClose = (doNotShowAgain: boolean) => {
    setIsFullScreenAlertOpen(false);
    if (doNotShowAgain) {
      setShowFullScreenAlert(false);
    }
  };

  useEffect(() => {
    // console.log('selectedWorkbenchView changed to', selectedWorkbenchView);
    if (editorRef.current && traceRef.current) {
      // Clear all classes
      editorRef.current.classList.remove('col-sm-6', 'col-md-6', 'leftscript', 'col-sm-8', 'col-md-8', 'largeleft');
      traceRef.current.classList.remove('righttrace', 'col-sm-6', 'col-md-6', 'col-md-4', 'col-sm-4', 'smallright', 'col-md-12', 'col-sm-12');
      console.log('REmoved classes')
    }

    switch (selectedWorkbenchView) {
      case 'Default':
        handleDefaultEditor();
        break;
      case 'Side By Side':
        handleSideBySideEditor();
        break;
      case 'Narrow Trace':
        handleNarrowTraceEditor();
        break;
    }
    // console.log('selectedWorkbenchView finished')
  }, [
    selectedWorkbenchView,
    handleDefaultEditor,
    handleSideBySideEditor,
    handleNarrowTraceEditor,
  ]);

  useEffect(() => {
    // console.log('selectedScriptingView changed to', selectedScriptingView);
    if (editorRef.current && traceRef.current) {
      // Clear all classes
      editorRef.current.classList.remove('col-sm-6', 'col-md-6', 'leftscript', 'col-sm-8', 'col-md-8', 'largeleft');
      traceRef.current.classList.remove('righttrace', 'col-sm-6', 'col-md-6', 'col-md-4', 'col-sm-4', 'smallright', 'col-md-12', 'col-sm-12');
      console.log('Removed classes')
    }

    switch (selectedScriptingView) {
      case 'Default':
        handleDefaultEditor();
        break;
      case 'Expanded':
        handleExpandEditor();
        break;
      case 'Fullscreen':
        handleFullScreenEditor();
        break;
    }
  }, [
    selectedScriptingView,
    handleDefaultEditor,
    handleExpandEditor,
    handleFullScreenEditor,
  ]);

  // Determine which view options should be displayed
  // The side-by-side and narrow trace views are only available when the trace window is visible
  const workbenchView = traceRef.current !== null;

  // Create the menu-options element that will be used in the return
  const menuOptions = [
    <MenuItem key="default" value="Default">Default</MenuItem>,
    workbenchView && <MenuItem key="sideBySide" value="Side By Side">Side By Side</MenuItem>,
    workbenchView && <MenuItem key="narrowTrace" value="Narrow Trace">Narrow Trace</MenuItem>,
    !workbenchView && <MenuItem key="expanded" value="Expanded">Expanded</MenuItem>,
    !workbenchView && <MenuItem key="fullScreen" value="Full Screen">Full Screen</MenuItem>,
  ].filter(Boolean); // Filter out any false/null values

  const selectedView = workbenchView ? selectedWorkbenchView : selectedScriptingView;

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', background: 'white' }}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="viewPickSlctLabel">Select View</InputLabel>
            <Select
              labelId="viewPickSlctLabel"
              id="viewPickSlct"
              value={selectedView}
              onChange={handleViewChange}
              label="Select View"
              sx={{
                height: '40px', // Adjust the height of the Select component
              }}
              MenuProps={{
                MenuListProps: {
                  sx: {
                    padding: '0px',
                  },
                },
              }}
            >
              {menuOptions}
            </Select>
          </FormControl>
        </Grid>
        {isWorkbench && (
          <Button
            onClick={handleClick}
            tabIndex={0}
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '5px 10px',
              borderRadius: '5px',
              backgroundColor: '#f0f0f0'
            }}
          >
            Clear Traces
          </Button>
        )}
        <Grid item>
          <Tooltip title="Fold All Code">
            <IconButton size="small" onClick={() => document.getElementById('foldCode')?.click()} style={{ width: '40px', height: '40px' }}>
              <KeyboardArrowUp fontSize="small" style={{ color: 'blue' }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="UnFold All Code">
            <IconButton size="small" onClick={() => document.getElementById('unfoldCode')?.click()} style={{ width: '40px', height: '40px' }}>
              <KeyboardArrowDown fontSize="small" style={{ color: 'blue' }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <FullScreenAlert open={isFullScreenAlertOpen} onClose={handleFullScreenAlertClose} />
    </div>
  );
}
