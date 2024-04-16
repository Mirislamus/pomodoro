import { FC } from 'react';
import { LayoutProps } from './types';
import { Box, Container } from '@chakra-ui/react';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" pt={{ base: 'gap.16', md: 'gap.30' }} pb={{ base: 'gap.20', md: 'gap.30' }}>
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h={{ base: 'calc(100vh - 36px)', md: 'calc(100vh - 60px)' }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
