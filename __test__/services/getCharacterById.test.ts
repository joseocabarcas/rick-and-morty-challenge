import { getCharacterById } from '@rick-and-morty-ch/services/characters/getCharacterById';
import { fetcher } from '@rick-and-morty-ch/services/http/fetcher';
import { Character, Location } from '@rick-and-morty-ch/types/character';

// Mock the fetcher function
jest.mock('@rick-and-morty-ch/services/http/fetcher', () => ({
  fetcher: jest.fn(),
}));

// Mock the cache function
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: jest.fn((fn) => fn), // Mock simple que ejecuta la función directamente
}));

describe('getCharacterById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if character is not found', async () => {
    (fetcher as jest.Mock).mockResolvedValueOnce(null);

    const result = await getCharacterById({ id: '1' });
    expect(result).toBeNull();
  });

  it('should return enriched character data', async () => {
    const mockCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
      location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    };

    const mockOriginData: Location = {
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
      residents: ['https://rickandmortyapi.com/api/character/38'],
      url: 'https://rickandmortyapi.com/api/location/1',
      created: '2017-11-10T12:42:04.162Z',
    };

    const mockLocationData: Location = {
      name: 'Citadel of Ricks',
      type: 'Space station',
      dimension: 'unknown',
      residents: ['https://rickandmortyapi.com/api/character/8'],
      url: 'https://rickandmortyapi.com/api/location/3',
      created: '2017-11-10T13:08:13.191Z',
    };

    (fetcher as jest.Mock)
      .mockResolvedValueOnce(mockCharacter)
      .mockResolvedValueOnce(mockOriginData)
      .mockResolvedValueOnce(mockLocationData);

    const result = await getCharacterById({ id: '1' });

    expect(result).toEqual({
      ...mockCharacter,
      origin: { ...mockCharacter.origin, ...mockOriginData },
      location: { ...mockCharacter.location, ...mockLocationData },
    });

    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher).toHaveBeenNthCalledWith(1, '/character/1');
    expect(fetcher).toHaveBeenNthCalledWith(2, 'https://rickandmortyapi.com/api/location/1');
    expect(fetcher).toHaveBeenNthCalledWith(3, 'https://rickandmortyapi.com/api/location/3');
  });

  it('should handle location without URL', async () => {
    const mockCharacter: Character = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'unknown', url: '' },
      location: { name: 'unknown', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    };

    (fetcher as jest.Mock).mockResolvedValueOnce(mockCharacter);

    const result = await getCharacterById({ id: '1' });

    expect(result).toEqual(mockCharacter);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith('/character/1');
  });
});
