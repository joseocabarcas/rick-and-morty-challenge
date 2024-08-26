import { useHandleInfinite } from '@rick-and-morty-ch/containers/characters-page/hooks/useHandleInfinite';
import { useStatusFilter, useTermSearch } from '@rick-and-morty-ch/stores/characters-store';
import { useQueryGetAllCharactersInfinite } from '@rick-and-morty-ch/containers/characters-page/hooks/useQueryGetAllCharactersInfinite';
import { ListSection } from '@rick-and-morty-ch/containers/characters-page/list-section';
import { render, screen, waitFor } from '@testing-library/react';
import { mockListCharacters } from '@rick-and-morty-ch/test-utils/mock-list-characters';

// Mock hooks
jest.mock('@rick-and-morty-ch/stores/characters-store', () => ({
  useStatusFilter: jest.fn(),
  useTermSearch: jest.fn(),
  useCharacterFiltersActions: jest.fn(() => ({ setTerm: jest.fn(), setStatus: jest.fn() })),
}));

jest.mock('@rick-and-morty-ch/containers/characters-page/hooks/useHandleInfinite', () => ({
  useHandleInfinite: jest.fn(() => ({ container: { current: null }, visible: false })),
}));

jest.mock(
  '@rick-and-morty-ch/containers/characters-page/hooks/useQueryGetAllCharactersInfinite',
  () => ({
    useQueryGetAllCharactersInfinite: jest.fn(),
  }),
);

describe('ListSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading text when data is loading', () => {
    (useQueryGetAllCharactersInfinite as jest.Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'loading',
      isLoading: true,
    });

    render(<ListSection />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('should display error text when there is an error', () => {
    (useQueryGetAllCharactersInfinite as jest.Mock).mockReturnValue({
      data: undefined,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'error',
      isLoading: false,
    });

    render(<ListSection />);

    expect(screen.getByText(/Error loading characters/i)).toBeInTheDocument();
  });

  it('should display characters when data is available', async () => {
    const mockData = {
      pages: [mockListCharacters],
    };

    (useQueryGetAllCharactersInfinite as jest.Mock).mockReturnValue({
      data: mockData,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      status: 'success',
      isLoading: false,
    });

    render(<ListSection />);

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  });

  it('should handle fetching next page when scrolled into view', async () => {
    const mockFetchNextPage = jest.fn();

    (useQueryGetAllCharactersInfinite as jest.Mock).mockReturnValue({
      data: { pages: [] },
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      status: 'success',
      isLoading: false,
    });

    const mockRef = jest.fn();

    (useHandleInfinite as jest.Mock).mockReturnValue({
      container: mockRef,
      visible: true,
    });

    render(<ListSection />);

    await waitFor(() => expect(mockFetchNextPage).toHaveBeenCalled());
  });
});
