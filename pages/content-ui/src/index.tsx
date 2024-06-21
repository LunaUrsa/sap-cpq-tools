import { createRoot } from 'react-dom/client';
import App from '@src/app';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';
import { AppProvider } from '@chrome-extension-boilerplate/shared/lib/context/AppContext';

const root = document.createElement('div');
root.id = 'sap-cpq-tools';

const toolbarElement = document.getElementsByClassName('dev-admin-page')[0];
toolbarElement?.prepend(root);

const sapPage = document.getElementById('scriptDebuggerContainer');
if (sapPage) {
  sapPage.style.display = 'None';
}

const styleElement = document.createElement('style');
styleElement.innerHTML = tailwindcssOutput;
document.head.appendChild(styleElement);

createRoot(root).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
