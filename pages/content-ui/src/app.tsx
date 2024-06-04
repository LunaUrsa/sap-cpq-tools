import { useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import {
  ZoomOutMap,
  ZoomInMap,
  Fullscreen,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from '@mui/icons-material';
// import FullScreenAlert from './FullScreenAlert';

export default function App() {
  // const [showFullScreenAlert, setShowFullScreenAlert] = useState(true);
  // const [isFullScreenAlertOpen, setIsFullScreenAlertOpen] = useState(false);
  const editorElement = document.getElementsByClassName('CodeMirror')[0] as HTMLElement;
  const toolbarElement = document.getElementById('sap-cpq-tools') as HTMLElement;
  const scrollElement = document.getElementsByClassName('CodeMirror-scroll')[0] as HTMLElement;

  // Save original styles
  const originalEditorStyle = editorElement.style.cssText;
  const originalToolbarStyle = toolbarElement.style.cssText;

  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  const handleExpandEditor = () => {
    makeEditorExpanded()
  };

  const handleFullScreenEditor = () => {
    makeEditorFullScreen();
    // if (showFullScreenAlert) {
    //   setIsFullScreenAlertOpen(true);
    // }
  };

  const handleDefaultEditor = () => {
    editorElement.style.cssText = originalEditorStyle;
    toolbarElement.style.cssText = originalToolbarStyle;
  };

  const foldCode = () => document.getElementById('foldCode')?.click();

  const unfoldCode = () => document.getElementById('unfoldCode')?.click();

  let handleEscapeEvent: (event: KeyboardEvent) => void;

  function exitFullScreen(editorElement: HTMLElement, toolbarElement: HTMLElement, originalEditorStyle: string, originalToolbarStyle: string) {
    editorElement.style.cssText = originalEditorStyle;
    toolbarElement.style.cssText = originalToolbarStyle;
    document.removeEventListener('keydown', handleEscapeEvent);
  }

  function handleEscape(event: KeyboardEvent, editorElement: HTMLElement, toolbarElement: HTMLElement, originalEditorStyle: string, originalToolbarStyle: string) {
    if (event.key === 'Escape') {
      exitFullScreen(editorElement, toolbarElement, originalEditorStyle, originalToolbarStyle);
    }
  }

  const makeEditorFullScreen = () => {
    // document.getElementById('fullScreenEditor')?.click()

    if (editorElement && toolbarElement) {

      // Apply fullscreen styles
      editorElement.style.position = 'fixed';
      editorElement.style.top = '40px'; // Ensure toolbar is visible above
      editorElement.style.left = '0';
      editorElement.style.width = '100vw';
      editorElement.style.height = 'calc(100vh - 40px)'; // Adjust height for toolbar
      editorElement.style.zIndex = '1000'; // Ensure it's on top
      editorElement.style.overflow = 'auto'; // Ensure scrolling if content overflows

      toolbarElement.style.position = 'fixed';
      toolbarElement.style.top = '0';
      toolbarElement.style.left = '0';
      toolbarElement.style.width = '100vw';
      toolbarElement.style.zIndex = '1001'; // Ensure it's above the editor
      toolbarElement.style.display = 'flex'; // Ensure it is displayed

      handleEscapeEvent = (event: KeyboardEvent) => handleEscape(event, editorElement, toolbarElement, originalEditorStyle, originalToolbarStyle);

      // Add event listener to exit fullscreen on 'Escape' key press
      document.addEventListener('keydown', handleEscapeEvent);
    } else {
      console.error('CodeMirror editor or toolbar element not found');
    }

    if (scrollElement) {
      // Remove the max height
      scrollElement.style.maxHeight = 'none';
    } else {
      console.error('CodeMirror scroll element not found');
    }
  };

  const makeEditorExpanded = () => {
    const editorElement = document.getElementsByClassName('CodeMirror')[0] as HTMLElement;
    const toolbarElement = document.getElementById('toolbar') as HTMLElement;
    const scrollElement = document.getElementsByClassName('CodeMirror-scroll')[0] as HTMLElement;

    if (editorElement && toolbarElement) {
      // Save original styles
      const originalEditorStyle = editorElement.style.cssText;
      const originalToolbarStyle = toolbarElement.style.cssText;

      handleEscapeEvent = (event: KeyboardEvent) => handleEscape(event, editorElement, toolbarElement, originalEditorStyle, originalToolbarStyle);

      // Add event listener to exit fullscreen on 'Escape' key press
      document.addEventListener('keydown', handleEscapeEvent);
    } else {
      console.error('CodeMirror editor or toolbar element not found');
    }

    if (scrollElement) {
      // Remove the max height
      scrollElement.style.maxHeight = 'none';
    } else {
      console.error('CodeMirror scroll element not found');
    }
  };

  // const handleFullScreenAlertClose = (dontShowAgain: boolean) => {
  //   setIsFullScreenAlertOpen(false);
  //   if (dontShowAgain) {
  //     setShowFullScreenAlert(false);
  //   }
  // };

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', background: 'white' }}>
      {/* <Grid container spacing={2}>
        <Grid item xs={2}> */}
      <Tooltip title="Expand Editor">
        <IconButton id='expandEditorMUI' size="small" onClick={handleExpandEditor} style={{ width: '40px', height: '40px' }}>
          <ZoomOutMap fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
      {/* </Grid>
        <Grid item xs={2}> */}
      <Tooltip title="Full Screen Editor">
        <IconButton id='fullScreenEditorMUI' size="small" onClick={handleFullScreenEditor} style={{ width: '40px', height: '40px' }}>
          <Fullscreen fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
      {/* </Grid>
        <Grid item xs={2}> */}
      <Tooltip title="Default Editor">
        <IconButton id='defaultEditorMUI' size="small" onClick={handleDefaultEditor} style={{ width: '40px', height: '40px' }}>
          <ZoomInMap fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
      {/* </Grid>
        <Grid item xs={2}> */}
      <Tooltip title="Fold All Code">
        <IconButton id='foldCodeMUI' size="small" onClick={foldCode} style={{ width: '40px', height: '40px' }}>
          <KeyboardArrowUp fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
      {/* </Grid>
        <Grid item xs={2}> */}
      <Tooltip title="UnFold All Code">
        <IconButton id='unfoldCodeMUI' size="small" onClick={unfoldCode} style={{ width: '40px', height: '40px' }}>
          <KeyboardArrowDown fontSize="small" style={{ color: 'blue' }} />
        </IconButton>
      </Tooltip>
      {/* </Grid>
      </Grid> */}
      {/* <FullScreenAlert open={isFullScreenAlertOpen} onClose={handleFullScreenAlertClose} /> */}
    </div >
  );
}
