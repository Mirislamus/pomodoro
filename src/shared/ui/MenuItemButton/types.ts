import { MouseEvent, ReactNode } from 'react';

export interface MenuItemButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}
