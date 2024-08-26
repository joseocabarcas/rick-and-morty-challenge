import { getAllCharacters } from '@rick-and-morty-ch/services/characters/getAllCharacters';
import { fullUrl } from '@rick-and-morty-ch/services/http/fullUrl';
import { mockListCharacters } from '@rick-and-morty-ch/test-utils/mock-list-characters';

// Mock fetch globally
global.fetch = jest.fn();

jest.mock('@rick-and-morty-ch/services/http/fullUrl', () => ({
  fullUrl: jest.fn(),
}));

// Mock the cache function
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: jest.fn((fn) => fn), // Mock simple que ejecuta la función directamente
}));

describe('getAllCharacters', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return character data when the API call is successful', async () => {
    const mockData = {
      info: { count: 100, pages: 5, next: 'url?page=2', prev: null },
      results: mockListCharacters.results,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    (fullUrl as jest.Mock).mockReturnValue('mocked-url');

    const params = { page: 1 };
    const result = await getAllCharacters(params);

    expect(fullUrl).toHaveBeenCalledWith('/character?page=1');
    expect(fetch).toHaveBeenCalledWith('mocked-url');
    expect(result).toEqual(mockData);
  });

  it('should return fallback data when the API call fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const params = { page: 1 };
    const result = await getAllCharacters(params);

    expect(result).toEqual({
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    });
  });

  it('should return fallback data when an exception is thrown', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const params = { page: 1 };
    const result = await getAllCharacters(params);

    expect(result).toEqual({
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    });
  });
});
