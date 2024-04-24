import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import { ease } from '../../../theme/foundations/transitions';
import { UseToastCustomOptions } from './types';
import { noop } from '../../../utils';
import { IconClose, IconInfo } from '../../../theme/foundations/icons';

const getIconColor = (status: UseToastCustomOptions['status']) => {
  if (status === 'success') {
    return 'accent.green';
  }
  if (status === 'error') {
    return 'accent.red';
  }
  if (status === 'warning') {
    return 'accent.yellow';
  }
  return 'accent.blue';
};

export const RenderToast = (toast: ReturnType<typeof useToast>, options: UseToastCustomOptions) => {
  const { title, id, isClosable, status = 'info', onUserClose = noop } = options;

  const handleToastClose = () => {
    if (id) {
      toast.close(id);
    }
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
      <Text textStyle="text.sm">{title}</Text>
      {isClosable && (
        <Box
          role="group"
          as="button"
          onClick={handleToastClose}
          aria-label="Close toast"
          position="absolute"
          top="4px"
          right="-20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconClose
            _groupHover={{
              opacity: 0.8,
            }}
            transition={ease}
            color="gray.3"
            boxSize="16px"
          />
        </Box>
      )}
    </Flex>
  );
};
