import { ApiResponseCharacters } from '@rick-and-morty-ch/types/characters';
import { infiniteQueryOptions, QueryFunctionContext } from '@tanstack/react-query';
import { cache } from 'react';

const fullUrl = (url: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;

type TGetAllCharacterParams = {
  page?: number;
  name?: string;
  status?: string;
};

export const getAllCharacters = cache(
  async (params: TGetAllCharacterParams): Promise<ApiResponseCharacters> => {
    try {
      const query = new URLSearchParams({
        ...(params.page && { page: params.page.toString() }),
        ...(params.name && { name: params.name }),
        ...(params.status && { status: params.status }),
      });

      const response = await fetch(fullUrl(`/character?${query.toString()}`));

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      return response.json();
    } catch (error) {
      console.error(error);
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null,
        },
        results: [],
      };
    }
  },
);

export const optionsGetAllCharacters = (params: TGetAllCharacterParams) =>
  infiniteQueryOptions<ApiResponseCharacters>({
    queryKey: ['getAllCharacters', { ...params, page: 1 }],
      queryFn: ({ pageParam = 1 }: QueryFunctionContext) =>
        getAllCharacters({ ...params, page: pageParam as number }),
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.info.next?.split('page=')[1];
        return nextPage ? parseInt(nextPage, 10) : undefined;
      },
      initialPageParam: 1,
  });
