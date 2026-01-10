import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsMobile } from '../../hooks/useIsMobile';

describe('useIsMobile', () => {
  const originalMatchMedia = window.matchMedia;
  const originalOntouchstart = 'ontouchstart' in window;
  const originalMaxTouchPoints = navigator.maxTouchPoints;

  let matchMediaMock: ReturnType<typeof vi.fn>;
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
    Object.defineProperty(window, 'ontouchstart', { value: originalOntouchstart, writable: true });
    Object.defineProperty(navigator, 'maxTouchPoints', { value: originalMaxTouchPoints, writable: true });
  });

  it('should return false for desktop devices', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, writable: true });
    matchMediaMock.mockImplementation(() => ({ matches: false }));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('should return true for touch devices with small screens', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 1, writable: true });
    matchMediaMock.mockImplementation(() => ({ matches: true }));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });

  it('should return false for touch devices with large screens', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 1, writable: true });
    matchMediaMock.mockImplementation(() => ({ matches: false }));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);
  });

  it('should listen to resize events', () => {
    renderHook(() => useIsMobile());

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function), undefined);
  });

  it('should update when window is resized', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 1, writable: true });
    matchMediaMock.mockImplementation(() => ({ matches: false }));

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    matchMediaMock.mockImplementation(() => ({ matches: true }));

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(true);
  });

  it('should respect custom maxWidth option', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 1, writable: true });
    matchMediaMock.mockImplementation((query: string) => ({
      matches: query.includes('480px'),
    }));

    const { result } = renderHook(() => useIsMobile({ maxWidth: 480 }));

    expect(matchMediaMock).toHaveBeenCalledWith('(max-width: 480px)');
    expect(result.current).toBe(true);
  });

  it('should work without touch requirement when requireTouch is false', () => {
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 0, writable: true });
    matchMediaMock.mockImplementation(() => ({ matches: true }));

    const { result } = renderHook(() => useIsMobile({ requireTouch: false }));

    expect(result.current).toBe(true);
  });
});
