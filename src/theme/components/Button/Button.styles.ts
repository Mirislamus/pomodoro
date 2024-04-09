import { defineStyleConfig } from '@chakra-ui/react';
import { ease } from '../../foundations/transitions';

const ButtonStyles = defineStyleConfig({
  baseStyle: {
    textTransform: 'uppercase',
    transition: ease,
  },
  sizes: {
    lg: {
      h: '100px',
      px: '24px',
      fontWeight: 500,
      fontSize: '14px',
    },
    md: {
      h: '60px',
      px: '24px',
      fontWeight: 500,
      fontSize: '14px',
    },
    sm: {
      px: '20px',
      h: '50px',
      fontWeight: 400,
      fontSize: '14px',
    },
    xs: {
      px: '20px',
      h: '44px',
      fontWeight: 400,
      fontSize: '14px',
    },
  },
  variants: {
    primary: {
      color: 'primary',
      borderRadius: '100px',
      bgColor: 'button.fill.default',
      '.chakra-button__icon': {
        mr: 'gap.4',
        svg: {
          boxSize: '24px',
        },
      },
      _hover: {
        bgColor: 'button.fill.hover',
      },
      _active: {
        bgColor: 'button.fill.active',
      },
    },
    secondary: {
      color: 'white',
      borderRadius: '100px',
      border: '2px solid',
      borderColor: 'accent.red',
      bgColor: 'accent.red',
      _hover: {
        bgColor: 'transparent',
        color: 'accent.red',
      },
      _active: {
        bgColor: 'accentAlpha.red.15',
        color: 'accent.red',
      },
    },
    circle: {
      boxSize: '100px',
      borderRadius: '50%',
      bgColor: 'button.circle.default',
      color: 'button.circle.text',
      p: '0',
      _hover: {
        opacity: 0.9,
      },
      _active: {
        opacity: 0.95,
      },
    },
  },
  defaultProps: {
    size: 'sm',
    variant: 'primary',
  },
});

export default ButtonStyles;
