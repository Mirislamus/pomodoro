import { Icon } from '@chakra-ui/react';

export interface ActionButtonProps {
  variant?: 'fill' | 'stroke';
  icon: typeof Icon;
  onClick: () => void;
}
