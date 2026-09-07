import { defineSlotRecipe } from '@chakra-ui/react';

const TabsStyles = defineSlotRecipe({
  slots: ['root', 'list', 'trigger', 'content', 'indicator'],
  variants: {
    variant: {
      'soft-rounded': {
        list: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          bgColor: 'background.tabs',
          p: '3px',
          borderRadius: '100px',
        },
        trigger: {
          color: 'grey.3',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 600,
          justifyContent: 'center',
          lineHeight: '20px',
          textAlign: 'center',
          zIndex: 2,
          h: { base: '44px', md: '50px' },
          _selected: {
            color: 'primary',
            bg: 'none',
          },
        },
        content: {
          p: '0',
          _horizontal: {
            pt: '0',
          },
          _focusVisible: {
            boxShadow: 'none!important',
          },
        },
      },
    },
  },
});

export default TabsStyles;
