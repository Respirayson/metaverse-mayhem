import React from 'react';
import { render } from '@testing-library/react';
import { Hero } from '../../src/components';

describe('Hero component', () => {
  it('renders health and mana values correctly', () => {
    const character = {
      health: 100,
      mana: {
        current: 50,
        total: 100,
      },
    };

    const { getByText } = render(<Hero character={character} />);

    // Assert the rendered health value
    const healthElement = getByText(/Health: 100/i);
    expect(healthElement).toBeInTheDocument();

    // Assert the rendered mana value
    const manaElement = getByText(/Mana: 50 \/ 100/i);
    expect(manaElement).toBeInTheDocument();
  });
});
