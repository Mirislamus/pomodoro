import { defineStyleConfig } from '@chakra-ui/react';

const ButtonStyles = defineStyleConfig({
  sizes: {
    md: {
      px: '20px',
      h: '50px',
      fontWeight: 400,
      fontSize: '14px',
    },
  },
  variants: {
    default: {
      color: 'primary',
      borderRadius: '100px',
      bgColor: 'background.button.default',
      '.chakra-button__icon': {
        mr: 'gap.4',
        svg: {
          boxSize: '24px',
        },
      },
      _hover: {
        bgColor: 'background.button.hover',
      },
      _focusVisible: {
        bgColor: 'background.button.focus',
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'default',
  },
});

export default ButtonStyles;
