import { FieldWrapProps } from './types';
import { Box, chakra } from '@chakra-ui/react';

const _FieldWrap = ({ children, hasBorder = true, ...props }: FieldWrapProps) => {
  return (
    <Box
      paddingBlockEnd={hasBorder ? { base: '12px', md: '15px' } : 'none'}
      marginBlockEnd={hasBorder ? { base: '12px', md: '15px' } : 'none'}
      borderBlockEnd={hasBorder ? '1px solid' : '0'}
      borderColor="border"
      {...props}
    >
      {children}
    </Box>
  );
};

const FieldWrap = chakra(_FieldWrap);
export default FieldWrap;
