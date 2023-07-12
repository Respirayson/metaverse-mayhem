import React from 'react';
import { render, screen } from '@testing-library/react';
import { Listing } from '../../src/components';

describe('Listing component', () => {
  const props = {
    minion: 'Minion Category',
    name: 'Product Name',
    description: 'Product Description',
    seller: 'Seller Name',
    price: '$10.99',
  };

  it('renders the listing card with correct information', () => {
    render(<Listing {...props} />);

    // Assert that the component renders the correct information
    expect(screen.getByText(/Minion Category/i)).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Product Description.')).toBeInTheDocument();
    expect(screen.getByText(/\$10.99/i)).toBeInTheDocument();
    expect(screen.getByText('by')).toBeInTheDocument();
    expect(screen.getByText('Seller Name')).toBeInTheDocument();
    expect(screen.getByText('Buy')).toBeInTheDocument();
    expect(screen.getByText('Now')).toBeInTheDocument();
  });
});
