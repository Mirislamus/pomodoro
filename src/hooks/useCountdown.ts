import { useState, useEffect, useCallback, useRef } from 'react';
import { noop } from '../utils';

interface UseCountdownOptions {
  maxMilliseconds: number;
  /** Remaining time to resume from; `0` means the countdown starts from `maxMilliseconds`. */
  currentMilliseconds?: number;
  onStart?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
}

interface CountdownState {
  countdown: number;
  isPlaying: boolean;
  startTimer: (newMilliseconds?: number) => void;
  pauseTimer: () => void;
  resetTimer: (newMaxMs?: number) => void;
}

const TICK_INTERVAL = 200;

const useCountdown = ({
  maxMilliseconds,
  currentMilliseconds = maxMilliseconds,
  onStart = noop,
  onPause = noop,
  onComplete = noop,
}: UseCountdownOptions): CountdownState => {
  const resumeFrom = currentMilliseconds > 0 ? currentMilliseconds : maxMilliseconds;
  const [countdown, setCountdown] = useState<number>(resumeFrom);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // The countdown is derived from a wall-clock deadline, so throttled background tabs stay accurate
  const endTimeRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Follow external changes (stage switch, new durations) while idle.
  // `isPlaying` is intentionally not a dependency: pausing must keep the current countdown.
  useEffect(() => {
    if (!isPlaying) {
      setCountdown(resumeFrom);
    }
  }, [resumeFrom]);

  const startTimer = useCallback(
    (newMilliseconds?: number) => {
      const milliseconds = newMilliseconds ?? countdown;
      if (newMilliseconds !== undefined) {
        setCountdown(newMilliseconds);
      }
      endTimeRef.current = Date.now() + milliseconds;
      setIsPlaying(true);
      onStart();
    },
    [countdown, onStart]
  );

  const pauseTimer = useCallback(() => {
    setIsPlaying(false);
    onPause();
  }, [onPause]);

  const resetTimer = useCallback(
    (newMaxMs?: number) => {
      setCountdown(newMaxMs ?? maxMilliseconds);
      setIsPlaying(false);
    },
    [maxMilliseconds]
  );

  useEffect(() => {
    if (!isPlaying) return;

    const tick = () => {
      const remaining = Math.max(endTimeRef.current - Date.now(), 0);
      setCountdown(remaining);

      if (remaining <= 0) {
        setIsPlaying(false);
        onCompleteRef.current();
      }
    };

    const intervalId = setInterval(tick, TICK_INTERVAL);

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
  };
};

export default useCountdown;
