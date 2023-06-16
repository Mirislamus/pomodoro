import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
