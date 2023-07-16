import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card } from '../../src/components';

describe('rendering correct with value given', () => {
  const mockCard = {
    mana: 10,
    attack: 5,
    defense: 1,
  };

  beforeEach(() => {
    render(<DndProvider backend={HTML5Backend}>
      <Card card={mockCard} />
    </DndProvider>);
  });

  it('has a mana cost', () => {
    const mana = screen.getByText('10');
    expect(mana).toBeInTheDocument();
  });

  it('has an attack value', () => {
    const attack = screen.getByText('5');
    expect(attack).toBeInTheDocument();
  });

  it('has a defense value', () => {
    const defense = screen.getByText('1');
    expect(defense).toBeInTheDocument();
  });
});

describe('rendering correct with no value given', () => {
  const noDataCard = {
    name: '',
  };

  beforeEach(() => {
    render(<DndProvider backend={HTML5Backend}>
      <Card card={noDataCard} />
           </DndProvider>);
  });

  it('has no mana cost', () => {
    const mana = screen.queryByText('1');
    expect(mana).not.toBeInTheDocument();
  });

  it('has no attack value', () => {
    const attack = screen.queryByText('1');
    expect(attack).not.toBeInTheDocument();
  });

  it('has no defense value', () => {
    const defense = screen.queryByText('1');
    expect(defense).not.toBeInTheDocument();
  });
});
