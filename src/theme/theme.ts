import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';

const theme = {
  components: {},
  config: {
    useSystemColorMode: false,
  },
  breakpoints,
};

export default extendTheme(theme);
