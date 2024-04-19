import { ColorMode } from '@chakra-ui/react';

export interface FooterProps {
  isSettings?: boolean;
  colorMode: ColorMode;
  allowNotify?: boolean;
  onSettingsClick: () => void;
  onNotifyClick: () => void;
  onColorModeClick: () => void;
}
