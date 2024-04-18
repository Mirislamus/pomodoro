import React from 'react';
import { createRoot } from 'react-dom/client';
import './theme/typography/fonts.css';
import './localization/i18n';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Main from './pages/Main';
import theme from './theme/theme';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SettingsProvider>
        <Main />
      </SettingsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
