'use client';

import { useEffect, useState } from 'react';
import { RecentItem } from './recent-item';
import { CharacterRecent } from '@rick-and-morty-ch/types/character';

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
      {viewedCharacters.length > 0 ? (
        <div className="flex space-x-4 overflow-x-auto pb-4" data-testid="recents">
          {viewedCharacters.map((item) => (
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
