import { useEffect } from 'react';
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import { Box, Grid } from '@mui/material';
import '@mui/material/styles';
import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';
import Toolbar from './components/ScriptToolbar';
import { useTraceManagement } from './hooks/useTraceManagement';
import { CodeMirrorMain } from './util/codeMirror';

const App = () => {
  const { userOptions, setUserOptions } = useAppContext();

  useEffect(() => {
    console.log('content ui loaded');
    chrome.storage.local.get('userOptions', result => {
      if (result.userOptions) {
        const storedUserOptions = JSON.parse(result.userOptions);
        setUserOptions(storedUserOptions);
      }
    });
  }, [setUserOptions]);

  const mainViewRef = CodeMirrorMain(userOptions);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const traceRef = useTraceManagement(mainViewRef, userOptions);

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        padding: '5px',
        borderRadius: '8px',
        margin: '5px',
        backgroundColor: '#f9f9f9',
        height: 'calc(100vh - 15px)',
        boxSizing: 'border-box',
      }}>
      <Toolbar editorViewRef={mainViewRef} />
      {/* Editor */}
      <Grid
        container
        direction="row"
        sx={{ width: '100%', height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'row' }}
        alignItems="stretch">
        <Grid item id="custom-editor" sx={{ width: '50%', height: '100%' }}>
          <textarea id="newCM" style={{ display: 'none' }}></textarea>
        </Grid>
        <Grid item id="custom-editor2" sx={{ width: '50%', height: '100%' }}>
          <textarea id="newCM2" style={{ display: 'none' }}></textarea>
        </Grid>
        <Grid item id="custom-trace" sx={{ height: '100%' }}></Grid>
      </Grid>
    </Box>
  );
};

export default withErrorBoundary(withSuspense(App, <div> Loading ... </div>), <div> Error Occur </div>);
