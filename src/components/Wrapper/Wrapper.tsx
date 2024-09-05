import { FC } from 'react';
import { WrapperProps } from './types';
import { Box, Container } from '@chakra-ui/react';

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" paddingBlockStart={{ base: 'gap.16', md: 'gap.30' }}>
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h={{ base: 'calc(100vh - 16px)', md: 'calc(100vh - 30px)' }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Wrapper;
