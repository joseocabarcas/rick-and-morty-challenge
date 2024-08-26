'use client';

import { CharacterRecent } from '@rick-and-morty-ch/types/character';
import Image from 'next/image';
import Link from 'next/link';

interface RecentItemProps {
  character: CharacterRecent;
}

export const RecentItem = ({ character }: RecentItemProps) => {
  return (
    <Link href={`/characters/${character.id}`} prefetch={false}>
      <div
        key={character.id}
        className="w-48 flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-md"
      >
        <div className="p-4">
          <div className="bg-muted relative h-40 w-full overflow-hidden rounded-md">
            <Image
              src={character.image}
              alt={character.name}
              className="h-full w-full object-cover"
              width={256}
              height={150}
            />
            <div className="bg-muted text-muted-foreground absolute inset-0 flex items-center justify-center text-2xl font-bold opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
              {character.name.slice(0, 2)}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-muted-foreground text-sm text-gray-800">#{character.id}</p>
            <h3 className="truncate text-lg font-semibold text-gray-800">{character.name}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};
