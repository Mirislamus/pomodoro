import { ReactNode } from 'react';
import { Stage } from '../../typings/enums';

export type Settings = {
  count: number;
  duration: number;
  shortBreak: number;
  longBreak: number;
};

export type Session = {
  sessionCount: number;
  pomodoroCurrentTime: number;
  shortBrakeCurrentTime: number;
  longBrakeCurrentTime: number;
  stage: Stage;
};

export interface SettingsContextType {
  settings: Settings;
  session: Session;
  setSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  setSession: <K extends keyof Session>(key: K, value: Session[K]) => void;
}

export interface SettingsProviderType {
  children: ReactNode;
}
