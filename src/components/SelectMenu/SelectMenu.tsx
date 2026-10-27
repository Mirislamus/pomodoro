import { Menu, Portal, useDisclosure } from '@chakra-ui/react';
import { SelectMenuProps } from './types';
import { IconChevronDown, IconTickLg } from '../../theme/foundations/icons';
import { easeIn } from '../../theme/foundations/transitions';

const SelectMenu = ({ value, items, describedBy }: SelectMenuProps) => {
  const { open, setOpen } = useDisclosure();
  const selectedItem = items.find(item => item.id === value) ?? items[0];

  return (
    <Menu.Root open={open} onOpenChange={details => setOpen(details.open)} positioning={{ sameWidth: true }}>
      <Menu.Trigger aria-describedby={describedBy}>
        {selectedItem?.name}
        <IconChevronDown boxSize="12px" transition={easeIn} transform={open ? 'rotate(180deg)' : undefined} />
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content zIndex={30}>
            <Menu.RadioItemGroup value={selectedItem?.id}>
              {items.map(item => (
                <Menu.RadioItem
                  key={item.id}
                  value={item.id}
                  bgColor={item.id === selectedItem?.id ? 'select.item.selected' : 'transparent'}
                  onClick={item.onClick}
                >
                  <Menu.ItemIndicator>
                    <IconTickLg boxSize="24px" color="accent.red" isActive />
                  </Menu.ItemIndicator>
                  <Menu.ItemText>{item.name}</Menu.ItemText>
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default SelectMenu;
