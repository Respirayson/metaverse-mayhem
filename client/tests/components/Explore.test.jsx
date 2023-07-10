import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Explore from '../../src/components/Explore';

describe('Explore component', () => {
  it('renders without errors', () => {
    render(<Explore />);
    expect(screen.getByTestId('explore').textContent.toString()).toContain('Trading');
    expect(screen.getByText('Collect your favorite Characters')).toBeInTheDocument();
  });
});
