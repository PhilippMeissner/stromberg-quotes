import { useEffect, useRef } from 'react';

/**
 * Hook for managing intervals with automatic cleanup
 * Pass null as delay to pause the interval
 */
export const useInterval = (callback: () => void, delay: number | null): void => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return;
    }

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);

    return () => clearInterval(id);
  }, [delay]);
};
