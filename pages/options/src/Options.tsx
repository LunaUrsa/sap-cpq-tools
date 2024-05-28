import '@src/Options.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import OptionsView from '../../popup/src/views/OptionsView';

const theme = createTheme({
  // Customize your theme here
});

const OptionsPage: React.FC = () => {
  console.debug('Options page loaded');
  return (
    <ThemeProvider theme={theme}>
      <div className=".App">
        {/* <EnhancedToolbar /> */}
        {/* <Routing /> */}
        <OptionsView />
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(OptionsPage, <div>Loading...</div>), <div>Error Occur</div>);
