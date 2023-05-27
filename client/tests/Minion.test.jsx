import { render, screen } from '@testing-library/react';
import { Minion } from '../src/components';

const mockCard = {
    name: 'Test Minion',
    mana: 1,
    attack: 1,
    defense: 1
}

describe('Minion', () => {
  it('renders headline', () => {
    render(<Minion card={mockCard} />);
    const name = screen.getByText(/Test Minion/i);
    expect(name).toBeInTheDocument();
  });
});