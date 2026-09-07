import type { ColorMode } from '../ui/color-mode';

export interface FooterProps {
  isSettings?: boolean;
  colorMode: ColorMode;
  allowNotification?: boolean;
  onSettingsClick: () => void;
  onNotifyClick: () => void;
  onColorModeClick: () => void;
  isNotificationDisabled?: boolean;
}
