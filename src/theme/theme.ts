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
import TabsStyles from './components/Tabs/Tabs.styles';
import InputStyles from './components/Input/Input.styles';
import LinkStyles from './components/Link/Link.styles';
import MenuStyles from './components/Menu/Menu.styles';
import global from './foundations/global';

const theme = {
  ...typography,
  ...spacing,
  colors,
  semanticTokens,
  textStyles,
  styles: {
    global,
  },
  components: {
    Container: ContainerStyles,
    Button: ButtonStyles,
    Drawer: DrawerStyles,
    Tooltip: TooltipStyles,
    Switch: SwitchStyles,
    Tabs: TabsStyles,
    Input: InputStyles,
    Link: LinkStyles,
    Menu: MenuStyles,
    ActionButtonStyles,
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'system',
  },
  breakpoints,
};

export default extendTheme(theme);
