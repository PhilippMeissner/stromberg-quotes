import { FC, useEffect, useState, useCallback } from 'react';
import QuoteSkeleton from './QuoteSkeleton';
import RefreshTimer from './RefreshTimer';
import { useScrollToTopOnMount, useDocumentTitle } from '../hooks';
import { TIMERS } from '../constants';
import type { Quote as QuoteType, ApiQuoteResponse } from '../types';

const Quote: FC = () => {
  const [quote, setQuote] = useState<QuoteType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useScrollToTopOnMount();
  useDocumentTitle();

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);
    setIsTransitioning(true);
    setError(null);

    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const res = await fetch('/api/proxy');
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      const resp: ApiQuoteResponse = await res.json();
      setQuote({
        author: resp?.character?.name || 'Bernd Stromberg',
        text: resp?.quote,
        season: resp?.episode?.season.toString(),
        episode: resp?.episode?.episode.toString(),
      });
    } catch (err) {
      console.error('Failed to fetch quote:', err);
      setError('Zitat konnte nicht geladen werden.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsTransitioning(false), 100);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <>
      {(!quote || isLoading) && !error &&
        <QuoteSkeleton />
      }
      {error && !isLoading && (
        <div className="min-h-screen w-screen p-10 md:p-20 flex flex-col justify-center items-center text-center text-white">
          <p className="text-xl md:text-2xl text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchQuote}
            className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-gray-900 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      )}
      {quote && !isLoading && !error &&
        <article
          aria-live="polite"
          aria-atomic="true"
          className="min-h-screen w-screen p-10 md:p-20 lg:p-32 flex flex-col justify-center md:items-center md:text-center text-white">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning
                ? 'opacity-0 translate-y-4 scale-95'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <blockquote className="text-2xl md:text-4xl break-words leading-relaxed">
              {quote.text}
            </blockquote>
            <p className="pt-8 text-sm md:text-base text-gray-300">— {quote.author}</p>
            {quote.season && quote.episode && (
              <p className="text-xs md:text-base text-gray-400">
                (Staffel {quote.season}, Episode {quote.episode})
              </p>
            )}
          </div>

          <RefreshTimer
            duration={TIMERS.REFRESH_INTERVAL_SECONDS}
            onRefresh={fetchQuote}
            isPaused={isLoading}
          />
        </article>
      }
    </>
  );
};

export default Quote;
