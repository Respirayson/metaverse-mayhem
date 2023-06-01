import { render, screen } from '@testing-library/react';
import { Card } from '../src/components';
import { findRenderedDOMComponentWithTag } from 'react-dom/test-utils';

const mockCard = {
    name: 'Test Minion',
    mana: 1,
    attack: 1,
    defense: 1
}

describe('Card', () => {
  it('renders correctly', () => {
    const OriginalCard = Card.DecoratedComponent;

    const identity = (el) => el;

    render(<Card card={mockCard} connectDragSource={identity} />);

    
  });
});