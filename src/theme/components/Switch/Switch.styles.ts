import { defineSlotRecipe } from '@chakra-ui/react';

const SwitchStyles = defineSlotRecipe({
  slots: ['root', 'control', 'thumb', 'label', 'indicator'],
  base: {
    root: {
      '&:focus-within [data-part="control"]': {
        outline: 'none',
        boxShadow: '0 0 0 2px rgba(237, 68, 85, .55)',
      },
    },
    control: {
      alignItems: 'center',
      bg: 'background.switch',
      cursor: 'pointer',
      p: '4px',
      _checked: {
        bg: 'accent.red',
      },
    },
  },
  variants: {
    size: {
      lg: {
        root: {
          '--switch-width': '58px',
          '--switch-height': '32px',
          '--switch-x': '26px',
        },
      },
    },
    variant: {
      solid: {
        control: {
          bg: 'background.switch',
          _checked: {
            bg: 'accent.red',
          },
        },
        thumb: {
          w: '24px',
          h: '24px',
          scale: '1',
          bg: 'white',
          _checked: {
            bg: 'white',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'lg',
    variant: 'solid',
  },
});

export default SwitchStyles;
