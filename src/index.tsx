import React from 'react';
import { createRoot } from 'react-dom/client';
import './theme/typography/fonts.css';
import './localization/i18n';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Main from './pages/Main';
import theme from './theme/theme';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';
import { SessionProvider } from './contexts/SessionContext/SessionContext';

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SettingsProvider>
        <SessionProvider>
          <Main />
        </SessionProvider>
      </SettingsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
