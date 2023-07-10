import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomInput from '../../src/components/CustomInput';

describe('CustomInput component', () => {
  it('renders without errors', () => {
    render(
      <CustomInput
        label="Name"
        placeHolder="Enter your name"
        value=""
        handleValueChange={() => {}}
      />
    );
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  it('calls handleValueChange when input value changes', () => {
    const handleValueChange = jest.fn();
    render(
      <CustomInput
        label="Name"
        placeHolder="Enter your name"
        value=""
        handleValueChange={handleValueChange}
      />
    );
    
    const input = screen.getByPlaceholderText('Enter your name');
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(handleValueChange).toHaveBeenCalledWith('John Doe');
  });
});
