import { Flex, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { CircleButtonProps } from './types';

const _CircleButton: FC<CircleButtonProps> = ({ children, onClick, ...rest }) => {
  return (
    <Flex
      as="button"
      alignItems="center"
      justifyContent="space-between"
      textAlign="left"
      textStyle="text.sm"
      w="100%"
      onClick={onClick}
      {...rest}
    >
      {children}
    </Flex>
  );
};

const CircleButton = chakra(_CircleButton);
export default CircleButton;
