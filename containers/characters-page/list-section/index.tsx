'use client';

import { useEffect } from 'react';
import { useHandleInfinite } from '@rick-and-morty-ch/containers/characters-page/hooks/useHandleInfinite';
import { useQueryGetAllCharactersInfinite } from '@rick-and-morty-ch/containers/characters-page/hooks/useQueryGetAllCharactersInfinite';
import { Item } from './item';
import { CharacterSlim } from '@rick-and-morty-ch/types/characters';
import { useStatusFilter, useTermSearch } from '@rick-and-morty-ch/stores/characters-store';

export const ListSection = () => {
  const statusFilter = useStatusFilter();
  const term = useTermSearch();

  const { container, visible } = useHandleInfinite();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } =
    useQueryGetAllCharactersInfinite({ status: statusFilter, name: term });

  useEffect(() => {
    if (visible && hasNextPage) {
      fetchNextPage();
    }
  }, [visible, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading characters</p>;

  return (
    <div className="w-full">
      <h3 className="mb-3 text-2xl font-bold">Characters</h3>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.pages
          .flatMap((page) => page.results)
          .map((character: CharacterSlim) => <Item key={character.id} character={character} />)}
      </section>
      {isFetchingNextPage && <p>Loading more...</p>}
      {hasNextPage && <div ref={container} className="my-8 h-2" />}
    </div>
  );
};
