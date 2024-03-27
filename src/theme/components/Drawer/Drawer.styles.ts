import { defineStyleConfig } from '@chakra-ui/react';

const styles = {
  p: 0,
  bgColor: 'background.secondary',
};

const DrawerStyles = defineStyleConfig({
  baseStyle: {
    dialogContainer: {
      p: 0,
    },
    overlay: {
      bgColor: 'background.overlay',
    },
    header: styles,
    body: styles,
    footer: styles,
    closeButton: {
      borderRadius: '50%',
      boxSize: '40px',
      position: 'static',
      bgColor: 'background.button.fill.default',
      _hover: {
        bgColor: 'background.button.fill.hover',
      },
      _focusVisible: {
        bgColor: 'background.button.fill.focus',
      },
    },
  },
});

export default DrawerStyles;
