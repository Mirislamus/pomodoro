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
        _dark: 'black',
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
      toast: {
        _light: 'white',
        _dark: 'grey.5',
      },
      switch: {
        _light: 'grey.8',
        _dark: 'whiteAlpha.15',
      },
      stageSwitcher: {
        _light: 'blackAlpha.8',
        _dark: 'whiteAlpha.15',
      },
      stageItem: {
        default: {
          _light: 'blackAlpha.8',
          _dark: 'whiteAlpha.10',
        },
        tick: {
          _light: 'accent.red',
          _dark: 'white',
        },
        active: {
          _light: 'black.1',
          _dark: 'accent.red',
        },
      },
      settings: {
        desktop: {
          _light: 'white',
          _dark: 'whiteAlpha.15',
        },
        mobile: {
          _light: 'white',
          _dark: 'black.1',
        },
      },
      tabs: {
        _light: 'grey.2',
        _dark: 'whiteAlpha.10',
      },
    },
    button: {
      fill: {
        default: {
          _light: 'blackAlpha.8',
          _dark: 'whiteAlpha.15',
        },
        hover: {
          _light: 'blackAlpha.12',
          _dark: 'whiteAlpha.20',
        },
        active: {
          _light: 'blackAlpha.18',
          _dark: 'whiteAlpha.25',
        },
      },
      stroke: {
        default: {
          _light: 'blackAlpha.8',
          _dark: 'whiteAlpha.30',
        },
        hover: {
          _light: 'black.1',
          _dark: 'white',
        },
      },
      ghostActive: {
        _light: 'white',
        _dark: 'black.1',
      },
      circle: {
        default: {
          _light: 'black.1',
          _dark: 'white',
        },
        text: {
          _light: 'white',
          _dark: 'black.1',
        },
      },
    },
    circle: {
      primary: {
        _light: 'blackAlpha.8',
        _dark: 'whiteAlpha.20',
      },
      secondary: {
        _light: 'black.1',
        _dark: 'white',
      },
    },
    scroll: {
      thumb: {
        _light: 'black.1',
        _dark: 'whiteAlpha.15',
      },
      track: {
        _light: 'grey.8',
        _dark: 'whiteAlpha.10',
      },
    },
    select: {
      button: {
        primary: {
          _light: 'blackAlpha.8',
          _dark: 'whiteAlpha.15',
        },
        secondary: {
          _light: 'blackAlpha.10',
          _dark: 'whiteAlpha.10',
        },
      },
      list: {
        _light: 'grey.9',
        _dark: 'black.4',
      },
      item: {
        selected: {
          _light: 'blackAlpha.8',
          _dark: 'whiteAlpha.8',
        },
        hover: {
          _light: 'blackAlpha.6',
          _dark: 'whiteAlpha.6',
        },
      },
    },
  },
} as ChakraTheme['semanticTokens'];

export default semanticTokens;
