export interface PercentSliderProps {
  id?: string;
  title: string;
  /** Fraction between 0 and 1. */
  value: number;
  onChange: (value: number) => void;
}
