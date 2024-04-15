import { useState, useEffect, useCallback } from 'react';
import { noop } from '../utils/noop';

interface UseCountdownOptions {
  milliseconds: number;
  isPlaying?: boolean;
  onComplete?: () => void;
  onPlaying?: () => void;
}

interface CountdownState {
  countdown: number;
  percentElapsed: number;
  isPlaying: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

const useCountdown = (options: UseCountdownOptions): CountdownState => {
  const { milliseconds, onComplete = noop, onPlaying = noop } = options;
  const [endTime, setEndTime] = useState<number>(Date.now() + milliseconds);
  const [isPlaying, setIsPlaying] = useState<boolean>(options.isPlaying ?? false);

  const getRemainingTime = (): number => {
    const now = Date.now();
    return Math.max(endTime - now, 0);
  };

  const [countdown, setCountdown] = useState<number>(getRemainingTime());
  const [percentElapsed, setPercentElapsed] = useState<number>(0);

  const updatePercentElapsed = (): void => {
    const elapsed = milliseconds - getRemainingTime();
    setPercentElapsed((elapsed / milliseconds) * 100);
  };

  const startTimer = useCallback(() => {
    setEndTime(Date.now() + milliseconds);
    setIsPlaying(true);
    if (onPlaying) {
      onPlaying();
    }
  }, [milliseconds, onPlaying]);

  const stopTimer = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resetTimer = useCallback(() => {
    setEndTime(Date.now() + milliseconds);
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
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, milliseconds, endTime, onComplete]);

  return {
    countdown,
    percentElapsed,
    isPlaying,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useCountdown;
