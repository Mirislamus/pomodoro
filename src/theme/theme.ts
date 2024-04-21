import { extendTheme } from '@chakra-ui/react';
import breakpoints from './breakpoints';
import typography from './typography';
import textStyles from './typography/text-styles';
import colors from './foundations/colors';
import semanticTokens from './foundations/semantic-tokens';
import ContainerStyles from './components/Container/Container.styles';
import spacing from './foundations/spacing';
import ButtonStyles from './components/Button/Button.styles';
import DrawerStyles from './components/Drawer/Drawer.styles';
import TooltipStyles from './components/Tooltip/Tooltip.styles';
import SwitchStyles from './components/Switch/Switch.styles';
import ActionButtonStyles from '../components/ui-kit/ActionButton/ActionButton.styles';
import { ease } from './foundations/transitions';
import TabsStyles from './components/Tabs/Tabs.styles';

const theme = {
  ...typography,
  ...spacing,
  colors,
  semanticTokens,
  textStyles,
  styles: {
    global: {
      body: {
        bg: 'background.primary',
        minH: '100vh',
        transition: ease,
      },
      '*': {
        _focusVisible: {
          outline: 'none',
          boxShadow: '0 0 0 2px #ED4455!important',
        },
      },
    },
  },
  components: {
    Container: ContainerStyles,
    Button: ButtonStyles,
    Drawer: DrawerStyles,
    Tooltip: TooltipStyles,
    Switch: SwitchStyles,
    Tabs: TabsStyles,
    ActionButtonStyles,
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'system',
  },
  breakpoints,
};

export default extendTheme(theme);
