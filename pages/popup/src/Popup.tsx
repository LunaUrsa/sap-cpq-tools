import '@src/Popup.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EnhancedToolbar from './components/Toolbar';
import { Routing } from './routes';
import { withErrorBoundary, withSuspense } from '@chrome-extension-boilerplate/shared';
import useAppContext from '@chrome-extension-boilerplate/shared/lib/hooks/useAppContext';

const theme = createTheme({
  // Customize your theme here
});

const Popup = () => {
  const { currentPage } = useAppContext();

  const navigate = useNavigate();

  console.debug('popup page loaded');

  useEffect(() => {
    if (currentPage) {
      navigate(currentPage);
    }
  }, [currentPage, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <div className=".App">
        <EnhancedToolbar />
        <Routing />
      </div>
    </ThemeProvider>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
