import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEventListener } from '../../hooks/useEventListener';

describe('useEventListener', () => {
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should add event listener on mount', () => {
    const handler = vi.fn();

    renderHook(() => useEventListener('resize', handler));

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), undefined);
  });

  it('should remove event listener on unmount', () => {
    const handler = vi.fn();

    const { unmount } = renderHook(() => useEventListener('resize', handler));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), undefined);
  });

  it('should call handler when event is dispatched', () => {
    const handler = vi.fn();

    renderHook(() => useEventListener('resize', handler));

    window.dispatchEvent(new Event('resize'));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should use latest handler without re-registering listener', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();

    const { rerender } = renderHook(
      ({ handler }) => useEventListener('resize', handler),
      { initialProps: { handler: handler1 } }
    );

    rerender({ handler: handler2 });

    window.dispatchEvent(new Event('resize'));

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenCalledTimes(1);
  });

  it('should pass options to addEventListener', () => {
    const handler = vi.fn();
    const options = { passive: true };

    renderHook(() => useEventListener('scroll', handler, options));

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), options);
  });
});
