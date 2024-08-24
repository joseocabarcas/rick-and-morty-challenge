import { FiltersSection } from '@rick-and-morty-ch/containers/characters-page/filters-section';

interface CharactersPageProps {}

export default function CharactersPage({}: CharactersPageProps) {
  return (
    <div className="flex flex-col px-4">
      <FiltersSection />
    </div>
  );
}
