import { defineSlotRecipe } from '@chakra-ui/react';

const styles = {
  p: 0,
  bgColor: 'background.secondary',
};

const DrawerStyles = defineSlotRecipe({
  slots: ['backdrop', 'positioner', 'content', 'header', 'body', 'footer', 'closeTrigger'],
  base: {
    positioner: {
      p: 0,
    },
    backdrop: {
      bgColor: 'background.overlay',
    },
    content: styles,
    header: styles,
    body: styles,
    footer: styles,
    closeTrigger: {
      borderRadius: '50%',
      boxSize: '40px',
      position: 'static',
      bgColor: 'button.fill.default',
      _hover: {
        bgColor: 'button.fill.hover',
      },
      _active: {
        bgColor: 'button.fill.active',
      },
    },
  },
});

export default DrawerStyles;
