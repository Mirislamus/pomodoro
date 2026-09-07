import { Box, Flex, Text } from '@chakra-ui/react';
import { ease } from '../../../theme/foundations/transitions';
import { UseToastCustomOptions } from './types';
import { noop } from '../../../utils';
import { IconClose, IconInfo } from '../../../theme/foundations/icons';

interface RenderToastProps extends UseToastCustomOptions {
  onClose: () => void;
}

const getIconColor = (status: UseToastCustomOptions['status']) => {
  if (status === 'success') return 'accent.green';
  if (status === 'error') return 'accent.red';
  if (status === 'warning') return 'accent.yellow';
  return 'accent.blue';
};

export const RenderToast = ({ title, isClosable, status = 'info', onUserClose = noop, onClose }: RenderToastProps) => {
  const handleToastClose = () => {
    onClose();
    onUserClose();
  };

  return (
    <Flex
      alignItems="flex-start"
      bgColor="background.toast"
      borderRadius="10px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
      p="12px"
      pos="relative"
    >
      <IconInfo boxSize="24px" color={getIconColor(status)} flexShrink="0" mr="gap.10" />
      <Text textStyle="text.sm" lineHeight="24px">
        {title}
      </Text>
      {isClosable && (
        <Box
          role="group"
          aria-label="Close toast"
          position="absolute"
          top="4px"
          right="-20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          asChild
        >
          <button onClick={handleToastClose}>
            <IconClose _groupHover={{ opacity: 0.8 }} transition={ease} color="gray.3" boxSize="16px" />
          </button>
        </Box>
      )}
    </Flex>
  );
};
