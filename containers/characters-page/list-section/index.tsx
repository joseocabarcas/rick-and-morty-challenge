'use client';

import { useEffect } from 'react';
import { useHandleInfinite } from '../hooks/useHandleInfinite';
import { useQueryGetAllCharactersInfinite } from '../hooks/useQueryGetAllCharactersInfinite';
import { Item } from './item';
import { CharacterSlim } from '@rick-and-morty-ch/types/characters';

export const ListSection = () => {
  const { container, visible } = useHandleInfinite();

  // Usar el hook para obtener los personajes
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, isLoading } =
    useQueryGetAllCharactersInfinite({});

  // Manejo de efectos para cargar más datos cuando esté en vista
  useEffect(() => {
    if (visible && hasNextPage) {
      fetchNextPage();
    }
  }, [visible, hasNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading...</p>;
  if (status === 'error') return <p>Error loading characters</p>;

  return (
    <div className="w-full">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.pages
          .flatMap((page) => page.results)
          .map((character: CharacterSlim) => <Item key={character.id} character={character} />)}
      </section>
      {isFetchingNextPage && <p>Loading more...</p>}
      {hasNextPage && <div ref={container} className="my-8 h-1" />}
    </div>
  );
};
