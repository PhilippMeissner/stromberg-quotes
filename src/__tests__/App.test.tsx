import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/app';

const mockQuoteResponse = {
  quote: 'Test quote',
  character: { name: 'Test Character' },
  episode: { season: 1, episode: 1 },
};

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockQuoteResponse),
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders without crashing', async () => {
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    );
    expect(container.querySelector('#app_root')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Test quote')).toBeTruthy();
    });
  });

  it('renders footer with navigation links', async () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Startseite')).toBeTruthy();
    expect(screen.getByText('Impressum')).toBeTruthy();
    expect(screen.getByText('Datenschutz')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('Test quote')).toBeTruthy();
    });
  });
});
