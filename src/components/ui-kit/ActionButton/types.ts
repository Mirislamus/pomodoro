import { Icon } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ActionButtonProps {
  variant?: 'fill' | 'stroke';
  isDisabled?: boolean;
  icon?: typeof Icon;
  children?: ReactNode;
  onClick: () => void;
}
