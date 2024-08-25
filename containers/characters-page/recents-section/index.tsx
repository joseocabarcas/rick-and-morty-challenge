'use client';

import { useEffect, useState } from 'react';
import { RecentItem } from './recent-item';

export const RecentsSection = () => {
  const [viewedCharacters, setViewedCharacters] = useState([]);

  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem('viewedCharacters') || '[]') || [];
    setViewedCharacters(storedCharacters);
  }, []);

  return (
    <div>
      <h3>Recently Viewed Characters</h3>
      <ul>
        {viewedCharacters.map((id) => (
          <RecentItem key={id} recent={undefined} />
        ))}
      </ul>
    </div>
  );
};
