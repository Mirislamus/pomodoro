import type { ColorMode, TransitionOrigin } from '../ui/color-mode';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  colorMode: ColorMode;
  onLangMenuOpen: () => void;
  onColorModeClick: (origin: TransitionOrigin) => void;
}
