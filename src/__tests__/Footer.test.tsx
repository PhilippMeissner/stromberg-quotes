import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer', () => {
  const renderFooter = (initialRoute = '/') => {
    return render(
      <MemoryRouter
        initialEntries={[initialRoute]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Footer />
      </MemoryRouter>
    );
  };

  it('should render all navigation links', () => {
    renderFooter();

    expect(screen.getByText('Startseite')).toBeInTheDocument();
    expect(screen.getByText('Impressum')).toBeInTheDocument();
    expect(screen.getByText('Datenschutz')).toBeInTheDocument();
  });

  it('should have correct link hrefs', () => {
    renderFooter();

    expect(screen.getByRole('link', { name: 'Startseite' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Impressum' })).toHaveAttribute('href', '/impressum');
    expect(screen.getByRole('link', { name: 'Datenschutz' })).toHaveAttribute('href', '/datenschutz');
  });

  it('should apply bold style to active link', () => {
    renderFooter('/');

    const homeLink = screen.getByRole('link', { name: 'Startseite' });
    expect(homeLink).toHaveClass('font-bold');
  });

  it('should not apply bold style to inactive links', () => {
    renderFooter('/');

    const imprintLink = screen.getByRole('link', { name: 'Impressum' });
    const gdprLink = screen.getByRole('link', { name: 'Datenschutz' });

    expect(imprintLink).not.toHaveClass('font-bold');
    expect(gdprLink).not.toHaveClass('font-bold');
  });

  it('should highlight imprint link when on imprint page', () => {
    renderFooter('/impressum');

    const imprintLink = screen.getByRole('link', { name: 'Impressum' });
    expect(imprintLink).toHaveClass('font-bold');
  });
});
