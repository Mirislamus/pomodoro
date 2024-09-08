export interface SwitchInputProps {
  title: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  onChange: (checked: boolean) => void;
}
