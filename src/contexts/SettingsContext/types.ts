import { ReactNode } from 'react';

export type Settings = {
  count: number;
  duration: number;
  shortBreak: number;
  longBreak: number;
};

export interface SettingsContextType {
  settings: Settings;
  setSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

export interface SettingsProviderType {
  children: ReactNode;
}
