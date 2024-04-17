import { Icon } from '@chakra-ui/react';

export interface ActionButtonProps {
  variant?: 'fill' | 'stroke';
  isDisabled?: boolean;
  icon: typeof Icon;
  onClick: () => void;
}
