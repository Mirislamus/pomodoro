import { useState, useEffect, useCallback } from 'react';

const useCountdown = (milliseconds: number) => {
  const [endTime, setEndTime] = useState(Date.now() + milliseconds);
  const [isActive, setIsActive] = useState(false);

  const getRemainingTime = () => {
    const now = Date.now();
    return Math.max(endTime - now, 0);
  };

  const [countdown, setCountdown] = useState(getRemainingTime());
  const [percentElapsed, setPercentElapsed] = useState(0);

  const updatePercentElapsed = () => {
    const elapsed = milliseconds - getRemainingTime();
    setPercentElapsed((elapsed / milliseconds) * 100);
  };

  const startTimer = useCallback(() => {
    setEndTime(Date.now() + milliseconds);
    setIsActive(true);
  }, [milliseconds]);

  useEffect(() => {
    if (!isActive) {
      setCountdown(milliseconds);
      setPercentElapsed(0);
      return;
    }

    const intervalId = setInterval(() => {
      const remaining = getRemainingTime();
      setCountdown(remaining);
      updatePercentElapsed();

      if (remaining <= 0) {
        clearInterval(intervalId);
        setIsActive(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, milliseconds, endTime]);

  return { countdown, percentElapsed, startTimer };
};

export default useCountdown;
