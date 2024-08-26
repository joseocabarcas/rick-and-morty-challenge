import { Location } from '@rick-and-morty-ch/types/character';

interface LocationProps {
  title: string;
  location: Location;
}

export default function LocationSection({ location, title }: LocationProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="col-span-2">
          <dt className="text-sm font-medium text-gray-500">Name</dt>
          <dd className="mt-1 text-sm text-gray-900">{location.name}</dd>
        </div>
        {location.type && (
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{location.type}</dd>
          </div>
        )}
        {location.dimension && (
          <div className="col-span-1">
            <dt className="text-sm font-medium text-gray-500">Dimension</dt>
            <dd className="mt-1 text-sm text-gray-900">{location.dimension}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
