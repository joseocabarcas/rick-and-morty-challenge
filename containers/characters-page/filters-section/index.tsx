import { SearchBar } from './searchbar';
import { Status } from './status';

export const FiltersSection = () => {
  return (
    <section className="flex items-center justify-center gap-4">
      <SearchBar />
      <Status />
    </section>
  );
};
