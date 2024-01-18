import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';
import typography from './typography';
import textStyles from './typography/text-styles';
import colors from './foundations/colors';
import semanticTokens from './foundations/semantic-tokens';
import ContainerStyles from './components/Container/Container.styles';
import spacing from './foundations/spacing';

const theme = {
  ...typography,
  ...spacing,
  colors,
  semanticTokens,
  textStyles,
  styles: {
    global: {
      body: {
        color: 'white',
        textStyles: 'text.md',
        letterSpacing: 'normal',
      },
    },
  },
  components: {
    Container: ContainerStyles,
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'system',
  },
  breakpoints,
};

export default extendTheme(theme);
