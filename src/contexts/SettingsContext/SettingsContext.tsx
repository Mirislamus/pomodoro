import { createContext, useContext, useState, useEffect, FC } from 'react';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import { Stage } from '../../typings/enums';
import { Session, Settings, SettingsContextType, SettingsProviderType } from './types';

const defaultSettings = {
  count: 5,
  duration: 25 * (60 * 1000),
  shortBreak: 5 * (60 * 1000),
  longBreak: 20 * (60 * 1000),
  stage: Stage.Pomodoro,
};

const defaultSession = {
  sessionCount: 0,
  shortBrakeCount: 0,
  longBrakeCount: 0,
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
    stage: useGetLocalStorage<Stage>('stage', defaultSettings.stage),
  });

  const [session, setSession] = useState<Session>(defaultSession);

  const setLocalStorage = useSetLocalStorage();

  const updateSettings = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setLocalStorage(key, value);
  };

  const updateSession = <K extends keyof Session>(key: K, value: Session[K]) => {
    setSession(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    Object.entries(settings).forEach(([key, value]) => {
      setLocalStorage(key, value);
    });
  }, [settings, setLocalStorage]);

  return (
    <SettingsContext.Provider value={{ settings, session, setSettings: updateSettings, setSession: updateSession }}>
      {children}
    </SettingsContext.Provider>
  );
};
