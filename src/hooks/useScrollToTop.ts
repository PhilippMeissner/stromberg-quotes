import { useEffect, useCallback } from 'react';

interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  top?: number;
}

const defaultOptions: ScrollToTopOptions = {
  behavior: 'smooth',
  top: 0,
};

/**
 * Hook that scrolls to top on mount
 */
export const useScrollToTopOnMount = (options: ScrollToTopOptions = defaultOptions): void => {
  useEffect(() => {
    window.scrollTo({ top: options.top ?? 0, behavior: options.behavior ?? 'smooth' });
  }, []);
};

/**
 * Hook that returns a function to scroll to top
 */
export const useScrollToTop = (options: ScrollToTopOptions = defaultOptions): (() => void) => {
  return useCallback(() => {
    window.scrollTo({ top: options.top ?? 0, behavior: options.behavior ?? 'smooth' });
  }, [options.top, options.behavior]);
};
