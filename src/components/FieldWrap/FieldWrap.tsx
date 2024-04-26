import { FC } from 'react';
import { FieldWrapProps } from './types';
import { Box, chakra } from '@chakra-ui/react';

const _FieldWrap: FC<FieldWrapProps> = ({ children, hasBorder = true, ...props }) => {
  return (
    <Box
      paddingBlockEnd={hasBorder ? { base: '20px', md: '15px' } : 'none'}
      marginBlockEnd={hasBorder ? { base: '20px', md: '15px' } : 'none'}
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
