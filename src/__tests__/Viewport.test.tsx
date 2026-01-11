import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Viewport from '../components/Viewport';

describe('Viewport', () => {
  it('renders all breakpoint labels', () => {
    render(<Viewport />);

    expect(screen.getByText('base')).toBeTruthy();
    expect(screen.getByText('sm')).toBeTruthy();
    expect(screen.getByText('md')).toBeTruthy();
    expect(screen.getByText('lg')).toBeTruthy();
    expect(screen.getByText('xl')).toBeTruthy();
    expect(screen.getByText('2xl')).toBeTruthy();
  });
});
