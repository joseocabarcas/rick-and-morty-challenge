import { Character } from '@rick-and-morty-ch/types/character';

interface PersonalInformationProps {
  character: Character;
}

export default function PersonalInformationSection({ character }: PersonalInformationProps) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">Status</dt>
          <dd className="mt-1 text-sm text-gray-900">{character.status}</dd>
        </div>
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">Species</dt>
          <dd className="mt-1 text-sm text-gray-900">{character.species}</dd>
        </div>
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">Type</dt>
          <dd className="mt-1 text-sm text-gray-900">{character.type || 'N/A'}</dd>
        </div>
        <div className="col-span-1">
          <dt className="text-sm font-medium text-gray-500">Gender</dt>
          <dd className="mt-1 text-sm text-gray-900">{character.gender}</dd>
        </div>
      </dl>
    </div>
  );
}
