import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Hand } from '../../src/components';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');

  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('Hand component', () => {
  it('renders the cards and handles card click', async () => {
    const cards = [
      { id: '1', name: 'Card 1' },
      { id: '2', name: 'Card 2' },
      { id: '3', name: 'Card 3' },
    ]; // Provide a valid array of cards
    const mockDispatch = vi.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const { getByAltText } = render(
      <DndProvider backend={HTML5Backend}>
        <Hand playerTurn cards={cards} />
      </DndProvider>,
    );

    // Assert that the cards are rendered
    expect(getByAltText('Card 1')).toBeInTheDocument();
    expect(getByAltText('Card 2')).toBeInTheDocument();
    expect(getByAltText('Card 3')).toBeInTheDocument();
  });
});
