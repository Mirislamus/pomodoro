import { FC } from 'react';
import { FieldWrapProps } from './types';
import { Box, chakra } from '@chakra-ui/react';

const _FieldWrap: FC<FieldWrapProps> = ({ children, ...props }) => {
  return (
    <Box
      paddingBlockEnd={{ base: '20px', md: '15px' }}
      marginBlockEnd={{ base: '20px', md: '15px' }}
      borderBlockEnd="1px solid"
      borderColor="border"
      {...props}
    >
      {children}
    </Box>
  );
};

const FieldWrap = chakra(_FieldWrap);
export default FieldWrap;
