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
      bgColor: 'background.button.default',
      _hover: {
        bgColor: 'background.button.hover',
      },
      _focusVisible: {
        bgColor: 'background.button.focus',
      },
    },
  },
});

export default DrawerStyles;
