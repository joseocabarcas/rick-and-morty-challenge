'use client';

import { useEffect } from 'react';
import { useQueryGetAllCharactersInfinite } from '@rick-and-morty-ch/containers/characters-page/hooks/useQueryGetAllCharactersInfinite';
import { Item } from './item';
import { CharacterSlim } from '@rick-and-morty-ch/types/characters';
import { useStatusFilter, useTermSearch } from '@rick-and-morty-ch/stores/characters-store';
import { useIsVisible } from '@rick-and-morty-ch/hooks/useIsVisible';

export const ListSection = () => {
  const statusFilter = useStatusFilter();
  const term = useTermSearch();

  const { ref, isIntersecting } = useIsVisible();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } =
    useQueryGetAllCharactersInfinite({ status: statusFilter, name: term });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading characters</p>;

  return (
    <div className="w-full">
      <h3 className="mb-3 text-2xl font-bold">Characters</h3>
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-testid="characters"
      >
        {data?.pages
          .flatMap((page) => page.results)
          .map((character: CharacterSlim) => <Item key={character.id} character={character} />)}
      </section>
      {isFetchingNextPage && <p>Loading more...</p>}
      {hasNextPage ? <div ref={ref} className="my-8 h-2" /> : null}
    </div>
  );
};
