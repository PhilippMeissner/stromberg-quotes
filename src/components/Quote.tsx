import {FunctionalComponent, h, Fragment} from 'preact';
import {useEffect, useState} from 'preact/compat';
import QuoteSkeleton from './QuoteSkeleton';

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

const Quote: FunctionalComponent = () => {
  const [quote, setQuote] = useState<Quote | undefined>(undefined);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});

    fetch('/api/proxy')
      .then((res) => res.json())
      .then((resp: ApiQuoteResponse) => {
        setQuote({
          author: resp?.character?.name || 'Bernd Stromberg',
          text: resp?.quote,
          season: resp?.episode?.season.toString(),
          episode: resp?.episode?.episode.toString(),
        });
      });
  }, []);

  return (
    <>
      {!quote &&
        <QuoteSkeleton />
      }
      {quote &&
        <div
          className="min-h-screen w-screen p-20 md:p-40 lg:p-52 flex flex-col justify-center md:items-center md:text-center text-white">
          <div className="text-2xl md:text-4xl break-words">{quote.text}</div>
          <div className="pt-12 text-sm md:text-base">{quote.author}</div>
          <div className="text-xs md:text-base">
            {quote.season && quote.episode &&
              <span>(S {quote.season}, E {quote.episode})</span>
            }
          </div>
        </div>
      }
    </>
  );
};

export default Quote;
