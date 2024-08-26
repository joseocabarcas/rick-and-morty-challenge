import CharacterPage from '@rick-and-morty-ch/app/characters/[id]/page';
import { getCharacterById } from '@rick-and-morty-ch/services/characters/getCharacterById';
import { render, screen, waitFor } from '@testing-library/react';
import { notFound } from 'next/navigation';

jest.mock('@rick-and-morty-ch/services/characters/getCharacterById', () => ({
  getCharacterById: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('CharacterPage', () => {
  const mockCharacter = {
    id: 1,
    name: 'John Doe',
    image: 'https://example.com/image.jpg',
    origin: { name: 'Earth', url: 'https://example.com/origin' },
    location: { name: 'Mars', url: 'https://example.com/location' },
  };

  it('renders character details correctly', async () => {
    (getCharacterById as jest.Mock).mockResolvedValue(mockCharacter);

    // Wait for loading to complete
    render(await CharacterPage({ params: { id: '1' } }));

    await waitFor(() => {});

    // Check if the character name and image are rendered
    const characterName = await screen.findByText('John Doe');
    const characterImage = screen.getByAltText('John Doe');

    expect(characterName).toBeInTheDocument();
    expect(characterImage).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('calls notFound if character is not found', async () => {
    (getCharacterById as jest.Mock).mockResolvedValue(null);

    // Wait for loading to complete
    render(await CharacterPage({ params: { id: '3' } }));

    await waitFor(() => {});

    expect(notFound).toHaveBeenCalled();
  });
});
