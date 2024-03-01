import { ChakraTheme } from '@chakra-ui/react';

const semanticTokens = {
  colors: {
    primary: {
      _light: 'black.1',
      _dark: 'white',
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
    border: {
      _light: 'grey.6',
      _dark: 'whiteAlpha.10',
    },
    background: {
      primary: {
        _light: 'white',
        _dark: 'black.1',
      },
      secondary: {
        _light: 'white',
        _dark: 'black.2',
      },
      overlay: {
        _default: 'blackAlpha.50',
      },
      tooltip: {
        _light: 'grey.7',
        _dark: 'black.3',
      },
      button: {
        default: {
          _light: 'blackAlpha.8',
          _dark: 'whiteAlpha.15',
        },
        hover: {
          _light: 'blackAlpha.12',
          _dark: 'whiteAlpha.20',
        },
        focus: {
          _light: 'blackAlpha.18',
          _dark: 'whiteAlpha.25',
        },
      },
    },
  },
} as ChakraTheme['semanticTokens'];

export default semanticTokens;
