import { Icon } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ActionButtonProps {
  variant?: 'fill' | 'stroke';
  size?: 'sm' | 'lg';
  isDisabled?: boolean;
  icon?: typeof Icon;
  children?: ReactNode;
  onClick: () => void;
}
