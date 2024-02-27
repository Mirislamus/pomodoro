import { FC } from 'react';
import { ActionButtonProps } from './types';
import { Flex, Icon, chakra } from '@chakra-ui/react';
import { ease } from '../../../theme/foundations/transitions';

const _ActionButton: FC<ActionButtonProps> = ({ icon, onClick, ...rest }) => {
  return (
    <Flex
      as="button"
      onClick={onClick}
      boxSize={{ base: '44px', md: '50px' }}
      alignItems="center"
      justifyContent="center"
      bgColor="background.button.default"
      borderRadius="50%"
      _hover={{
        bgColor: 'background.button.hover',
      }}
      _focusVisible={{
        bgColor: 'background.button.focus',
      }}
      transition={ease}
      {...rest}
    >
      <Icon as={icon} boxSize="24px" color="primary" />
    </Flex>
  );
};

const ActionButton = chakra(_ActionButton);
export default ActionButton;
