import { createContext, useContext, useState, useEffect, FC, ReactNode } from 'react';
import useGetLocalStorage from '../hooks/useGetLocalStorage';
import useSetLocalStorage from '../hooks/useSetLocalStorage';
import { Stage } from '../typings/enums';

const defaultSettings = {
  count: 5,
  duration: 25,
  shortBreak: 5,
  longBreak: 20,
  stage: Stage.Pomodoro,
};

const defaultSession = {
  sessionCount: 0,
  shortBrakeCount: 0,
  longBrakeCount: 0,
};

interface Settings {
  count: number;
  duration: number;
  shortBreak: number;
  longBreak: number;
  stage: Stage;
}

interface Session {
  sessionCount: number;
  shortBrakeCount: number;
  longBrakeCount: number;
}

interface SettingsContextType {
  settings: Settings;
  session: Session;
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  updateSession: <K extends keyof Session>(key: K, value: Session[K]) => void;
}

interface SettingsProviderType {
  children: ReactNode;
}

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

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
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
    <SettingsContext.Provider value={{ settings, session, updateSetting, updateSession }}>
      {children}
    </SettingsContext.Provider>
  );
};
