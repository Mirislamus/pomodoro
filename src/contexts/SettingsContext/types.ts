import { ReactNode } from 'react';
import { Settings } from '../../typings/types';

export interface SettingsContextType {
  settings: Settings;
  setSettings: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  resetSettings: () => void;
}

export interface SettingsProviderType {
  children: ReactNode;
}
