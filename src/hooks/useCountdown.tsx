import { useState, useEffect, useCallback } from 'react';
import { noop } from '../utils';

interface UseCountdownOptions {
  maxMilliseconds: number;
  currentMilliseconds?: number;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onComplete?: () => void;
}

interface CountdownState {
  countdown: number;
  isPlaying: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const useCountdown = (options: UseCountdownOptions): CountdownState => {
  const {
    maxMilliseconds,
    currentMilliseconds = maxMilliseconds,
    onStart = noop,
    onPause = noop,
    onReset = noop,
    onComplete = noop,
  } = options;

  const initialTime = currentMilliseconds > 0 ? currentMilliseconds : maxMilliseconds;
  const [endTime, setEndTime] = useState<number>(Date.now() + initialTime + 100);
  const [countdown, setCountdown] = useState<number>(initialTime);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    setEndTime(Date.now() + countdown + 100);
  }, [currentMilliseconds]);

  const getRemainingTime = (): number => {
    const now = Date.now();
    return Math.max(endTime - now, 0);
  };

  const startTimer = useCallback(() => {
    setEndTime(Date.now() + countdown);
    setIsPlaying(true);
    onStart();
  }, [countdown, onStart]);

  const pauseTimer = useCallback(() => {
    setIsPlaying(false);
    onPause();
  }, [onPause]);

  const resetTimer = useCallback(() => {
    setEndTime(Date.now() + maxMilliseconds + 100);
    setCountdown(maxMilliseconds);
    setIsPlaying(false);
    onReset();
  }, [maxMilliseconds, onReset]);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      const remaining = getRemainingTime();
      setCountdown(remaining);

      if (remaining <= 0) {
        clearInterval(intervalId);
        setIsPlaying(false);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, endTime, onComplete]);

  return {
    countdown,
    isPlaying,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useCountdown;
