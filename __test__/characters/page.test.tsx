import { screen, waitFor } from '@testing-library/react';
import { dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@rick-and-morty-ch/lib/query-client';
import CharactersPage from '@rick-and-morty-ch/app/characters/page';
import { renderWithQueryClient } from '@rick-and-morty-ch/test-utils/provider';
import {
  mockListCharactersPrefetch,
  optionsGetAllCharacters,
} from '@rick-and-morty-ch/test-utils/mock-list-characters';

// Mocking the dependencies
jest.mock('@rick-and-morty-ch/lib/query-client', () => ({
  getQueryClient: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  dehydrate: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: jest.fn((fn) => fn), // Mock simple que ejecuta la función directamente
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  dehydrate: jest.fn(() => mockListCharactersPrefetch), // Mock `dehydrate` as a function returning an empty object
  infiniteQueryOptions: jest.fn(() => optionsGetAllCharacters), // Mock the function
}));

jest.mock('@rick-and-morty-ch/containers/characters-page/list-section', () => ({
  ListSection: jest.fn(() => <div>ListSection</div>),
}));

describe('CharactersPage', () => {
  it('should render all sections correctly after data is prefetched', async () => {
    const mockQueryClient = {
      prefetchInfiniteQuery: jest.fn(),
    };

    (getQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (dehydrate as jest.Mock).mockReturnValue({});

    // Render the server component asynchronously
    await renderWithQueryClient(CharactersPage());

    // Verify if prefetching was done
    expect(mockQueryClient.prefetchInfiniteQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        initialPageParam: 1,
        queryKey: ['getAllCharacters', { name: '', page: 1, status: '' }],
      }),
    );

    // Wait for the asynchronous rendering to complete
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
      expect(screen.getByText('Recently Viewed Characters')).toBeInTheDocument();
      expect(screen.getByText('ListSection')).toBeInTheDocument();
    });
  });
});
