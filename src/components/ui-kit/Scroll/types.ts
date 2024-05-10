import { ReactNode } from 'react';

export interface ScrollProps {
  children: ReactNode;
  maxScrollHeight?: string | number | object;
  hasScrollOffset?: boolean;
}
