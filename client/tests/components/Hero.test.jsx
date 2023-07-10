import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Hero } from '../../src/components';

describe('Hero component', () => {
  it('renders health and mana values correctly', async () => {
    const character = {
      health: 100,
      mana: {
        current: 50,
        total: 100,
      },
    };
    
    const { getByText } = render(<Hero character={character} />);

    // Assert the rendered health value
    fireEvent.mouseEnter(screen.getByTestId('health'));
    expect(await screen.findByText(/100/i)).toBeInTheDocument();

    // Assert the rendered mana value
    const manaElement = getByText(50);
    expect(manaElement).toBeInTheDocument();
  });

  it('renders the hero name correctly', async () => {
    const character = {
      health: 100,
      mana: {
        current: 50,
        total: 100,
      },
    };

    const name = 'Test Name';

    render(<Hero character={character} name={name} />);

    // Assert the rendered hero name
    fireEvent.mouseEnter(screen.getByTestId('player'));
    expect(await screen.findByText(/Test Name/i)).toBeInTheDocument();
  });
});
