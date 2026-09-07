import { defineSlotRecipe } from '@chakra-ui/react';

const TooltipStyles = defineSlotRecipe({
  slots: ['content', 'arrow', 'arrowTip'],
  base: {
    arrowTip: {
      borderRadius: '2px',
    },
  },
});

export default TooltipStyles;
