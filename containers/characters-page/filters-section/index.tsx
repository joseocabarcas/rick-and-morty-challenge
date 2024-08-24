import { SearchBar } from './searchbar';
import { Status } from './status';

export const FiltersSection = () => {
  return (
    <section className="flex items-center justify-start gap-4">
      <SearchBar />
      <Status />
    </section>
  );
};
