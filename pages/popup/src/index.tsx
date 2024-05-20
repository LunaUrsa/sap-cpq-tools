import { createRoot } from 'react-dom/client';
import '@src/index.css';
import {
  // MemoryRouter, 
  HashRouter,
} from "react-router-dom"
import Popup from '@src/Popup';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(
    <HashRouter>
      <Popup />
    </HashRouter>
  );
}

init();
