import { render, screen } from '@testing-library/react';
import { Minion } from '../src/components';

const mockCard = {
    name: 'Test Minion',
    mana: 1,
    attack: 1,
    defense: 1
}

describe('renders correctly with values given', () => {
  it('renders name', () => {
    render(<Minion card={mockCard} />);
    const name = screen.getByText(/Test Minion/i);
    expect(name).toBeInTheDocument();
  });
});