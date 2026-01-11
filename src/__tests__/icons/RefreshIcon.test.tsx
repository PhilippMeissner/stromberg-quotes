import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import RefreshIcon from '../../icons/RefreshIcon';

describe('RefreshIcon', () => {
  it('renders an SVG element', () => {
    const { container } = render(<RefreshIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeTruthy();
  });

  it('applies default className', () => {
    const { container } = render(<RefreshIcon />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('class')).toBe('w-6 h-6');
  });

  it('applies custom className', () => {
    const { container } = render(<RefreshIcon className="w-8 h-8 text-blue-500" />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('class')).toBe('w-8 h-8 text-blue-500');
  });

  it('has correct viewBox', () => {
    const { container } = render(<RefreshIcon />);
    const svg = container.querySelector('svg');

    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
  });
});
