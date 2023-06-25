import React from 'react';
import { render, screen } from '@testing-library/react';
import Collectible from '../../src/components/Collectible/Collectible';

describe('Collectible component', () => {
  const props = {
    name: 'Test Collectible',
    description: 'Test description',
    mana: 3,
    attack: 2,
    defense: 4,
  };

  it('renders collectible data correctly', () => {
    render(<Collectible {...props} />);

    // Assert name
    const nameElement = screen.getByText(props.name);
    expect(nameElement).toBeInTheDocument();

    // Assert description
    const descriptionElement = screen.getByText(props.description);
    expect(descriptionElement).toBeInTheDocument();

    // Assert mana
    const manaElement = screen.getByText(`Mana: ${props.mana}`);
    expect(manaElement).toBeInTheDocument();

    // Assert attack
    const attackElement = screen.getByText(`Attack: ${props.attack}`);
    expect(attackElement).toBeInTheDocument();

    // Assert defense
    const defenseElement = screen.getByText(`Defense: ${props.defense}`);
    expect(defenseElement).toBeInTheDocument();
  });
});
