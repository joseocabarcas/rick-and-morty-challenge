import { useQueryGetAllCharactersInfinite } from '@rick-and-morty-ch/containers/characters-page/hooks/useQueryGetAllCharactersInfinite';
import { optionsGetAllCharacters } from '@rick-and-morty-ch/services/characters/getAllCharacters';
import { mockListCharacters } from '@rick-and-morty-ch/test-utils/mock-list-characters';
import { ApiResponseCharacters } from '@rick-and-morty-ch/types/characters';
import { useInfiniteQuery } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';

// Mock the useInfiniteQuery hook from react-query
jest.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: jest.fn(),
}));

// Mock the optionsGetAllCharacters function
jest.mock('@rick-and-morty-ch/services/characters/getAllCharacters', () => ({
  optionsGetAllCharacters: jest.fn(),
}));

describe('useQueryGetAllCharactersInfinite', () => {
  const mockFilters = { name: 'Rick', status: 'Alive' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading state initially', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'loading',
      isLoading: true,
    });

    const { result } = renderHook(() => useQueryGetAllCharactersInfinite(mockFilters));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.status).toBe('loading');
  });

  it('should return data when the query is successful', () => {
    const mockData: ApiResponseCharacters = {
      info: {
        count: 2,
        pages: 1,
        next: null,
        prev: null,
      },
      results: [mockListCharacters.results[0]],
    };

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: { pages: [mockData] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'success',
      isLoading: false,
    });

    const { result } = renderHook(() => useQueryGetAllCharactersInfinite(mockFilters));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('success');
    expect(result.current.data?.pages[0].results).toHaveLength(1);
    expect(result.current.data?.pages[0].results[0].name).toBe('Rick Sanchez');
  });

  it('should handle errors correctly', () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'error',
      isLoading: false,
    });

    const { result } = renderHook(() => useQueryGetAllCharactersInfinite(mockFilters));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.status).toBe('error');
  });

  it('should fetch the next page when fetchNextPage is called', () => {
    const mockFetchNextPage = jest.fn();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      status: 'success',
      isLoading: false,
    });

    const { result } = renderHook(() => useQueryGetAllCharactersInfinite(mockFilters));

    result.current.fetchNextPage();

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it('should call optionsGetAllCharacters with correct filters', () => {
    renderHook(() => useQueryGetAllCharactersInfinite(mockFilters));

    expect(optionsGetAllCharacters).toHaveBeenCalledWith({ ...mockFilters, page: 1 });
  });
});
