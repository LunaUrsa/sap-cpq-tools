/* eslint-disable import/namespace */
import '@src/Options.css';
import {
  withErrorBoundary,
  withSuspense,
} from '@chrome-extension-boilerplate/shared';
import {
  useState,
  useEffect,
} from "react";
import { FormControl, MenuItem, Select, Switch, Typography, FormControlLabel, Card, Box, Divider, Grid } from '@mui/material';

import * as themes from "@uiw/codemirror-themes-all";

interface CodeMirrorOptions {
  autocapitalize: boolean;
  autocorrect: boolean;
  autofocus: boolean;
  foldGutter: boolean;
  highlightActiveLine: boolean;
  linting: boolean;
  matchTags: boolean;
  resize: boolean;
  scrollbarStyle: "native" | "null" | "overlay";
  shortcuts: Record<string, string>;
  spellcheck: boolean;
  styleActiveLine: boolean;
  tabMode: "shift" | "spaces";
  theme: string;
}

interface UserOptions {
  isDarkMode: boolean;
  language: 'en' | 'es' | 'fr';
}

const OptionsPage = () => {
  const [codeMirrorOptions, setCodeMirrorOptions] = useState<CodeMirrorOptions>({} as CodeMirrorOptions);

  const [userOptions, setUserOptions] = useState<UserOptions>({} as UserOptions);

  useEffect(() => {
    chrome.storage.local.get(["userOptions", "codeMirrorOptions"], (result) => {
      if (result.userOptions) {
        setUserOptions(JSON.parse(result.userOptions));
      }
      if (result.codeMirrorOptions) {
        setCodeMirrorOptions(JSON.parse(result.codeMirrorOptions));
      }
    });
  }, []);

  useEffect(() => {
    if (userOptions) {
      chrome.storage.local.set({ userOptions: JSON.stringify(userOptions) });
    }
  }, [userOptions]);

  useEffect(() => {
    if (codeMirrorOptions) {
      chrome.storage.local.set({ codeMirrorOptions: JSON.stringify(codeMirrorOptions) });
    }
  }, [codeMirrorOptions]);

  const themeOptions = ["dark", "light"]
    .concat(Object.keys(themes))
    .filter((item) => typeof themes[item as keyof typeof themes] !== "function")
    .filter((item) => !/^(defaultSettings)/.test(item as keyof typeof themes));

  type Option = {
    label: string;
    key: keyof CodeMirrorOptions | keyof UserOptions;
    type: "switch" | "select";
    options?: string[];
  };

  const userOptionsConfig = [
    { label: "Dark Mode", key: "isDarkMode", type: "switch" },
    { label: "Language", key: "language", type: "select", options: ["en", "es", "fr"] },
  ] as Option[];

  const codeMirrorOptionsConfig = [
    { label: "Theme", key: "theme", type: "select", options: themeOptions },
    { label: "Tab Mode", key: "tabMode", type: "select", options: ["shift", "spaces"] },
    { label: "Scrollbar Style", key: "scrollbarStyle", type: "select", options: ["native", "null", "overlay"] },
    { label: "Autocapitalize", key: "autocapitalize", type: "switch" },
    { label: "Autocorrect", key: "autocorrect", type: "switch" },
    { label: "Autofocus", key: "autofocus", type: "switch" },
    { label: "Fold Gutter", key: "foldGutter", type: "switch" },
    { label: "Highlight Active Line", key: "highlightActiveLine", type: "switch" },
    { label: "Linting", key: "linting", type: "switch" },
    { label: "Match Tags", key: "matchTags", type: "switch" },
    { label: "Resize", key: "resize", type: "switch" },
    { label: "Spellcheck", key: "spellcheck", type: "switch" },
    { label: "Style Active Line", key: "styleActiveLine", type: "switch" },
  ] as Option[];

  const generateUserFormControl = (
    option: Option,
    values: UserOptions,
    setValues: React.Dispatch<React.SetStateAction<UserOptions>>
  ) => {
    if (option.type === "switch") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4">
            <FormControlLabel
              control={
                <Switch
                  checked={values[option.key as keyof UserOptions] as boolean}
                  onChange={(e) => setValues((prevValues) => ({
                    ...prevValues,
                    [option.key]: e.target.checked
                  }))}
                  name={option.key as string}
                  color="primary"
                />
              }
              label={option.label}
            />
          </FormControl>
        </Grid>
      );
    }

    if (option.type === "select") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4" fullWidth>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography>{option.label}</Typography>
              </Grid>
              <Grid item>
                <Select
                  value={values[option.key as keyof UserOptions] || ""}
                  onChange={(e) => setValues((prevValues) => ({
                    ...prevValues,
                    [option.key]: e.target.value
                  }))}
                  sx={{
                    fontSize: "0.875rem",
                    maxHeight: "40px",
                    "& .MuiSelect-select": {
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    },
                  }}
                >
                  {option.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      );
    }

    return null;
  };

  const generateCodeMirrorFormControl = (
    option: Option,
    values: CodeMirrorOptions,
    setValues: React.Dispatch<React.SetStateAction<CodeMirrorOptions>>
  ) => {
    if (option.type === "switch") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4">
            <FormControlLabel
              control={
                <Switch
                  checked={values[option.key as keyof CodeMirrorOptions] as boolean}
                  onChange={(e) => setValues((prevValues) => ({
                    ...prevValues,
                    [option.key]: e.target.checked
                  }))}
                  name={option.key as string}
                  color="primary"
                />
              }
              label={option.label}
            />
          </FormControl>
        </Grid>
      );
    }

    if (option.type === "select") {
      return (
        <Grid item xs={12} key={option.key}>
          <FormControl component="fieldset" className="mb-4" fullWidth>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Typography>{option.label}</Typography>
              </Grid>
              <Grid item>
                <Select
                  value={values[option.key as keyof CodeMirrorOptions] || ""}
                  onChange={(e) => setValues((prevValues) => ({
                    ...prevValues,
                    [option.key]: e.target.value
                  }))}
                  sx={{
                    fontSize: "0.875rem",
                    maxHeight: "40px",
                    "& .MuiSelect-select": {
                      paddingTop: "6px",
                      paddingBottom: "6px",
                    },
                  }}
                >
                  {option.options?.map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      );
    }

    return null;
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
              generateUserFormControl(option, userOptions, setUserOptions)
            )}
          </Grid>
        </Card>
        <Card className="p-4">
          <Typography variant="h4" gutterBottom>
            Code Editor Options
          </Typography>
          <Divider className="mb-4" />
          <Grid container spacing={2}>
            {codeMirrorOptionsConfig.map((option) =>
              generateCodeMirrorFormControl(option, codeMirrorOptions, setCodeMirrorOptions)
            )}
          </Grid>
        </Card>
      </Box>
    </div>
  );
};

export default withErrorBoundary(withSuspense(OptionsPage, <div>Loading...</div>), <div>Error Occur</div>);
