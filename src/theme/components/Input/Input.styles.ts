import { defineRecipe } from '@chakra-ui/react';
import { ease } from '../../foundations/transitions';

const InputStyles = defineRecipe({
  base: {
    transition: ease,
    h: '42px',
    borderRadius: '100px',
    textAlign: 'center',
  },
  variants: {
    variant: {
      numeric: {
        bgColor: 'button.fill.default',
        _hover: {
          bgColor: 'button.fill.hover',
        },
        _active: {
          bgColor: 'button.fill.active',
        },
        w: '82px',
      },
    },
  },
});

export default InputStyles;
