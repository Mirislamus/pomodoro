import { Flex, chakra } from '@chakra-ui/react';
import { CircleButtonProps } from './types';

const _CircleButton = ({ children, onClick, ...rest }: CircleButtonProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      textAlign="left"
      textStyle="text.sm"
      w="100%"
      {...rest}
      asChild
    >
      <button onClick={onClick}>{children}</button>
    </Flex>
  );
};

const CircleButton = chakra(_CircleButton);
export default CircleButton;
