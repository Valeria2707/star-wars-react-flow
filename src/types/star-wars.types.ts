export type Person = {
  name: string;
  gender: string;
  films: string[];
  starships: string[];
  url: string;
  created: string;
};

export type Film = {
  title: string;
  url: string;
  starships: string[];
};

export type Starship = {
  name: string;
  url: string;
};
