import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';
import typography from './typography';

const theme = {
  ...typography,
  components: {},
  config: {
    useSystemColorMode: false,
    initialColorMode: 'system',
  },
  breakpoints,
};

export default extendTheme(theme);
