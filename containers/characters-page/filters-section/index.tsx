import { SearchBar } from './searchbar';
import { Status } from './status';

export const FiltersSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
      <SearchBar />
      <Status />
    </section>
  );
};
