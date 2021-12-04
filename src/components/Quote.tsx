import {FunctionalComponent, h} from 'preact';
import {useEffect, useState} from 'preact/compat';

interface Quote {
  author: string;
  text: string;
  season: string | null;
  episode: string | null;
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

const BASE_API = 'https://stromberg-api.de';

const Quote: FunctionalComponent = () => {
  const [quote, setQuote] = useState<Quote | undefined>(undefined);

  useEffect(() => {
    fetch(`${BASE_API}/api/quotes/random`)
      .then((res) => res.json())
      .then((resp: ApiQuoteResponse) => {
        setQuote({
          author: resp?.character?.name || 'Bernd Stromberg',
          text: resp?.quote,
          season: resp?.episode === null ? null : resp.episode.season.toString(),
          episode: resp?.episode === null ? null : resp.episode.episode.toString(),
        });
      });
  }, []);

  return (
    <div
      className="h-screen w-screen px-20 md:px-40 lg:px-52 flex flex-col justify-center md:items-center md:text-center text-white">
      <div className="text-3xl md:text-4xl">{quote?.text}</div>
      <div className="pt-12 text-sm md:text-base">{quote?.author}</div>
      <div className="text-xs md:text-base">
        {quote?.season && quote?.episode &&
          <span>(S {quote?.season}, E {quote?.episode})</span>
        }
      </div>
    </div>
  );
};

export default Quote;
