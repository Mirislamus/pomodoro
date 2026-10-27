export interface SwitchInputProps {
  title: string;
  description?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange: (checked: boolean) => void;
}
