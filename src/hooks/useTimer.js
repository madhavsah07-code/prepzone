import { useState, useRef, useCallback } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
  }, [isRunning]);

  const pause = useCallback(() => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  }, []);

  return { time, isRunning, start, pause, reset };
};