import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

describe('useDocumentTitle', () => {
  const originalTitle = document.title;

  beforeEach(() => {
    document.title = 'Initial Title';
  });

  afterEach(() => {
    document.title = originalTitle;
  });

  it('sets base title when no title is provided', () => {
    renderHook(() => useDocumentTitle());

    expect(document.title).toBe('Stromberg Zitate');
  });

  it('sets title with suffix when title is provided', () => {
    renderHook(() => useDocumentTitle('Impressum'));

    expect(document.title).toBe('Impressum | Stromberg Zitate');
  });

  it('resets to base title on unmount', () => {
    const { unmount } = renderHook(() => useDocumentTitle('Datenschutz'));

    expect(document.title).toBe('Datenschutz | Stromberg Zitate');

    unmount();

    expect(document.title).toBe('Stromberg Zitate');
  });

  it('updates title when title prop changes', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'First' },
    });

    expect(document.title).toBe('First | Stromberg Zitate');

    rerender({ title: 'Second' });

    expect(document.title).toBe('Second | Stromberg Zitate');
  });

  it('handles undefined title after having a title', () => {
    const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
      initialProps: { title: 'Some Title' as string | undefined },
    });

    expect(document.title).toBe('Some Title | Stromberg Zitate');

    rerender({ title: undefined });

    expect(document.title).toBe('Stromberg Zitate');
  });
});
