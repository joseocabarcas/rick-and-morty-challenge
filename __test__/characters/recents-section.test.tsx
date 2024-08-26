import { RecentsSection } from '@rick-and-morty-ch/containers/characters-page/recents-section';
import { render, screen } from '@testing-library/react';

describe('RecentsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display "No characters viewed recently" message when no recent characters are in localStorage', () => {
    // Mock localStorage.getItem to return an empty array
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));

    render(<RecentsSection />);

    expect(screen.getByText(/No characters viewed recently./i)).toBeInTheDocument();
  });

  it('should display recently viewed characters when they are present in localStorage', () => {
    // Mock localStorage.getItem to return a list of viewed characters
    const recentCharacters = [
      { id: '1', name: 'Character 1', image: '' },
      { id: '2', name: 'Character 2', image: '' },
    ];

    Storage.prototype.getItem = jest.fn(() => JSON.stringify(recentCharacters));

    render(<RecentsSection />);

    expect(screen.getByText(/Character 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Character 2/i)).toBeInTheDocument();
  });
});
