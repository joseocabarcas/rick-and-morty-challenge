import { CharacterSection } from '@rick-and-morty-ch/containers/character-page/character-section';
import LocationSection from '@rick-and-morty-ch/containers/character-page/location-section';
import PersonalInformationSection from '@rick-and-morty-ch/containers/character-page/personal-information-section';
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

  if (!character) return notFound();

  return (
    <div className="w-full flex-shrink-0 overflow-hidden rounded-lg bg-white shadow-md sm:px-4 xl:mx-auto xl:max-w-screen-xl">
      <div className="md:flex">
        <div className="flex items-center justify-center md:flex-shrink-0">
          <div className="mt-3 overflow-hidden rounded-3xl md:mt-0">
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
          <CharacterSection character={character} />
          <PersonalInformationSection character={character} />
          <LocationSection location={character.location} title="Origin" />
          <LocationSection location={character.origin} title="Location" />
        </div>
      </div>
    </div>
  );
}
