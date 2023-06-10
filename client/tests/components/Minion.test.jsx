import { render, screen } from '@testing-library/react';
import { Minion } from '../../src/components';

const mockCard = {
    name: 'Test Minion',
    mana: 1,
    attack: 11,
    defense: 10
}

describe('renders correctly with values given', () => {
  it('renders name', () => {
    render(<Minion card={mockCard} />);
    const attack = screen.getByText("11");
    const defense = screen.getByText("10");
    expect(attack).toBeInTheDocument();
    expect(defense).toBeInTheDocument();
  });
});