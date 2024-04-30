import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';
// import HomePage from './components/HomePage';
import SettingsPage from './components/SettingsPage';
import ShortcutsPage from './components/ShortcutsPage';
import { AppBar } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import EnhancedToolbar from './components/Toolbar';

function App() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id ?? 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setHeadlines(response.headlines);
        });
    });
  });
  return (
    <div className="App">
      <AppBar position="static">
        <EnhancedToolbar />
      </AppBar>
      <Routes>
        <Route path="/" element={<ShortcutsPage />} />
         {/* This is needed to display the home page when the extension is opened */}
        <Route path="/#" element={<ShortcutsPage />} />
        <Route path="/customize" element={<ShortcutsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;