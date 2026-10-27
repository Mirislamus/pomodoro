import { defineSlotRecipe } from '@chakra-ui/react';
import { animations, ease } from '../../foundations/transitions';

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
          transition: `color ${ease}`,
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
          // Only the opening panel animates: a closing panel with no animation is hidden at once
          // instead of lingering on top of the new one
          _open: {
            animation: animations.contentEnter,
          },
        },
      },
    },
  },
});

export default TabsStyles;
