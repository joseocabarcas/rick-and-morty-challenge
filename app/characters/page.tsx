import { FiltersSection } from '@rick-and-morty-ch/containers/characters-page/filters-section';
import { ListSection } from '@rick-and-morty-ch/containers/characters-page/list-section';
import { RecentsSection } from '@rick-and-morty-ch/containers/characters-page/recents-section';
import { getQueryClient } from '@rick-and-morty-ch/lib/query-client';
import { optionsGetAllCharacters } from '@rick-and-morty-ch/services/characters/getAllCharacters';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface CharactersPageProps {}

export default async function CharactersPage({}: CharactersPageProps) {
  // Prefetch first page
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(optionsGetAllCharacters({ page: 1 }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex w-full flex-col px-4">
        <FiltersSection />
        <RecentsSection />
        <ListSection />
      </div>
    </HydrationBoundary>
  );
}
