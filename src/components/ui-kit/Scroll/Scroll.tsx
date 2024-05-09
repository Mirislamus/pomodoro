import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { ScrollProps } from './types';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const Scroll: FC<ScrollProps> = ({ children, maxScrollHeight }) => {
  return (
    <Box
      display="contents"
      __css={{
        '[data-simplebar]': {
          paddingBlockStart: '2px',
          paddingBlockEnd: '2px',
          maxH: maxScrollHeight ? maxScrollHeight : '100%',
          marginInlineEnd: { base: '0', md: '-40px' },
          paddingInlineEnd: { base: '0', md: '40px' },
        },
        '.simplebar-track.simplebar-vertical': {
          w: '4px',
          bgColor: 'scroll.track',
          borderRadius: '100px',
        },
        '.simplebar-scrollbar': {
          _before: {
            bgColor: 'scroll.thumb',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '100px',
          },
        },
      }}
    >
      <SimpleBar autoHide={false}>{children}</SimpleBar>
    </Box>
  );
};

export default Scroll;
