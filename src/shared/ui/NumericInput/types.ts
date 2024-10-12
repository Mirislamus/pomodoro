export interface NumericInputProps {
  title: string;
  value: number;
  step?: number;
  min?: number;
  max?: number;
  hasMinutes?: boolean;
  onChange: (value: number) => void;
}
