import { defineStyleConfig } from '@chakra-ui/react';

const ActionButtonStyles = defineStyleConfig({
  baseStyle: {
    boxSize: { base: '44px', md: '50px' },
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
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
    },
  },
  defaultProps: {
    variant: 'stroke',
  },
});

export default ActionButtonStyles;
