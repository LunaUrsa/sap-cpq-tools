/* eslint-disable import/namespace */
import '../Popup.css';
import { Restore, SettingsBackupRestore } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material';
import { FormControl, MenuItem, Select, Switch, Typography, Card, Box, Divider, Grid, TextField, Tooltip, Button } from '@mui/material';
import { userOptionsConfig, codeMirrorOptionsConfig, sapDefaultPreferences, defaultCodePreferences, defaultShortcuts, defaultMods } from '@chrome-extension-boilerplate/shared/lib/constants';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';
import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';

const OptionsPage: React.FC = () => {
  const { userOptions, setUserOptions, codeMirrorOptions, setCodeMirrorOptions, setMods, setShortcuts } = useAppContext();

  async function revertToSapDefaults() {
    setCodeMirrorOptions(sapDefaultPreferences);
    saveToStorage("codeMirrorOptions", sapDefaultPreferences);
    console.log('Reverted to SAP defaults')
  }

  async function revertToCustomDefaults() {
    setCodeMirrorOptions(defaultCodePreferences);
    saveToStorage("codeMirrorOptions", defaultCodePreferences);
    console.log('Reverted to custom defaults')
  }

  async function revertShortcuts() {
    setShortcuts(defaultShortcuts);
    saveToStorage("shortcuts", defaultShortcuts);
    console.log('Reverted shortcuts to ', defaultShortcuts)
  }

  async function revertMods() {
    setMods(defaultMods);
    saveToStorage("mods", defaultMods);
    console.log('Reverted mods')
  }

  const handleUserInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
    option: Option,
  ) => {
    const value = type === "switch" ? (e.target as HTMLInputElement).checked : e.target.value;
    setUserOptions((prevValues) => ({
      ...prevValues,
      [option.key]: value
    }));
    saveToStorage("userOptions", {
      ...userOptions,
      [option.key]: value
    });

    if (option.key === "openInSidePanel") {
      chrome.sidePanel
        .setPanelBehavior({ openPanelOnActionClick: value as boolean })
        .catch((error) => console.error(error));
    }
  };

  const handleUserSelectChange = (
    e: SelectChangeEvent<unknown>,
    option: Option,
  ) => {
    const value = e.target.value;
    setUserOptions((prevValues) => ({
      ...prevValues,
      [option.key]: value
    }));
    saveToStorage("userOptions", {
      ...userOptions,
      [option.key]: value
    });
  };

  const handleCodeInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
    option: Option,
  ) => {
    const value = type === "switch" ? (e.target as HTMLInputElement).checked : e.target.value;
    setCodeMirrorOptions((prevValues) => ({
      ...prevValues,
      [option.key]: value
    }));
    saveToStorage("codeMirrorOptions", {
      ...codeMirrorOptions,
      [option.key]: value
    });
  };

  const handleCodeSelectChange = (
    e: SelectChangeEvent<unknown>,
    option: Option,
  ) => {
    const value = e.target.value;
    setCodeMirrorOptions((prevValues) => ({
      ...prevValues,
      [option.key]: value
    }));
    saveToStorage("codeMirrorOptions", {
      ...codeMirrorOptions,
      [option.key]: value
    });
  };


  const generateUserFormControl = (
    option: Option,
    values: UserOptions,
  ) => {
    const commonProps = {
      key: option.key,
      xs: 12,
      md: 6,
    };

    return (
      <Grid item {...commonProps}>
        <FormControl component="fieldset" className="mb-4" fullWidth>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <Tooltip title={option.tooltip}>
                <Typography>{option.label}</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              {option.type === "switch" && (
                <Switch
                  checked={values[option.key as keyof UserOptions] as boolean}
                  onChange={(e) => handleUserInputChange(e, 'switch', option)}
                  name={option.key as string}
                  color="primary"
                />
              )}
              {option.type === "select" && (
                <Select
                  value={values[option.key as keyof UserOptions] || ""}
                  onChange={(e) => handleUserSelectChange(e, option)}
                  sx={{
                    fontSize: "0.875rem",
                    maxHeight: "40px",
                    "& .MuiSelect-select": {
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    },
                  }}
                  fullWidth
                >
                  {option.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              )}
              {option.type === "number" && (
                <TextField
                  type="number"
                  value={values[option.key as keyof UserOptions] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInputChange(e, 'number', option)}
                  InputProps={{ inputProps: { maxLength: 2, style: { width: '70px', height: '30px' } } }}
                  fullWidth={false}
                />
              )}
              {option.type === "string" && (
                <TextField
                  type="text"
                  value={values[option.key as keyof UserOptions] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUserInputChange(e, 'string', option)}
                  InputProps={{ style: { width: '70px', height: '30px' } }}
                  fullWidth={false}
                />
              )}
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    );
  };

  const generateCodeMirrorFormControl = (
    option: Option,
    values: CodeMirrorOptions,
  ) => {
    const commonProps = {
      key: option.key,
      xs: 12,
      md: 6,
    };
    return (
      <Grid item {...commonProps}>
        <FormControl component="fieldset" className="mb-4" fullWidth>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <Tooltip title={option.tooltip}>
                <Typography>{option.label}</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={4}>
              {option.type === "switch" && (
                <Switch
                  checked={values[option.key as keyof CodeMirrorOptions] as boolean}
                  onChange={(e) => handleCodeInputChange(e, 'switch', option)}
                  name={option.key as string}
                  color="primary"
                />
              )}
              {option.type === "select" && (
                <Select
                  value={values[option.key as keyof CodeMirrorOptions] || ""}
                  onChange={(e) => handleCodeSelectChange(e, option)}
                  sx={{
                    fontSize: "0.875rem",
                    maxHeight: "40px",
                    "& .MuiSelect-select": {
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    },
                  }}
                  fullWidth
                >
                  {option.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              )}
              {option.type === "number" && (
                <TextField
                  type="number"
                  value={values[option.key as keyof CodeMirrorOptions] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCodeInputChange(e, 'number', option)}
                  InputProps={{ inputProps: { maxLength: 2, style: { width: '70px', height: '30px' } } }}
                  fullWidth={false}
                />
              )}
              {option.type === "string" && (
                <TextField
                  type="text"
                  value={values[option.key as keyof CodeMirrorOptions] || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCodeInputChange(e, 'string', option)}
                  InputProps={{ style: { width: '70px', height: '30px' } }}
                  fullWidth={false}
                />
              )}
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Box className="space-y-6">
        <Card className="p-4">
          <Typography variant="h4" gutterBottom>
            Extension Options
          </Typography>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            {userOptionsConfig.map((option) =>
              generateUserFormControl(option, userOptions)
            )}
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Reset Shortcuts">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Restore />}
                  onClick={revertShortcuts}
                  fullWidth
                >
                  Revert Shortcuts
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Revert Mods">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SettingsBackupRestore />}
                  onClick={revertMods}
                  fullWidth
                >
                  Revert Mods
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Card>
        <Card className="p-4">
          <Typography variant="h4" gutterBottom>
            Code Editor Options
          </Typography>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Revert to SAP Defaults">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Restore />}
                  onClick={revertToSapDefaults}
                  fullWidth
                >
                  Revert to SAP Defaults
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Revert to Custom Defaults">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<SettingsBackupRestore />}
                  onClick={revertToCustomDefaults}
                  fullWidth
                >
                  Revert to Custom Defaults
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            {codeMirrorOptionsConfig.map((option) =>
              generateCodeMirrorFormControl(option, codeMirrorOptions)
            )}
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default OptionsPage;
