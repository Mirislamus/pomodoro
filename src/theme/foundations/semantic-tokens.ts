import { ChakraTheme } from '@chakra-ui/react';

const semanticTokens = {
  colors: {
    primary: {
      _light: 'white',
      _dark: 'black.1',
    },
    secondary: {
      _light: 'grey.1',
      _dark: 'grey.4',
    },
    tertiary: {
      _light: 'grey.2',
      _dark: 'grey.5',
    },
    additionaly: {
      default: 'grey.3',
    },
    background: {
      primary: {
        _light: 'white',
        _dark: 'black',
      },
      modal: {
        default: 'black.alpha',
      },
    },
  },
} as ChakraTheme['semanticTokens'];

export default semanticTokens;
