import { getCharacterById } from '@rick-and-morty-ch/services/characters/getCharacterById';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface CharacterPageProps {
  params: {
    id: string;
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const character = await getCharacterById({ id: params.id });

  if (!character) notFound();

  return (
    <div className="w-full flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-md sm:px-4 xl:mx-auto xl:max-w-screen-xl">
      <div className="md:flex">
        <div className="flex items-center justify-center md:flex-shrink-0">
          <div className="overflow-hidden rounded-3xl">
            <Image
              className="h-48 w-full object-cover md:h-80 md:w-80"
              src={character.image}
              alt={character.name}
              width={192}
              height={192}
            />
          </div>
        </div>
        <div className="p-8">
          <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            Character Details
          </div>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">{character.name}</h1>

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

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">Origin</h2>
            <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{character.origin.name}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{character.origin.type}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">Dimension</dt>
                <dd className="mt-1 text-sm text-gray-900">{character.origin.dimension}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">Location</h2>
            <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{character.location.name}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">Type</dt>
                <dd className="mt-1 text-sm text-gray-900">{character.location.type}</dd>
              </div>
              <div className="col-span-1">
                <dt className="text-sm font-medium text-gray-500">Dimension</dt>
                <dd className="mt-1 text-sm text-gray-900">{character.location.dimension}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
