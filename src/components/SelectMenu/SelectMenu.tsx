import { Box, Menu, Portal } from '@chakra-ui/react';
import { SelectMenuProps } from './types';
import { IconChevronDown, IconTickLg } from '../../theme/foundations/icons';
import { easeIn } from '../../theme/foundations/transitions';

const SelectMenu = ({ items, selectedItem, isOpen, onOpen, onClose }: SelectMenuProps) => {
  const selectedValue = items.find(item => item.name === selectedItem)?.id ?? selectedItem;

  return (
    <Box pos="relative">
      <Menu.Root
        open={isOpen}
        onOpenChange={({ open }) => (open ? onOpen() : onClose())}
        positioning={{ sameWidth: true }}
      >
        <Menu.Trigger>
          {selectedItem}
          <IconChevronDown boxSize="12px" transition={easeIn} transform={isOpen ? 'rotate(180deg)' : ''} />
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content zIndex={30}>
              <Menu.RadioItemGroup value={selectedValue}>
                {items.map(item => (
                  <Menu.RadioItem
                    key={item.id}
                    value={item.id}
                    bgColor={item.id === selectedValue ? 'select.item.selected' : 'transparent'}
                    onClick={item.onClick}
                  >
                    <Menu.ItemIndicator>
                      <IconTickLg boxSize="24px" color="accent.red" />
                    </Menu.ItemIndicator>
                    <Menu.ItemText>{item.name}</Menu.ItemText>
                  </Menu.RadioItem>
                ))}
              </Menu.RadioItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
};

export default SelectMenu;
