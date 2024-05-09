import { defineStyleConfig } from '@chakra-ui/react';

const MenuStyles = defineStyleConfig({
  baseStyle: {
    button: {
      w: '100%',
      h: { base: '50px', md: '60px' },
      bgColor: 'select.button.primary',
      borderRadius: '100px',
      paddingInline: 'gap.24',
      span: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      '+ *': {
        w: '100%',
      },
    },
    list: {
      borderRadius: '20px',
      w: '100%',
      maxW: '100%',
      overflow: 'hidden',
      p: '0',
    },
  },
});

export default MenuStyles;
