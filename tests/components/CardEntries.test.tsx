import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardEntries from '@/components/CardEntries';

const mockData = Array.from(Array(3), (_, idx) => ({
  id: idx,
  subject: `Ticket ${idx}`,
  status: 'Active',
  description: 'This is desc',
  priority: 'High'
}))

jest.mock('@/hooks/dashboard', () => ({
  useFetchTickets: jest.fn(() => ({
    data: {
      pages: [{ tickets: mockData }, { tickets: mockData }],
    }
  })),
}));

describe('CardEntries Component', () => {
  it('renders without crashing', () => {
    render(<CardEntries />);
  });
  
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
