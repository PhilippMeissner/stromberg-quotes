import { FC, useEffect, useState, useCallback } from 'react';
import QuoteSkeleton from './QuoteSkeleton';
import RefreshTimer from './RefreshTimer';

interface Quote {
  author: string;
  text: string;
  season?: string;
  episode?: string;
}

interface ApiQuoteResponse {
  quote: string;
  character: {
    name: string;
  } | null;
  episode: {
    season: number;
    episode: number;
  } | null;
}

const REFRESH_INTERVAL_SECONDS = 15;

const Quote: FC = () => {
  const [quote, setQuote] = useState<Quote | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);
    setIsTransitioning(true);

    // Short delay for fade-out effect
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const res = await fetch('/api/proxy');
      const resp: ApiQuoteResponse = await res.json();
      setQuote({
        author: resp?.character?.name || 'Bernd Stromberg',
        text: resp?.quote,
        season: resp?.episode?.season.toString(),
        episode: resp?.episode?.episode.toString(),
      });
    } catch (error) {
      console.error('Failed to fetch quote:', error);
    } finally {
      setIsLoading(false);
      // Small delay before showing new quote
      setTimeout(() => setIsTransitioning(false), 100);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(!quote || isLoading) &&
        <QuoteSkeleton />
      }
      {quote && !isLoading &&
        <div
          className="min-h-screen w-screen p-10 md:p-20 lg:p-32 flex flex-col justify-center md:items-center md:text-center text-white">
          <div
            className={`transition-all duration-300 ease-in-out ${
              isTransitioning
                ? 'opacity-0 translate-y-4 scale-95'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="text-2xl md:text-4xl break-words leading-relaxed">{quote.text}</div>
            <div className="pt-8 text-sm md:text-base text-gray-300">{quote.author}</div>
            <div className="text-xs md:text-base text-gray-400">
              {quote.season && quote.episode &&
                <span>(S {quote.season}, E {quote.episode})</span>
              }
            </div>
          </div>

          {/* Auto-refresh timer */}
          <RefreshTimer
            duration={REFRESH_INTERVAL_SECONDS}
            onRefresh={fetchQuote}
            isPaused={isLoading}
          />
        </div>
      }
    </>
  );
};

export default Quote;
