import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ArrowUpIcon from '../../icons/ArrowUpIcon';

describe('ArrowUpIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<ArrowUpIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeTruthy();
  });

  it('applies default className', () => {
    const { container } = render(<ArrowUpIcon />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('class')).toBe('h-6 w-6');
  });

  it('applies custom className', () => {
    const { container } = render(<ArrowUpIcon className="h-8 w-8 text-red-500" />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('class')).toBe('h-8 w-8 text-red-500');
  });

  it('has correct viewBox', () => {
    const { container } = render(<ArrowUpIcon />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('viewBox')).toBe('0 0 20 20');
  });
});
