import { render, screen } from '@testing-library/react';
import { Card } from '../src/components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const mockCard = {
    name: 'Test Minion',
    mana: 1,
    attack: 1,
    defense: 1
}

describe('Card', () => {
  it('renders correctly', () => {
    render(<DndProvider backend={HTML5Backend}> <Card card={mockCard} /> </DndProvider>);
    const name = screen.getByText(/Test Minion/i);
    expect(name).toBeInTheDocument();
  });
});