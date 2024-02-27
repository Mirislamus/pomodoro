import { DrawerProps } from '@chakra-ui/react';

export interface MobileMenuProps extends Omit<DrawerProps, 'children'> {
  onLangMenuOpen: () => void;
}
