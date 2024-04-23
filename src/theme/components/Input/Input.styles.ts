import { defineStyleConfig } from '@chakra-ui/react';
import { ease } from '../../foundations/transitions';

const InputStyles = defineStyleConfig({
  baseStyle: {
    field: {
      transition: ease,
      h: '42px',
      borderRadius: '100px',
      textAlign: 'center',
    },
  },
  variants: {
    numeric: {
      field: {
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
  defaultProps: {
    size: 'md',
  },
});

export default InputStyles;
