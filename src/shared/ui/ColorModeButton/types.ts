import type { ColorMode } from '../../../components/ui/color-mode';

export interface ColorModeButtonProps {
  colorMode: ColorMode;
  onClick: () => void;
}
