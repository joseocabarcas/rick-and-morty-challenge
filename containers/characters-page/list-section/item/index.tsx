import { CharacterSlim } from '@rick-and-morty-ch/types/characters';
import Image from 'next/image';

interface ItemProps {
  character: CharacterSlim;
}

export const Item = (props: ItemProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="aspect-w-16 aspect-h-9 relative">
        <Image
          src={props.character.image}
          alt={props.character.name}
          width={256}
          height={150}
          className="h-48 w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800">{props.character.name}</h2>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Image
              src="/icons/status.svg"
              alt="status"
              width={16}
              height={16}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm">{props.character.status}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Image
              src="/icons/species.svg"
              alt="species"
              width={16}
              height={16}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm">{props.character.species}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Image
              src="/icons/origin.svg"
              alt="origin"
              width={16}
              height={16}
              className="mr-2 h-4 w-4"
            />
            <span className="text-sm">{props.character.origin.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
