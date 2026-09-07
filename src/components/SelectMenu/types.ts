type SelectMenuItem = {
  id: string;
  name: string;
  onClick: () => void;
};

export interface SelectMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedItem: string;
  items: SelectMenuItem[];
}
