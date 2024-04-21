import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    fontWeight: 'semibold',
    textStyle: 'text.sm',
    color: 'grey.3',
  },
  tabpanel: {
    fontFamily: 'mono',
  },
});

const variants = {
  'soft-rounded': definePartsStyle({
    tablist: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      bgColor: 'background.tabs',
      p: '3px',
      borderRadius: '100px',
    },
    tab: {
      color: 'grey.3',
      fontWeight: 600,
      zIndex: 2,
      h: '50px',
      _selected: {
        color: 'primary',
        bg: 'none',
      },
    },
    tabpanel: {
      p: '0',
    },
  }),
};

const TabsStyles = defineMultiStyleConfig({ baseStyle, variants });
export default TabsStyles;
