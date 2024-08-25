'use client';

import { RadioButton } from '@rick-and-morty-ch/components/radio-button/radio-button';
import {
  useCharacterFiltersActions,
  useStatusFilter,
} from '@rick-and-morty-ch/stores/characters-store';
import { StatusList } from '@rick-and-morty-ch/types/status';

export const Status = () => {
  const { setStatus } = useCharacterFiltersActions();
  const status = useStatusFilter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      {StatusList.map((statusOption) => (
        <div key={statusOption.value}>
          <RadioButton
            label={statusOption.label}
            name="status"
            onChange={handleChange}
            value={statusOption.value}
            checked={status === statusOption.value}
          />
        </div>
      ))}
    </div>
  );
};
