import { chakra, Flex } from '@chakra-ui/react';
import { LangButtonProps } from './types';
import { ease } from '../../../theme/foundations/transitions';
import { IconTickLg } from '../../../theme/foundations/icons';

const _LangButton = ({ name, onClick, isActive = false, ...rest }: LangButtonProps) => {
  return (
    <Flex
      w="100%"
      p="15px"
      textAlign="left"
      alignItems="center"
      justifyContent="space-between"
      color="primary"
      borderRadius="10px"
      transition={ease}
      bgColor={isActive ? 'button.fill.default' : 'transparent'}
      _hover={{ bgColor: 'button.fill.hover' }}
      _active={{ bgColor: 'button.fill.active' }}
      {...rest}
      asChild
    >
      <button type="button" aria-current={isActive ? 'true' : undefined} onClick={onClick}>
        {name}
        <IconTickLg boxSize="24px" color="accent.red" isActive={isActive} />
      </button>
    </Flex>
  );
};

const LangButton = chakra(_LangButton);
export default LangButton;
