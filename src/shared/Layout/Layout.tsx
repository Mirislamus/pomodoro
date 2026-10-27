import { LayoutProps } from './types';
import { Box, Container } from '@chakra-ui/react';

// `dvh` follows the visible viewport on mobile browsers with collapsing toolbars, `vh` is the fallback
const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      as="main"
      id="main-content"
      paddingBlockStart={{ base: 'gap.16', md: 'gap.30' }}
      css={{
        minHeight: '100vh',
        '@supports (height: 100dvh)': { minHeight: '100dvh' },
      }}
    >
      <Container
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        css={{
          height: { base: 'calc(100vh - 16px)', md: 'calc(100vh - 30px)' },
          '@supports (height: 100dvh)': {
            height: { base: 'calc(100dvh - 16px)', md: 'calc(100dvh - 30px)' },
          },
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
