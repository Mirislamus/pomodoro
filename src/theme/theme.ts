import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';
import typography from './typography';

const theme = {
  ...typography,
  components: {},
  config: {
    useSystemColorMode: false,
  },
  breakpoints,
};

export default extendTheme(theme);
