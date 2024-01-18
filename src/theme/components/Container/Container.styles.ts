import { defineStyleConfig } from '@chakra-ui/react';

const ContainerStyles = defineStyleConfig({
  baseStyle: {
    maxW: {
      base: '100%',
      md: 'container.md',
      lg: 'container.lg',
      xl: 'container.xl',
    },
    px: {
      base: 'gap.16',
      md: 'gap.30',
    },
  },
});

export default ContainerStyles;
