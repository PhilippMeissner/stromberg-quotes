import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Imprint from '../components/Imprint';

vi.mock('../hooks', () => ({
  useScrollToTopOnMount: vi.fn(),
}));

describe('Imprint', () => {
  it('should render the imprint heading', () => {
    render(<Imprint />);

    expect(screen.getByRole('heading', { name: /impressum/i })).toBeInTheDocument();
  });

  it('should render contact information', () => {
    render(<Imprint />);

    expect(screen.getByText(/24118 Kiel/)).toBeInTheDocument();
  });

  it('should render email contact', () => {
    render(<Imprint />);

    expect(screen.getByText(/admin@philippmeissner.dev/i)).toBeInTheDocument();
  });

  it('should render GitHub link', () => {
    render(<Imprint />);

    const githubLink = screen.getByRole('link', { name: /github\.com\/philippmeissner/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/philippmeissner');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'nofollow noopener noreferrer');
  });

  it('should render API attribution link', () => {
    render(<Imprint />);

    const apiLink = screen.getByRole('link', { name: /stromberg-api\.de\/impressum/i });
    expect(apiLink).toHaveAttribute('href', 'https://stromberg-api.de/Impressum');
  });
});
