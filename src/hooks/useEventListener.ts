import { useEffect, useRef } from 'react';

type EventHandler<K extends keyof WindowEventMap> = (event: WindowEventMap[K]) => void;

/**
 * Hook for managing window event listeners with automatic cleanup
 */
export const useEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: EventHandler<K>,
  options?: boolean | AddEventListenerOptions
): void => {
  const savedHandler = useRef<EventHandler<K>>(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: WindowEventMap[K]) => savedHandler.current(event);

    window.addEventListener(eventName, eventListener, options);

    return () => {
      window.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, options]);
};
