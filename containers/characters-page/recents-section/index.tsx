'use client';

import { useEffect, useState } from 'react';
import { RecentItem } from './recent-item';
import { CharacterRecent } from '@rick-and-morty-ch/types/character';

const sampleCharacters = [
  { id: 1, name: 'Rick Sanchez', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
  { id: 2, name: 'Morty Smith', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
  { id: 3, name: 'Summer Smith', image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
  { id: 4, name: 'Beth Smith', image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg' },
  { id: 5, name: 'Jerry Smith', image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg' },
];

export const RecentsSection = () => {
  const [viewedCharacters, setViewedCharacters] = useState<CharacterRecent[]>([]);

  useEffect(() => {
    const storedCharacters = (JSON.parse(localStorage.getItem('viewedCharacters') || '[]') ||
      []) as CharacterRecent[];
    setViewedCharacters(storedCharacters);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">Recently Viewed Characters</h3>
      {sampleCharacters.length > 0 ? (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {sampleCharacters.map((item) => (
            <RecentItem key={item.id} character={item} />
          ))}
        </div>
      ) : (
        <div className="bg-muted rounded-lg py-10 text-center">
          <p className="text-muted-foreground">No characters viewed recently.</p>
        </div>
      )}
    </div>
  );
};
