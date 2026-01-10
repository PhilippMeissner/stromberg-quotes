import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollToTop, useScrollToTopOnMount } from '../../hooks/useScrollToTop';

describe('useScrollToTop', () => {
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return a function that scrolls to top with default options', () => {
    const { result } = renderHook(() => useScrollToTop());

    act(() => {
      result.current();
    });

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should use custom options when provided', () => {
    const { result } = renderHook(() => useScrollToTop({ top: 100, behavior: 'instant' }));

    act(() => {
      result.current();
    });

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 100, behavior: 'instant' });
  });

  it('should return stable function reference', () => {
    const { result, rerender } = renderHook(() => useScrollToTop());

    const firstRef = result.current;

    rerender();

    expect(result.current).toBe(firstRef);
  });
});

describe('useScrollToTopOnMount', () => {
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should scroll to top on mount with default options', () => {
    renderHook(() => useScrollToTopOnMount());

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('should use custom options when provided', () => {
    renderHook(() => useScrollToTopOnMount({ top: 50, behavior: 'instant' }));

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 50, behavior: 'instant' });
  });

  it('should only scroll once on mount', () => {
    const { rerender } = renderHook(() => useScrollToTopOnMount());

    expect(scrollToSpy).toHaveBeenCalledTimes(1);

    rerender();

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
  });
});
