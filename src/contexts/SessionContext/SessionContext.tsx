import { createContext, useContext, useState, useEffect, FC } from 'react';
import useGetLocalStorage from '../../hooks/useGetLocalStorage';
import useSetLocalStorage from '../../hooks/useSetLocalStorage';
import { Stage } from '../../typings/enums';
import { SessionContextType, SessionProviderType } from './types';
import { Session } from '../../typings/types';

const defaultSession: Session = {
  sessionCount: 1,
  stage: Stage.Pomodoro,
  pomodoroCurrentTime: 0,
  shortBrakeCurrentTime: 0,
  longBrakeCurrentTime: 0,
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider: FC<SessionProviderType> = ({ children }) => {
  const [session, setSession] = useState<Session>({
    sessionCount: useGetLocalStorage<number>('sessionCount', defaultSession.sessionCount),
    stage: useGetLocalStorage<Stage>('stage', defaultSession.stage),
    pomodoroCurrentTime: useGetLocalStorage<number>(
      'pomodoroCurrentTime',
      defaultSession.pomodoroCurrentTime
    ),
    shortBrakeCurrentTime: useGetLocalStorage<number>(
      'shortBrakeCurrentTime',
      defaultSession.shortBrakeCurrentTime
    ),
    longBrakeCurrentTime: useGetLocalStorage<number>(
      'longBrakeCurrentTime',
      defaultSession.longBrakeCurrentTime
    ),
  });

  const setLocalStorage = useSetLocalStorage();

  const updateSession = <K extends keyof Session>(key: K, value: Session[K]) => {
    setSession(prev => ({ ...prev, [key]: value }));
  };

  const resetSession = () => {
    setSession(defaultSession);
    Object.entries(defaultSession).forEach(([key, value]) => {
      setLocalStorage(key, value);
    });
  };

  useEffect(() => {
    Object.entries(session).forEach(([key, value]) => {
      setLocalStorage(key, value);
    });
  }, [session, setLocalStorage]);

  return (
    <SessionContext.Provider value={{ session, setSession: updateSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  );
};
