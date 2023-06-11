import React from 'react';
import { render } from '@testing-library/react';
import { CardBack } from '../../src/components';

describe('CardBack component', () => {
  it('renders the card back with the correct styles', () => {
    const { container } = render(<CardBack />);
    const cardBackElement = container.firstChild;

    // Assert that the card back has the correct CSS classes applied
    expect(cardBackElement).toHaveClass('Card');
    expect(cardBackElement).toHaveClass('CardOpponent');
    expect(cardBackElement).toHaveClass('CardBackDefault');
  });
});
