import { render, screen } from '@testing-library/react';
import { CharacterSection } from '@rick-and-morty-ch/containers/character-page/character-section';
import { Character } from '@rick-and-morty-ch/types/character';

describe('CharacterSection', () => {
  const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    mockGetItem.mockClear();
    mockSetItem.mockClear();
  });

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      type: 'Planet',
      dimension: 'Dimension C-137',
      residents: [],
      url: 'https://example.com',
      created: '2017-11-10T12:42:04.162Z',
    },
    location: {
      name: 'Citadel of Ricks',
      type: 'Space Station',
      dimension: 'Unknown',
      residents: [],
      url: 'https://example.com',
      created: '2017-11-10T12:42:04.162Z',
    },
    image: 'https://example.com/image.png',
    episode: ['https://example.com/episode1'],
    url: 'https://example.com/character1',
    created: '2017-11-10T12:42:04.162Z',
  };

  it('should render character details correctly', () => {
    render(<CharacterSection character={mockCharacter} />);

    expect(screen.getByText('Character Details')).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('should update localStorage with the viewed characters', () => {
    const storedCharacters: Character[] = [
      {
        ...mockCharacter,
        id: 2,
        name: 'Morty Smith',
      },
      {
        ...mockCharacter,
        id: 3,
        name: 'Summer Smith',
      },
    ];

    mockGetItem.mockReturnValue(JSON.stringify(storedCharacters));

    render(<CharacterSection character={mockCharacter} />);

    const expectedCharacters = [
      mockCharacter,
      ...storedCharacters.filter((item) => item.id !== mockCharacter.id),
    ].slice(0, 5);

    expect(mockSetItem).toHaveBeenCalledWith(
      'viewedCharacters',
      JSON.stringify(expectedCharacters),
    );
  });

  it('should handle empty localStorage gracefully', () => {
    mockGetItem.mockReturnValue(null);

    render(<CharacterSection character={mockCharacter} />);

    expect(mockSetItem).toHaveBeenCalledWith('viewedCharacters', JSON.stringify([mockCharacter]));
  });
});
