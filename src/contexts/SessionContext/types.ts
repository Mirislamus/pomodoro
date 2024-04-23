import { ReactNode } from 'react';
import { Stage } from '../../typings/enums';

export type Session = {
  sessionCount: number;
  pomodoroCurrentTime: number;
  shortBrakeCurrentTime: number;
  longBrakeCurrentTime: number;
  stage: Stage;
};

export interface SessionContextType {
  session: Session;
  setSession: <K extends keyof Session>(key: K, value: Session[K]) => void;
  resetSession: () => void;
}

export interface SessionProviderType {
  children: ReactNode;
}
