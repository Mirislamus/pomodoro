import { defineStyleConfig } from '@chakra-ui/react';

const ButtonStyles = defineStyleConfig({
  baseStyle: {
    color: 'primary',
    borderRadius: '100px',
    bgColor: 'background.button.default',

    _hover: {
      bgColor: 'background.button.hover',
    },
    _focusVisible: {
      bgColor: 'background.button.focus',
    },
    '.chakra-button__icon': {
      mr: 'gap.4',
      svg: {
        boxSize: '24px',
      },
    },
  },
  sizes: {
    md: {
      px: '20px',
      h: '50px',
      fontWeight: 400,
      fontSize: '14px',
    },
  },
  variants: {
    default: {},
  },
  defaultProps: {
    variant: 'default',
    size: 'md',
  },
});

export default ButtonStyles;
