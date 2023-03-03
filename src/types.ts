export interface INation {
  capital: string[];
  subregion: string;
  population: number;
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
  };
  languages: {
    [key: string]: string;
  }
}