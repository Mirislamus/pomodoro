import { defineSlotRecipe } from '@chakra-ui/react';
import { easeOutQuint } from '../../foundations/transitions';

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
    content: {
      ...styles,
      // Snappier than the default slide; leaving is quicker than entering
      _open: { animationDuration: '0.4s', animationTimingFunction: easeOutQuint },
      _closed: { animationDuration: '0.25s', animationTimingFunction: 'ease-in' },
    },
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
