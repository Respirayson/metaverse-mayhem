import React from 'react';
import { render } from '@testing-library/react';
import { useDrag } from 'react-dnd';
import { PlayerMinion } from '../../src/containers';

vi.mock('react-dnd', () => ({
  useDrag: vi.fn(),
}));

describe('PlayerMinion component', () => {
  const mockDrag = vi.fn();

  beforeEach(() => {
    useDrag.mockReturnValue([{}, mockDrag]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders player minion and applies drag behavior', () => {
    const card = { id: 1, name: 'Minion', power: 5 };
    const exhausted = false;
    const canDrag = true;

    render(<PlayerMinion card={card} exhausted={exhausted} canDrag={canDrag} />);

    expect(mockDrag).toHaveBeenCalled();
    // Add assertions for the rendered component, such as checking if the card is rendered correctly.
  });
});
