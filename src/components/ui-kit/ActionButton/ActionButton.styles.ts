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
      bgColor: 'background.button.fill.default',
      _hover: {
        bgColor: 'background.button.fill.hover',
      },
      focusVisible: {
        bgColor: 'background.button.fill.focus',
      },
    },
    stroke: {
      border: '2px solid',
      borderColor: 'background.button.stroke.default',
      _hover: {
        borderColor: 'background.button.stroke.hover',
      },
      focusVisible: {
        bgColor: 'background.button.stroke.focus',
      },
    },
  },
  defaultProps: {
    variant: 'stroke',
  },
});

export default ActionButtonStyles;
