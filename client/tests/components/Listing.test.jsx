import React from 'react';
import { render } from '@testing-library/react';
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
    const { getByText } = render(<Listing {...props} />);

    // Assert that the component renders the correct information
    expect(getByText('Category: Minion Category')).toBeInTheDocument();
    expect(getByText('Product Name')).toBeInTheDocument();
    expect(getByText('Product Description.')).toBeInTheDocument();
    expect(getByText('Price: $10.99')).toBeInTheDocument();
    expect(getByText('by')).toBeInTheDocument();
    expect(getByText('Seller Name')).toBeInTheDocument();
    expect(getByText('Buy')).toBeInTheDocument();
    expect(getByText('Now')).toBeInTheDocument();
  });
});
