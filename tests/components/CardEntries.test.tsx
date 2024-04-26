import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardEntries from '@/components/CardEntries';

describe('CardEntries Component', () => {
  it('renders correctly with default values', () => {
    // Act
    const { getByText } = render(<CardEntries />);

    // Assert
    getByText('Large');
    getByText('Middle');
    getByText('Small');
  });

  it('changes ticket size on radio button click', () => {
    // Act
    const { getByText, getByTestId } = render(<CardEntries />);
    
    // Assert
    fireEvent.click(getByText('Small'));
    expect(getByTestId('radio-group').querySelector('input[value="150"]')).toBeChecked();
    fireEvent.click(getByText('Middle'));
    expect(getByTestId('radio-group').querySelector('input[value="175"]')).toBeChecked();
    fireEvent.click(getByText('Large'));
    expect(getByTestId('radio-group').querySelector('input[value="200"]')).toBeChecked();

  });
});
