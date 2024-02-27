import { Flex, chakra } from '@chakra-ui/react';
import { FC } from 'react';
import { MobileMenuButtonProps } from './types';

const _MobileMenuButton: FC<MobileMenuButtonProps> = ({ children, onClick, ...rest }) => {
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

const MobileMenuButton = chakra(_MobileMenuButton);
export default MobileMenuButton;
