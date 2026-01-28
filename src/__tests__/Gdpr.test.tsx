import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Gdpr from '../components/Gdpr';

vi.mock('../hooks', () => ({
  useScrollToTopOnMount: vi.fn(),
  useDocumentTitle: vi.fn(),
}));

describe('Gdpr', () => {
  it('should render the privacy policy heading', () => {
    render(<Gdpr />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render section headings', () => {
    render(<Gdpr />);

    expect(screen.getByRole('heading', { name: /2\. Hosting/i })).toBeInTheDocument();
  });

  it('should render contact information', () => {
    render(<Gdpr />);

    expect(screen.getByText(/24118 Kiel/)).toBeInTheDocument();
  });

  it('should render Vercel hosting information', () => {
    render(<Gdpr />);

    expect(screen.getByText(/vercel\.com/i)).toBeInTheDocument();
  });

  it('should render e-recht24 source link', () => {
    render(<Gdpr />);

    const sourceLink = screen.getByRole('link', { name: /e-recht24\.de/i });
    expect(sourceLink).toHaveAttribute('href', 'https://www.e-recht24.de');
  });
});
