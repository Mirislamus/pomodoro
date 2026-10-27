import type { ButtonProps } from '@chakra-ui/react';
import type { ElementType, MouseEvent, ReactNode } from 'react';

export interface ActionButtonProps extends Omit<ButtonProps, 'size' | 'variant' | 'onClick'> {
  variant?: 'fill' | 'stroke';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  icon?: ElementType;
  children?: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}
