import type { ColorMode, TransitionOrigin } from '../ui/color-mode';

export interface FooterProps {
  isSettings?: boolean;
  colorMode: ColorMode;
  areNotificationsEnabled: boolean;
  areNotificationsBlocked: boolean;
  onSettingsClick: () => void;
  onNotifyClick: () => void;
  onColorModeClick: (origin: TransitionOrigin) => void;
}
