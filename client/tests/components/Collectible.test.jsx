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
    cardImage: 'placeholder.png',
  };

  it('renders collectible data correctly', () => {
    render(<Collectible card={props} />);

    // Assert description
    const descriptionElement = screen.getByText(props.description);
    expect(descriptionElement).toBeInTheDocument();

    // Assert mana
    const manaElement = screen.getByText(props.mana);
    expect(manaElement).toBeInTheDocument();

    // Assert attack
    const attackElement = screen.getByText(props.attack);
    expect(attackElement).toBeInTheDocument();

    // Assert defense
    const defenseElement = screen.getByText(props.defense);
    expect(defenseElement).toBeInTheDocument();

    // Assert image
    const imageElement = screen.getByAltText('portrait');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toContain(props.cardImage)
  });
});
