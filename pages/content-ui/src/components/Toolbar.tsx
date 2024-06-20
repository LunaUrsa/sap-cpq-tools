import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  PlayArrow, Clear, Code, Functions, Api, Search
} from '@mui/icons-material';
import '@mui/material/styles';
import { handleRunClick, handleModeChange, handlePythonClick, handleAliasClick, handleApiClick, handleApiExplorerClick, handleTraceClearClick } from '../util/scriptWorkbench';
import { useEffect, useRef, useState } from 'react';
import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';
import { handleFoldClick } from '../util/codeMirror';
import { EditorView, } from '@codemirror/view';

interface ToolbarProps {
  editorViewRef: React.MutableRefObject<EditorView | null>;
}

const Toolbar: React.FC<ToolbarProps> = ({ editorViewRef }) => {
  const { userOptions, setUserOptions } = useAppContext();
  const scriptToolbarRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    console.log('content ui loaded');
    scriptToolbarRef.current = document.querySelector('.script-toolbar') as HTMLElement;
  }, []);


  const [isFolded, setIsFolded] = useState(false);

  const [scriptingMode, setScriptingMode] = useState(userOptions.scriptingMode || 'Default');

  return (
    <Grid container direction="row" spacing={2} alignItems="center" sx={{ paddingBottom: '10px' }}>
      <Grid item>
        <Button
          onClick={(e) => handleRunClick(e, scriptToolbarRef)}
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
            onChange={(e) => handleModeChange(e, scriptToolbarRef, setScriptingMode)}
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
          onClick={() => handleFoldClick(setIsFolded, editorViewRef)}
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
          startIcon={isFolded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        >
          <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>{isFolded ? 'Unfold Code' : 'Fold Code'}</Typography>
        </Button>
      </Grid>
      {/* <Grid item>
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
            startIcon={<Fullscreen />}
          >
            <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Fullscreen</Typography>
          </Button>
        </Grid> */}
      {/* <Grid item>
          <Button
            onClick={handleSplitEditorClick}
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
            startIcon={<Fullscreen />}
          >
            <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Split Editor</Typography>
          </Button>
        </Grid> */}
      <Grid item sx={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
        {/* <Button
            onClick={handleCustomClick}
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
            <Typography sx={{ textTransform: 'none', fontSize: 'inherit' }}>Custom</Typography>
          </Button> */}
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

    </Grid>
  );
};

export default Toolbar;