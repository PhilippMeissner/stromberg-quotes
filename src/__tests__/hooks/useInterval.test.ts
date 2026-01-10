import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInterval } from '../../hooks/useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call callback at specified interval', () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should not call callback when delay is null', () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, null));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should pause and resume when delay changes', () => {
    const callback = vi.fn();

    const { rerender } = renderHook(
      ({ delay }) => useInterval(callback, delay),
      { initialProps: { delay: 1000 as number | null } }
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: null });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    rerender({ delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should cleanup interval on unmount', () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useInterval(callback, 1000));

    act(() => {
      vi.advanceTimersByTime(500);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should use latest callback without resetting interval', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(
      ({ callback }) => useInterval(callback, 1000),
      { initialProps: { callback: callback1 } }
    );

    act(() => {
      vi.advanceTimersByTime(500);
    });

    rerender({ callback: callback2 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
