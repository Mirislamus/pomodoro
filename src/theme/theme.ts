import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
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
import TabsStyles from './components/Tabs/Tabs.styles';
import InputStyles from './components/Input/Input.styles';
import LinkStyles from './components/Link/Link.styles';
import MenuStyles from './components/Menu/Menu.styles';
import global from './foundations/global';
import sizes from './foundations/sizes';
import { createColorSemanticTokens, createTokens } from './utils';

const config = defineConfig({
  globalCss: global,
  theme: {
    breakpoints,
    tokens: {
      ...createTokens({
        ...typography,
        spacing: spacing.space,
        sizes,
        colors,
      }),
    },
    semanticTokens: {
      colors: createColorSemanticTokens(semanticTokens.colors),
    },
    textStyles: Object.fromEntries(
      Object.entries(textStyles).map(([group, styles]) => [
        group,
        Object.fromEntries(Object.entries(styles).map(([name, value]) => [name, { value }])),
      ])
    ),
    recipes: {
      button: ButtonStyles,
      container: ContainerStyles,
      input: InputStyles,
      link: LinkStyles,
    },
    slotRecipes: {
      drawer: DrawerStyles,
      tooltip: TooltipStyles,
      switch: SwitchStyles,
      tabs: TabsStyles,
      menu: MenuStyles,
    },
  },
});

export const system = createSystem(defaultConfig, config);
