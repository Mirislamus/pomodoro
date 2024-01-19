import { createContext, useContext, useState, useEffect, FC, Dispatch, SetStateAction, ReactNode } from 'react';
import useGetLocalStorage from '../hooks/useGetLocalStorage';
import useSetLocalStorage from '../hooks/useSetLocalStorage';

interface SettingsContextType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  duration: number;
  setDuration: Dispatch<SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: Dispatch<SetStateAction<number>>;
  longBreak: number;
  setLongBreak: Dispatch<SetStateAction<number>>;
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
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider: FC<SettingsProviderType> = ({ children }) => {
  const initialCount = useGetLocalStorage<number>('count', 5);
  const initialDuration = useGetLocalStorage<number>('duration', 25);
  const initialShortBreak = useGetLocalStorage<number>('shortBreak', 5);
  const initialLongBreak = useGetLocalStorage<number>('longBreak', 20);

  const [count, setCount] = useState(initialCount);
  const [duration, setDuration] = useState(initialDuration);
  const [shortBreak, setShortBreak] = useState(initialShortBreak);
  const [longBreak, setLongBreak] = useState(initialLongBreak);

  const setLocalStorage = useSetLocalStorage();

  useEffect(() => {
    setLocalStorage('count', count);
    setLocalStorage('duration', duration);
    setLocalStorage('shortBreak', shortBreak);
    setLocalStorage('longBreak', longBreak);
  }, [count, duration, shortBreak, longBreak, useSetLocalStorage]);

  return (
    <SettingsContext.Provider
      value={{ count, setCount, duration, setDuration, shortBreak, setShortBreak, longBreak, setLongBreak }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
