import { useState, useEffect, useCallback, useRef } from 'react';
import { noop } from '../utils';

interface UseCountdownOptions {
  maxMilliseconds: number;
  currentMilliseconds?: number;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
}

interface CountdownState {
  countdown: number;
  isPlaying: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: (newMaxMs?: number) => void;
  setCountdown: (val: number) => void;
}

const useCountdown = (options: UseCountdownOptions): CountdownState => {
  const {
    maxMilliseconds,
    currentMilliseconds = maxMilliseconds,
    onStart = noop,
    onPause = noop,
    onReset = noop,
    onComplete = noop,
    onTick = noop,
  } = options;

  const initialTime = currentMilliseconds > 0 ? currentMilliseconds : maxMilliseconds;
  const [countdown, setCountdownState] = useState<number>(initialTime);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const endTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  // Sync internal countdown when currentMilliseconds prop changes externally (e.g. stage change)
  useEffect(() => {
    if (!isPlaying) {
      setCountdownState(currentMilliseconds > 0 ? currentMilliseconds : maxMilliseconds);
    }
  }, [currentMilliseconds, maxMilliseconds]);

  const startTimer = useCallback(() => {
    endTimeRef.current = Date.now() + countdown;
    setIsPlaying(true);
    onStart();
  }, [countdown, onStart]);

  const pauseTimer = useCallback(() => {
    setIsPlaying(false);
    onPause();
  }, [onPause]);

  const resetTimer = useCallback((newMaxMs?: number) => {
    const ms = newMaxMs !== undefined ? newMaxMs : maxMilliseconds;
    setCountdownState(ms);
    setIsPlaying(false);
    onReset();
  }, [maxMilliseconds, onReset]);

  useEffect(() => {
    if (!isPlaying) return;

    const tick = () => {
      const remaining = Math.max(endTimeRef.current - Date.now(), 0);
      setCountdownState(remaining);
      onTickRef.current(remaining);

      if (remaining <= 0) {
        setIsPlaying(false);
        onCompleteRef.current();
      }
    };

    const intervalId = setInterval(tick, 200);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        tick();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  return {
    countdown,
    isPlaying,
    startTimer,
    pauseTimer,
    resetTimer,
    setCountdown: setCountdownState,
  };
};

export default useCountdown;
