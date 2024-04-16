import { useState, useEffect, useCallback } from 'react';
import { noop } from '../utils/noop';

interface UseCountdownOptions {
  milliseconds: number;
  onComplete?: () => void;
  onPlaying?: () => void;
}

interface CountdownState {
  countdown: number;
  percentElapsed: number;
  isPlaying: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

const useCountdown = (options: UseCountdownOptions): CountdownState => {
  const { milliseconds, onComplete = noop, onPlaying = noop } = options;
  const [endTime, setEndTime] = useState<number>(Date.now() + milliseconds + 100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const getRemainingTime = (): number => {
    const now = Date.now();
    return Math.max(endTime - now, 0);
  };

  const [countdown, setCountdown] = useState<number>(getRemainingTime());
  const [percentElapsed, setPercentElapsed] = useState<number>(0);

  const updatePercentElapsed = (): void => {
    const elapsed = milliseconds - countdown;
    setPercentElapsed((elapsed / milliseconds) * 100);
  };

  const startTimer = useCallback(() => {
    setEndTime(Date.now() + countdown);
    setIsPlaying(true);
    onPlaying();
  }, [countdown, onPlaying]);

  const pauseTimer = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resetTimer = useCallback(() => {
    setEndTime(Date.now() + milliseconds + 100);
    setCountdown(milliseconds);
    setPercentElapsed(0);
    setIsPlaying(false);
  }, [milliseconds]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const intervalId = setInterval(() => {
      const remaining = getRemainingTime();
      setCountdown(remaining);
      updatePercentElapsed();

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
    percentElapsed,
    isPlaying,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};

export default useCountdown;
