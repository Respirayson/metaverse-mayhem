import React from 'react';
import { render } from '@testing-library/react';
import { CardBack } from '../../src/components';

describe('CardBack component', () => {
  it('renders the card back with the correct styles', () => {
    const { container } = render(<CardBack />);
    const cardBackElement = container.firstChild;

    // Assert that the card back has the correct CSS classes applied
    expect(cardBackElement).toHaveClass('w-[180px] h-[285px] z-0 rounded-2xl bg-[image:var(--image-url)] bg-contain bg-center');
  });
});
