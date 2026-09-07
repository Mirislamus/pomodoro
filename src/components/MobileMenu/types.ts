import type { ColorMode } from '../ui/color-mode';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  colorMode: ColorMode;
  onLangMenuOpen: () => void;
  onColorModeClick: () => void;
}
