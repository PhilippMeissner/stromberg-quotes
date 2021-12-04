import {FunctionalComponent, h} from 'preact';

interface Quote {
  author: string;
  text: string;
  season: string;
  episode: string;
}

const QUOTES: Quote[] = [
  {
    author: 'Bernd Stromberg',
    text: 'Büro ist Krieg und Krieg ist immer ungerecht.',
    season: '1',
    episode: '1',
  },
  {
    author: 'Bernd Stromberg',
    text: 'Ich krieg doch auch beides hin: Job und Weiber!',
    season: '2',
    episode: '2',
  },
  {
    author: 'Bernd Stromberg',
    text: 'Na, ja gut. Man schneidet sich ja nicht gleich den Kopf ab, nur weil man `n paar Schuppen hat.',
    season: '3',
    episode: '3',
  },
  {
    author: 'Ulf',
    text: 'Männer tragen bei Hochzeiten nen unbequemen Anzug und keine Jogginghose, weil man gleich merken soll, dass man sich in `ner Ehe nicht wohlfühlt.',
    season: '4',
    episode: '4',
  },
  {
    author: 'Bernd Stromberg',
    text: 'Der perfekte Flirt, der ist so subtil, dass die Frau da überhaupt gar nix von mitkriegt. Sag ich mal.',
    season: '5',
    episode: '5',
  },
];

const Quote: FunctionalComponent = () => {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="h-screen w-screen px-20 md:px-40 lg:px-52 flex flex-col justify-center md:items-center md:text-center text-white">
      <div className="text-3xl md:text-4xl">{quote.text}</div>
      <div className="pt-12 text-sm md:text-base">{quote.author}</div>
      <div className="text-xs md:text-base">(S {quote.season}, E {quote.episode})</div>
    </div>
  );
};

export default Quote;
