import { MenuProps } from '@chakra-ui/react';

type SelectMenuItem = {
  id: string;
  name: string;
  onClick: () => void;
};

export interface SelectMenuProps extends Omit<MenuProps, 'children'> {
  selectedItem: string;
  items: SelectMenuItem[];
}
