import { optionsGetAllCharacters } from '@rick-and-morty-ch/services/characters/getAllCharacters';
import { ApiResponseCharacters } from '@rick-and-morty-ch/types/characters';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Filters {
  name?: string;
  status?: string;
}

export function useQueryGetAllCharactersInfinite(filters: Filters) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } =
    useInfiniteQuery<ApiResponseCharacters>({
      ...optionsGetAllCharacters({ ...filters, page: 1 }),
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading };
}
