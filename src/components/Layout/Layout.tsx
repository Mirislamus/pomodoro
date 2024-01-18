import { FC } from 'react';
import { LayoutProps } from './types';
import { Box, Container } from '@chakra-ui/react';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      minHeight="100vh"
      bgColor="primary"
      pt={{ base: 'gap.16', md: 'gap.30' }}
      pb={{ base: 'gap.20', md: 'gap.30' }}
    >
      <Container>{children}</Container>
    </Box>
  );
};

export default Layout;
