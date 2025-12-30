import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/app';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(container.querySelector('#app_root')).toBeTruthy();
  });

  it('renders footer with navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Startseite')).toBeTruthy();
    expect(screen.getByText('Impressum')).toBeTruthy();
    expect(screen.getByText('Datenschutz')).toBeTruthy();
  });
});
