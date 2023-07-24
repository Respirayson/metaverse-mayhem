import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from '../../src/components';

describe('Alert component', () => {
  it('renders a success alert with the provided message', () => {
    const message = 'Success message';

    render(<Alert success message={message} />);

    // Assert on the presence of the success alert and the message
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveClass(
      'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800'
    );
  });

  it('renders an error alert with the provided message', () => {
    const message = 'Error message';

    render(<Alert success={false} message={message} />);

    // Assert on the presence of the error alert and the message
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveClass(
      'text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
    );
  });

});
