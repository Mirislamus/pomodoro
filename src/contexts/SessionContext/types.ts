import { ReactNode } from 'react';
import { Session } from '../../typings/types';

export interface SessionContextType {
  session: Session;
  setSession: <K extends keyof Session>(key: K, value: Session[K]) => void;
  resetSession: () => void;
}

export interface SessionProviderType {
  children: ReactNode;
}
