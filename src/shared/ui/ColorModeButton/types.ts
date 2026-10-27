import type { ColorMode, TransitionOrigin } from '../../../components/ui/color-mode';

export interface ColorModeButtonProps {
  colorMode: ColorMode;
  onClick: (origin: TransitionOrigin) => void;
}
