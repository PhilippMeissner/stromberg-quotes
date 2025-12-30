import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../components/Badge';

describe('Badge', () => {
  it('renders badge with dyve link', () => {
    render(<Badge />);
    expect(screen.getByText(/dyve/i)).toBeTruthy();
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('https://dyve.agency/de');
  });
});
