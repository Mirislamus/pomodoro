import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/typography/fonts.css';
import './localization/i18n';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './components/ui/provider';
import { Toaster } from './components/ui/toaster';

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <StrictMode>
    <Provider storageKey="chakra-ui-color-mode" defaultTheme="system" enableSystem>
      <BrowserRouter basename="pomodoro">
        <App />
      </BrowserRouter>
      <Toaster />
    </Provider>
  </StrictMode>
);
