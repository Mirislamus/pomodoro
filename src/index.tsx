import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/typography/fonts.css';
import './localization/i18n';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from './app/App';
import theme from './theme/theme';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter basename="pomodoro">
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
