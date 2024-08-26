export interface CharacterRecent {
  id: number;
  name: string;
  image: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}