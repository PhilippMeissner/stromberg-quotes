import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Quote from '../components/Quote';

const mockQuoteResponse = {
  quote: 'Das Leben ist kein Ponyhof.',
  character: { name: 'Bernd Stromberg' },
  episode: { season: 2, episode: 5 },
};

vi.mock('../hooks', () => ({
  useScrollToTopOnMount: vi.fn(),
  useIsMobile: vi.fn(() => false),
  useInterval: vi.fn(),
}));

describe('Quote', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(mockQuoteResponse),
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render loading skeleton initially', () => {
    render(<Quote />);

    expect(screen.getByTestId('quote-skeleton')).toBeInTheDocument();
  });

  it('should fetch and display quote', async () => {
    render(<Quote />);

    await waitFor(() => {
      expect(screen.getByText('Das Leben ist kein Ponyhof.')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display author name', async () => {
    render(<Quote />);

    await waitFor(() => {
      expect(screen.getByText('Bernd Stromberg')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should display season and episode info', async () => {
    render(<Quote />);

    await waitFor(() => {
      expect(screen.getByText('(S 2, E 5)')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should render RefreshTimer component after loading', async () => {
    render(<Quote />);

    await waitFor(() => {
      expect(screen.getByLabelText('Neues Zitat laden')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should use default author when character is null', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({
        quote: 'Ein Zitat ohne Autor',
        character: null,
        episode: null,
      }),
    } as Response);

    render(<Quote />);

    await waitFor(() => {
      expect(screen.getByText('Bernd Stromberg')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should not display episode info when not available', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({
        quote: 'Ein Zitat ohne Episode',
        character: { name: 'Ulf Steinke' },
        episode: null,
      }),
    } as Response);

    render(<Quote />);

    await waitFor(() => {
      expect(screen.getByText('Ulf Steinke')).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.queryByText(/\(S.*E.*\)/)).not.toBeInTheDocument();
  });

  it('should handle fetch errors gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    render(<Quote />);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Failed to fetch quote:', expect.any(Error));
    }, { timeout: 2000 });

    consoleError.mockRestore();
  });

  it('should call fetch on mount', async () => {
    render(<Quote />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/proxy');
    });
  });
});
