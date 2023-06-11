import React from 'react';
import { render } from '@testing-library/react';
import { OpponentHand } from '../../src/components';

describe('OpponentHand component', () => {
  it('renders correct number of CardBack components', () => {
    const handCount = 5;
    const { getAllByTestId } = render(<OpponentHand handCount={handCount} />);
    const cardBackElements = getAllByTestId('card-back');
    expect(cardBackElements).toHaveLength(handCount);
  });
});
