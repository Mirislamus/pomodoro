import { defineRecipe } from '@chakra-ui/react';

const ContainerStyles = defineRecipe({
  base: {
    maxW: {
      base: '100%',
      md: 'container.md',
      lg: 'container.lg',
      xl: 'container.xl',
    },
    px: {
      base: 'gap.16',
      md: 'gap.30',
      lg: 'gap.30',
      xl: 'gap.30',
    },
  },
});

export default ContainerStyles;
