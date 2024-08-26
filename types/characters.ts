export interface CharacterSlim {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  origin: {
    name: string;
    url: string;
  };
}

export interface ApiResponseCharacters {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: CharacterSlim[];
}