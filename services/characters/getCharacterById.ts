import { Character } from '@rick-and-morty-ch/types/character';
import { cache } from 'react';
import { fullUrl } from '../http/fullUrl';

type TGetCharacterParams = {
  id: string;
};

export const getCharacterById = cache(
  async (params: TGetCharacterParams): Promise<Character | null> => {
    try {
      const response = await fetch(fullUrl(`/character/${params.id}`));

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const character: Character = await response.json();

      // Fetch origin data
      if (character.origin.url) {
        const originResponse = await fetch(character.origin.url);
        if (originResponse.ok) {
          const originData: Location = await originResponse.json();
          character.origin = { ...character.origin, ...originData };
        }
      }

      // Fetch location data
      if (character.location.url) {
        const locationResponse = await fetch(character.location.url);
        if (locationResponse.ok) {
          const locationData: Location = await locationResponse.json();
          character.location = { ...character.location, ...locationData };
        }
      }

      return character;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
);
