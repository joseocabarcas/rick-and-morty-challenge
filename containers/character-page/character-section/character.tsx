'use client';

import { Character, CharacterRecent } from '@rick-and-morty-ch/types/character';
import { useEffect } from 'react';

interface CharacterDetailProps {
  character: Character;
}

export const CharacterSection = ({ character }: CharacterDetailProps) => {
  useEffect(() => {
    const storedCharacters = (JSON.parse(localStorage.getItem('viewedCharacters') || '[]') ||
      []) as CharacterRecent[];

    // Filtra para evitar duplicados y asegurarse de que solo haya 5 personajes almacenados
    const updatedCharacters = [
      character,
      ...storedCharacters.filter((item) => item.id !== character.id),
    ].slice(0, 5);

    localStorage.setItem('viewedCharacters', JSON.stringify(updatedCharacters));
  }, [character]);

  return (
    <>
      <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
        Character Details
      </div>
      <h1 className="mt-1 text-3xl font-bold text-gray-900">{character.name}</h1>
    </>
  );
};
