import { createRoot } from 'react-dom/client';
import App from '@src/app';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';
import { AppProvider } from '@chrome-extension-boilerplate/shared/lib/context/AppContext';

const root = document.createElement('div');
root.id = 'sap-cpq-tools';

// document.body.append(root);
const editorElement = document.getElementsByClassName('CodeMirror')[0];
editorElement?.parentElement?.prepend(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = tailwindcssOutput;
shadowRoot.appendChild(styleElement);

createRoot(rootIntoShadow).render(
  <AppProvider>
    <App />
  </AppProvider >
);
