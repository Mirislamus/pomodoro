import React from 'react';
import { createRoot } from 'react-dom/client';
import './theme/typography/fonts.css';
import './localization/i18n';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import theme from './theme/theme';
import { SettingsProvider } from './contexts/SettingsContext/SettingsContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </ChakraProvider>
  </React.StrictMode>
);
