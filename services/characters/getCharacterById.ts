import { Character, Location } from '@rick-and-morty-ch/types/character';
import { cache } from 'react';
import { fullUrl } from '../http/fullUrl';
import { fetcher } from '../http/fetcher';

type TGetCharacterParams = {
  id: string;
};

const enrichLocationData = async (locationInfo: Location): Promise<Location> => {
  if (locationInfo.url) {
    const locationData = await fetcher<Location>(locationInfo.url);
    return locationData ? { ...locationInfo, ...locationData } : locationInfo;
  }
  return locationInfo;
};

export const getCharacterById = cache(
  async (params: TGetCharacterParams): Promise<Character | null> => {
    const character = await fetcher<Character>(fullUrl(`/character/${params.id}`));

    if (!character) return null;

    const enrichedOrigin = await enrichLocationData(character.origin);
    const enrichedLocation = await enrichLocationData(character.location);

    return {
      ...character,
      origin: enrichedOrigin,
      location: enrichedLocation,
    };
  },
);
