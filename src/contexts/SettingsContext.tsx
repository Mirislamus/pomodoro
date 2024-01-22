import { createContext, useContext, useState, useEffect, FC, Dispatch, SetStateAction, ReactNode } from 'react';
import useGetLocalStorage from '../hooks/useGetLocalStorage';
import useSetLocalStorage from '../hooks/useSetLocalStorage';
import { Stage } from '../typings/enums';

interface SettingsContextType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: Dispatch<SetStateAction<number>>;
  longBreak: number;
  setLongBreak: Dispatch<SetStateAction<number>>;
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
}

interface SettingsProviderType {
  children: ReactNode;
}

const SettingsContext = createContext<SettingsContextType>({
  count: 5,
  setCount: () => {},
  duration: 25,
  setDuration: () => {},
  shortBreak: 5,
  setShortBreak: () => {},
  longBreak: 20,
  setLongBreak: () => {},
  stage: Stage.Pomodoro,
  setStage: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: FC<SettingsProviderType> = ({ children }) => {
  const initialCount = useGetLocalStorage<number>('count', 5);
  const initialDuration = useGetLocalStorage<number>('duration', 25);
  const initialShortBreak = useGetLocalStorage<number>('shortBreak', 5);
  const initialLongBreak = useGetLocalStorage<number>('longBreak', 20);
  const initialStage = useGetLocalStorage<Stage>('stage', Stage.Pomodoro);

  const [count, setCount] = useState(initialCount);
  const [duration, setDuration] = useState(initialDuration);
  const [shortBreak, setShortBreak] = useState(initialShortBreak);
  const [longBreak, setLongBreak] = useState(initialLongBreak);
  const [stage, setStage] = useState(initialStage);

  const setLocalStorage = useSetLocalStorage();

  useEffect(() => {
    setLocalStorage('count', count);
    setLocalStorage('duration', duration);
    setLocalStorage('shortBreak', shortBreak);
    setLocalStorage('longBreak', longBreak);
    setLocalStorage('stage', stage);
  }, [count, duration, shortBreak, longBreak, stage, setLocalStorage]);

  return (
    <SettingsContext.Provider
      value={{
        count,
        setCount,
        duration,
        setDuration,
        shortBreak,
        setShortBreak,
        longBreak,
        setLongBreak,
        stage,
        setStage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
