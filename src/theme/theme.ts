import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';
import typography from './typography';

const theme = {
  ...typography,
  components: {},
  config: {},
  breakpoints,
};

export default extendTheme(theme);
