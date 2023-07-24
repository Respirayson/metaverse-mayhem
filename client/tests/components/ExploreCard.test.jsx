import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExploreCard from '../../src/components/ExploreCard';

describe('ExploreCard component', () => {
  it('renders the card with the provided title and image', () => {
    const imgUrl = '/path/to/image.jpg';
    const title = 'Card Title';

    render(
      <ExploreCard
        id={1}
        imgUrl={imgUrl}
        title={title}
        index={0}
        active={null}
        handleClick={vi.fn()}
      />
    );

    // Assert on the presence of the image and title
    expect(screen.getByAltText('card-04')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders the active card with the expanded content', () => {
    const imgUrl = '/path/to/image.jpg';
    const title = 'Card Title';

    render(
      <ExploreCard
        id={1}
        imgUrl={imgUrl}
        title={title}
        index={0}
        active={1}
        handleClick={vi.fn()}
      />
    );

    // Assert on the presence of the expanded content
    expect(screen.getByText('Enter Metaverse Mayhem')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('calls the handleClick function when the card is clicked', () => {
    const handleClick = vi.fn();

    render(
      <ExploreCard
        id={1}
        imgUrl="/path/to/image.jpg"
        title="Card Title"
        index={0}
        active={null}
        handleClick={handleClick}
      />
    );

    // Simulate clicking the card
    fireEvent.click(screen.getByAltText('card-04'));

    // Assert that the handleClick function is called
    expect(handleClick).toHaveBeenCalledWith(1);
  });

  // Add more tests to cover other scenarios and interactions

});
