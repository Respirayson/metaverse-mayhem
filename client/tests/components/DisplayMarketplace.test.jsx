import React from 'react';
import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { DisplayMarketplace } from '../../src/components';

// Mock the necessary dependencies
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));
vi.mock('../Listing/Listing', () => vi.fn(({
  card, seller, price, handleClick,
}) => (
  <div>
    <span data-testid="card">{card}</span>
    <span data-testid="seller">{seller}</span>
    <span data-testid="price">{price}</span>
    <button onClick={handleClick}>View Details</button>
  </div>
)));
vi.mock('.../Loader', () => vi.fn(() => <div data-testid="loader">Loading...</div>));

describe('DisplayMarketplace component', () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  it('renders the total listings count', () => {
    const listings = [
      { card: 'Card 1', seller: 'Seller 1', price: 10 },
      { card: 'Card 2', seller: 'Seller 2', price: 20 },
    ];
    const loading = false;
    const subtitle = 'No listings available';

    render(
      <DisplayMarketplace
        listings={listings}
        loading={loading}
        subtitle={subtitle}
      />,
    );

    const totalListingsCount = screen.getByText('Total Listings (2)');
    expect(totalListingsCount).toBeInTheDocument();
  });

  it('renders the loader when loading is true', () => {
    const listings = [];
    const loading = true;
    const subtitle = 'No listings available';

    render(
      <DisplayMarketplace
        listings={listings}
        loading={loading}
        subtitle={subtitle}
      />,
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('renders the subtitle when listings is empty and loading is false', () => {
    const listings = [];
    const loading = false;
    const subtitle = 'No listings available';

    render(
      <DisplayMarketplace
        listings={listings}
        loading={loading}
        subtitle={subtitle}
      />,
    );

    const subtitleElement = screen.getByText('No listings available');
    expect(subtitleElement).toBeInTheDocument();
  });

  it('renders the listings when listings is not empty and loading is false', () => {
    const listings = [
      { card: 'Card 1', seller: { username: 'Seller 1', bio: 'word' }, price: 10 },
      { card: 'Card 2', seller: { username: 'Seller 2', bio: 'word2' }, price: 20 },
    ];
    const loading = false;
    const subtitle = 'No listings available';

    render(
      <DisplayMarketplace
        listings={listings}
        loading={loading}
        subtitle={subtitle}
      />,
    );

    const listing1 = screen.getByText('Seller 1');
    const listing2 = screen.getByText('Seller 2');
    expect(listing1).toBeInTheDocument();
    expect(listing2).toBeInTheDocument();
  });
});
