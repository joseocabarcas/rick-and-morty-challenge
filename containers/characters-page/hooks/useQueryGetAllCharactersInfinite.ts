import { useIsVisible } from '@rick-and-morty-ch/hooks/useIsVisible';
import { getAllCharacters, optionsGetAllCharacters } from '@rick-and-morty-ch/services/characters/getAllCharacters';
import { ApiResponseCharacters } from '@rick-and-morty-ch/types/characters';
import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';

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
};
