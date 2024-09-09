import { ColorMode } from '@chakra-ui/react';

export interface FooterProps {
  isSettings?: boolean;
  colorMode: ColorMode;
  allowNotification?: boolean;
  onSettingsClick: () => void;
  onNotifyClick: () => void;
  onColorModeClick: () => void;
  isNotificationDisabled?: boolean;
}
