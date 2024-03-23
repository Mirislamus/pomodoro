import { defineStyleConfig } from '@chakra-ui/react';

const SwitchStyles = defineStyleConfig({
  baseStyle: {
    track: {
      w: '54px',
      h: '28px',
      alignItems: 'center',
      bg: 'background.switch',
      '&[data-checked]': {
        bg: 'accent.red',
      },
    },
    thumb: {
      ml: '2px',
      '&[data-checked]': {
        transform: 'translateX(26px)',
      },
    },
  },
  defaultProps: {
    size: 'lg',
  },
});

export default SwitchStyles;
