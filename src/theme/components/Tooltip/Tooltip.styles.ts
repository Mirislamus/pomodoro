import { defineSlotRecipe } from '@chakra-ui/react';

const TooltipStyles = defineSlotRecipe({
  slots: ['content', 'arrow', 'arrowTip'],
  base: {
    content: {
      '--tooltip-bg': 'colors.background.tooltip',
    },
    arrow: {
      '--arrow-background': 'var(--tooltip-bg, var(--chakra-colors-background-tooltip))',
    },
    arrowTip: {
      borderRadius: '2px',
      borderWidth: '0',
      borderTopWidth: '0',
      borderLeftWidth: '0',
      borderColor: 'transparent',
    },
  },
});

export default TooltipStyles;
