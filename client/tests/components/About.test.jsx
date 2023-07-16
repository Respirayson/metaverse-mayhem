import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../../src/components';

describe('About component', () => {
  it('renders without errors', () => {
    render(<About />);
    expect(screen.getByTestId('component').textContent.toString()).toContain('About');
    expect(screen.getByAltText('arrow down')).toBeInTheDocument();
  });
});
