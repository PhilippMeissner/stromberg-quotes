import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import CircularProgress from '../../icons/CircularProgress';

describe('CircularProgress', () => {
  it('renders an SVG element', () => {
    const { container } = render(<CircularProgress progress={50} />);
    const svg = container.querySelector('svg');

    expect(svg).toBeTruthy();
  });

  it('renders two circles (background and progress)', () => {
    const { container } = render(<CircularProgress progress={50} />);
    const circles = container.querySelectorAll('circle');

    expect(circles).toHaveLength(2);
  });

  it('applies default className', () => {
    const { container } = render(<CircularProgress progress={50} />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('class')).toContain('w-16 h-16');
  });

  it('applies custom className', () => {
    const { container } = render(<CircularProgress progress={50} className="w-20 h-20" />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('class')).toContain('w-20 h-20');
  });

  it('applies transition class when isAnimating is true', () => {
    const { container } = render(<CircularProgress progress={50} isAnimating={true} />);
    const progressCircle = container.querySelectorAll('circle')[1];

    expect(progressCircle?.getAttribute('class')).toContain('transition-all');
  });

  it('does not apply transition class when isAnimating is false', () => {
    const { container } = render(<CircularProgress progress={50} isAnimating={false} />);
    const progressCircle = container.querySelectorAll('circle')[1];

    expect(progressCircle?.getAttribute('class')).toBe('');
  });

  it('calculates correct strokeDashoffset for 0% progress', () => {
    const { container } = render(<CircularProgress progress={0} />);
    const progressCircle = container.querySelectorAll('circle')[1];
    const circumference = 2 * Math.PI * 45;

    expect(progressCircle?.getAttribute('stroke-dashoffset')).toBe(circumference.toString());
  });

  it('calculates correct strokeDashoffset for 100% progress', () => {
    const { container } = render(<CircularProgress progress={100} />);
    const progressCircle = container.querySelectorAll('circle')[1];

    expect(progressCircle?.getAttribute('stroke-dashoffset')).toBe('0');
  });

  it('calculates correct strokeDashoffset for 50% progress', () => {
    const { container } = render(<CircularProgress progress={50} />);
    const progressCircle = container.querySelectorAll('circle')[1];
    const circumference = 2 * Math.PI * 45;
    const expectedOffset = circumference / 2;

    expect(progressCircle?.getAttribute('stroke-dashoffset')).toBe(expectedOffset.toString());
  });
});
