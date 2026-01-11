export interface Quote {
  author: string;
  text: string;
  season?: string;
  episode?: string;
}

export interface ApiQuoteResponse {
  quote: string;
  character: {
    name: string;
  } | null;
  episode: {
    season: number;
    episode: number;
  } | null;
}
