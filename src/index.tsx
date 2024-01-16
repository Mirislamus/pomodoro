import React from 'react';
import { createRoot } from 'react-dom/client';
import './theme/typography/fonts.css';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import theme from './theme/theme';

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
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
