import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';
import typography from './typography';
import textStyles from './typography/text-styles';

const theme = {
  ...typography,
  textStyles,
  styles: {
    global: {
      body: {
        textStyles: 'text.md',
        letterSpacing: 'normal',
      },
    },
  },
  components: {},
  config: {
    useSystemColorMode: false,
    initialColorMode: 'system',
  },
  breakpoints,
};

export default extendTheme(theme);
