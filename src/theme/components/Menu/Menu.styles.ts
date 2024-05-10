import { defineStyleConfig } from '@chakra-ui/react';
import { easeIn } from '../../foundations/transitions';

const MenuStyles = defineStyleConfig({
  baseStyle: {
    button: {
      w: '100%',
      h: { base: '50px', md: '60px' },
      bgColor: 'select.button.primary',
      borderRadius: '100px',
      paddingInline: 'gap.24',
      fontStyle: 'text.xl',
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
      p: '10px',
      border: 'none',
      bgColor: 'select.list',
      boxShadow: '0 0 30px 0 rgba(0, 0, 0, 0.08)',
    },
    item: {
      transition: easeIn,
      bgColor: 'transparent',
      px: '15px',
      py: '0',
      h: '44px',
      borderRadius: '16px',
      flexDirection: 'row-reverse',
      _hover: {
        bgColor: 'select.item.hover',
      },
    },
  },
});

export default MenuStyles;
