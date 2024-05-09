import { FC } from 'react';
import { SelectMenuProps } from './types';
import { Box, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { IconChevronDown } from '../../theme/foundations/icons';
import { easeIn } from '../../theme/foundations/transitions';

const SelectMenu: FC<SelectMenuProps> = ({ items, selectedItem, isOpen, ...props }) => {
  return (
    <Box pos="relative">
      <Menu {...props}>
        <MenuButton>
          {selectedItem}
          <IconChevronDown
            boxSize="12px"
            transition={easeIn}
            transform={isOpen ? 'rotate(180deg)' : ''}
          />
        </MenuButton>
        <MenuList maxWidth="100%">
          <MenuOptionGroup defaultValue={selectedItem} type="radio">
            {items.map(item => (
              <MenuItemOption key={item.id} value={item.id} onClick={item.onClick}>
                {item.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SelectMenu;
