import { FC } from 'react';
import { SelectMenuProps } from './types';
import { Box, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { IconChevronDown, IconTickLg } from '../../theme/foundations/icons';
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
        <MenuList maxWidth="100%" zIndex={10}>
          <MenuOptionGroup defaultValue={selectedItem} type="radio">
            {items.map(item => (
              <MenuItemOption
                key={item.id}
                value={item.id}
                iconSpacing="0"
                bgColor={item.id === selectedItem ? 'select.item.selected' : 'transparent'}
                icon={
                  <IconTickLg
                    isActive={item.id === selectedItem}
                    boxSize="24px"
                    color="accent.red"
                  />
                }
                onClick={item.onClick}
              >
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
