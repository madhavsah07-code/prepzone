import { useState, useRef, useCallback, useEffect } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // 🔥 cleanup on unmount (IMPORTANT)
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const start = useCallback(() => {
    if (timerRef.current) return; // prevent multiple intervals

    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  }, []);

  const pause = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setTime(0);
  }, []);

  return { time, isRunning, start, pause, reset };
};

export default useTimer;