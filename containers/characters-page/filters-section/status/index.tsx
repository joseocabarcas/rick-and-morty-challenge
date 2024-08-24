'use client';

import { RadioButton } from '@rick-and-morty-ch/components/radio-button/radio-button';
import { StatusList } from '@rick-and-morty-ch/types/status';

export const Status = () => {
  return (
    <div className="flex items-center gap-2">
      {StatusList.map((status) => (
        <div key={status.value}>
          <RadioButton label={status.label} name="status" />
        </div>
      ))}
    </div>
  );
};
