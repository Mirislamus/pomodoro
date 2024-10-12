import { ColorMode, DrawerProps } from '@chakra-ui/react';

export interface MobileMenuProps extends Omit<DrawerProps, 'children'> {
  colorMode: ColorMode;
  onLangMenuOpen: () => void;
  onColorModeClick: () => void;
}
