import { useEffect, useRef } from 'react';

/**
 * Custom declarative interval execution hook, prevents stale state enclosures
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}\n