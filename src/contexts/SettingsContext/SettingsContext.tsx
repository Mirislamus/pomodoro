import { createContext, useContext, useState, useEffect, FC } from 'react';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import { SettingsContextType, SettingsProviderType } from './types';
import { defaultSettings } from '../../consts/settings';
import { Settings } from '../../typings/types';

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
    hasAutoStart: useGetLocalStorage<boolean>('hasAutoStart', defaultSettings.hasAutoStart),
    alarmSound: useGetLocalStorage<Settings['alarmSound']>(
      'alarmSound',
      defaultSettings.alarmSound
    ),
  });

  const setLocalStorage = useSetLocalStorage();

  const updateSettings = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setLocalStorage(key, value);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    Object.entries(defaultSettings).forEach(([key, value]) => {
      setLocalStorage(key, value);
    });
  };

  useEffect(() => {
    Object.entries(settings).forEach(([key, value]) => {
      setLocalStorage(key, value);
    });
  }, [settings, setLocalStorage]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings: updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
