import { defineStyleConfig } from '@chakra-ui/react';

const TabsStyles = defineStyleConfig({
  variants: {
    'soft-rounded': {
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
        h: { base: '44px', md: '50px' },
        _selected: {
          color: 'primary',
          bg: 'none',
        },
      },
      tabpanel: {
        p: '0',
      },
    },
  },
});

export default TabsStyles;
