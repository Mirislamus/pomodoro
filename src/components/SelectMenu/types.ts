type SelectMenuItem = {
  id: string;
  name: string;
  onClick: () => void;
};

export interface SelectMenuProps {
  value: string;
  items: SelectMenuItem[];
  /** Id of the element describing what is being selected. */
  describedBy?: string;
}
