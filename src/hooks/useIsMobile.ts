import { useState, useCallback } from 'react';
import { useEventListener } from './useEventListener';

interface MobileDetectionOptions {
  maxWidth?: number;
  requireTouch?: boolean;
}

const defaultOptions: MobileDetectionOptions = {
  maxWidth: 768,
  requireTouch: true,
};

/**
 * Hook to detect if the current device is mobile
 * By default, requires both touch capability and small screen
 */
export const useIsMobile = (options: MobileDetectionOptions = defaultOptions): boolean => {
  const { maxWidth = 768, requireTouch = true } = options;

  const checkMobile = useCallback((): boolean => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = typeof window.matchMedia === 'function'
      ? window.matchMedia(`(max-width: ${maxWidth}px)`).matches
      : false;

    return requireTouch ? (isTouchDevice && isSmallScreen) : isSmallScreen;
  }, [maxWidth, requireTouch]);

  const [isMobile, setIsMobile] = useState(checkMobile);

  useEventListener('resize', () => {
    setIsMobile(checkMobile());
  });

  return isMobile;
};
