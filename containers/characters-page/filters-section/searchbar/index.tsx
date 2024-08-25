'use client';

import { InputSearch } from '@rick-and-morty-ch/components/input-search/input-search';
import useDebounce from '@rick-and-morty-ch/hooks/useDebounce';
import {
  useCharacterFiltersActions,
  useTermSearch,
} from '@rick-and-morty-ch/stores/characters-store';
import { useEffect, useState } from 'react';

export const SearchBar = () => {
  const [localTerm, setLocalTerm] = useState('');
  const debouncedTerm = useDebounce(localTerm, 300);
  const { setTerm } = useCharacterFiltersActions();

  useEffect(() => {
    setTerm(debouncedTerm);
  }, [debouncedTerm, setTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTerm(e.target.value);
  };

  return (
    <div className="">
      <InputSearch onChange={handleChange} value={localTerm ?? ''} placeholder="Search..." />
    </div>
  );
};
