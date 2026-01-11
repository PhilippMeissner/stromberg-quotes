import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import RefreshTimer from '../components/RefreshTimer';

const mockUseIsMobile = vi.fn(() => false);

vi.mock('../hooks', () => ({
  useIsMobile: () => mockUseIsMobile(),
  useInterval: (callback: () => void, delay: number | null) => {
    const { useEffect, useRef } = require('react');
    const savedCallback = useRef(callback);
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      if (delay === null) return;
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }, [delay]);
  },
}));

describe('RefreshTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseIsMobile.mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should render the refresh button', () => {
    render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    expect(screen.getByRole('button', { name: /neues zitat laden/i })).toBeInTheDocument();
  });

  it('should call onRefresh when button is clicked', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('should render circular progress indicator', () => {
    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(2);
  });

  it('should render refresh icon', () => {
    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('should have correct aria-label', () => {
    render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    expect(screen.getByLabelText('Neues Zitat laden')).toBeInTheDocument();
  });
});

describe('RefreshTimer - Desktop behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseIsMobile.mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should auto-refresh after duration on desktop', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('should not auto-refresh when paused', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} isPaused={true} />);

    act(() => {
      vi.advanceTimersByTime(20000);
    });

    expect(onRefresh).not.toHaveBeenCalled();
  });

  it('should pause timer on hover', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    const button = screen.getByRole('button');

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    fireEvent.mouseEnter(button);

    act(() => {
      vi.advanceTimersByTime(20000);
    });

    expect(onRefresh).not.toHaveBeenCalled();
  });

  it('should resume timer on mouse leave', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(onRefresh).not.toHaveBeenCalled();

    fireEvent.mouseLeave(button);

    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('should apply hover styles on desktop', () => {
    render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const button = screen.getByRole('button');

    expect(button.className).toContain('hover:scale-110');
    expect(button.className).toContain('hover:opacity-80');
  });
});

describe('RefreshTimer - Mobile behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseIsMobile.mockReturnValue(true);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should not auto-refresh on mobile', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(onRefresh).not.toHaveBeenCalled();
  });

  it('should still allow manual refresh on mobile', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('should apply mobile styles', () => {
    render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const button = screen.getByRole('button');

    expect(button.className).toContain('active:opacity-80');
  });

  it('should not respond to hover events on mobile', () => {
    const onRefresh = vi.fn();

    render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    fireEvent.click(button);
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });
});

describe('RefreshTimer - Progress indicator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseIsMobile.mockReturnValue(false);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should have transition classes on progress circle when timer is active', () => {
    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1];

    expect(progressCircle.className.baseVal).toContain('transition-all');
    expect(progressCircle.className.baseVal).toContain('duration-1000');
  });

  it('should remove transition classes immediately when hovered for instant pause', () => {
    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const button = screen.getByRole('button');
    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1];

    expect(progressCircle.className.baseVal).toContain('transition-all');

    fireEvent.mouseEnter(button);

    expect(progressCircle.className.baseVal).not.toContain('transition-all');
  });

  it('should restore transition classes when mouse leaves', () => {
    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const button = screen.getByRole('button');
    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1];

    fireEvent.mouseEnter(button);
    expect(progressCircle.className.baseVal).not.toContain('transition-all');

    fireEvent.mouseLeave(button);
    expect(progressCircle.className.baseVal).toContain('transition-all');
  });

  it('should not have transition classes on mobile', () => {
    mockUseIsMobile.mockReturnValue(true);

    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const circles = container.querySelectorAll('circle');
    const progressCircle = circles[1];

    expect(progressCircle.className.baseVal).not.toContain('transition-all');
  });
});

describe('RefreshTimer - Mobile ping animation', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockUseIsMobile.mockReturnValue(true);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('should not have ping animation initially on mobile', () => {
    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    const pingElement = container.querySelector('.animate-ping-soft');

    expect(pingElement).not.toBeInTheDocument();
  });

  it('should add ping animation after delay on mobile', () => {
    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    const pingElement = container.querySelector('.animate-ping-soft');

    expect(pingElement).toBeInTheDocument();
  });

  it('should remove ping animation when manually refreshed', () => {
    const onRefresh = vi.fn();
    const { container } = render(<RefreshTimer duration={15} onRefresh={onRefresh} />);

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(container.querySelector('.animate-ping-soft')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));

    expect(container.querySelector('.animate-ping-soft')).not.toBeInTheDocument();
  });

  it('should not have ping animation on desktop', () => {
    mockUseIsMobile.mockReturnValue(false);

    const { container } = render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const pingElement = container.querySelector('.animate-ping-soft');

    expect(pingElement).not.toBeInTheDocument();
  });

  it('should keep button visible during ping animation', () => {
    render(<RefreshTimer duration={15} onRefresh={vi.fn()} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const button = screen.getByRole('button');

    expect(button).toBeVisible();
  });
});
