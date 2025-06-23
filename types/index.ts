export interface CountryData {
  code: string;
  name: string;
  slug: string;
  flagUrl: string;
}

export type Category = {
  id: string;
  name: string;
};

export type Channel = {
  id: string;
  name: string;
  country: string;
  language?: string;
  categories?: string[];
  logo?: string;
  [key: string]: any;
};

export type Stream = {
  channel: string;
  feed?: string;
  url: string;
  quality?: string;
  referrer?: string;
  user_agent?: string;
};
