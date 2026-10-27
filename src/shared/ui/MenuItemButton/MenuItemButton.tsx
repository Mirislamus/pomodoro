import { Flex, chakra } from '@chakra-ui/react';
import { MenuItemButtonProps } from './types';
import { ease } from '../../../theme/foundations/transitions';

/** Full-width row button used in the mobile menu drawer. */
const _MenuItemButton = ({ children, onClick, ...rest }: MenuItemButtonProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap="gap.16"
      textAlign="left"
      textStyle="text.sm"
      color="primary"
      w="100%"
      py="16px"
      borderBottom="1px solid"
      borderColor="border"
      transition={ease}
      _hover={{ opacity: 0.8 }}
      {...rest}
      asChild
    >
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </Flex>
  );
};

const MenuItemButton = chakra(_MenuItemButton);
export default MenuItemButton;
