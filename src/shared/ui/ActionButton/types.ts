import type { ButtonProps } from '@chakra-ui/react';
import type { ElementType, ReactNode } from 'react';

export interface ActionButtonProps extends Omit<ButtonProps, 'size' | 'variant' | 'onClick'> {
  variant?: 'fill' | 'stroke';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  icon?: ElementType;
  children?: ReactNode;
  onClick: () => void;
}
