import { defineStyleConfig } from '@chakra-ui/react';

const ActionButtonStyles = defineStyleConfig({
  baseStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
  sizes: {
    sm: {
      boxSize: '42px',
    },
    lg: {
      boxSize: { base: '44px', md: '50px' },
    },
  },
  variants: {
    fill: {
      bgColor: 'button.fill.default',
      _hover: {
        bgColor: 'button.fill.hover',
      },
      _active: {
        bgColor: 'button.fill.active',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.7',
        pointerEvents: 'none',
      },
    },
    stroke: {
      border: '2px solid',
      borderColor: 'button.stroke.default',
      _hover: {
        borderColor: 'button.stroke.hover',
      },
      _active: {
        bgColor: 'button.stroke.active',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.7',
        pointerEvents: 'none',
      },
    },
  },
  defaultProps: {
    variant: 'stroke',
    size: 'lg',
  },
});

export default ActionButtonStyles;
