import { createContext, useContext, useState, useEffect, FC } from 'react';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import { Settings, SettingsContextType, SettingsProviderType } from './types';

const defaultSettings: Settings = {
  count: 5,
  duration: 0.3 * (60 * 1000),
  shortBreak: 0.1 * (60 * 1000),
  longBreak: 0.2 * (60 * 1000),
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: FC<SettingsProviderType> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    count: useGetLocalStorage<number>('count', defaultSettings.count),
    duration: useGetLocalStorage<number>('duration', defaultSettings.duration),
    shortBreak: useGetLocalStorage<number>('shortBreak', defaultSettings.shortBreak),
    longBreak: useGetLocalStorage<number>('longBreak', defaultSettings.longBreak),
  });

  const setLocalStorage = useSetLocalStorage();

  const updateSettings = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setLocalStorage(key, value);
  };

  useEffect(() => {
    Object.entries(settings).forEach(([key, value]) => {
      setLocalStorage(key, value);
    });
  }, [settings, setLocalStorage]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings: updateSettings }}>{children}</SettingsContext.Provider>
  );
};
