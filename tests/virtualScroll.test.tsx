import React from 'react';
import { calcScrollState, getCurrentTicketList } from '@/util/virtualList';
import type { TicketCardProps } from '@/components/TicketCard';
import TicketCard from '@/components/TicketCard';
import { render } from '@testing-library/react';

const mockRenderTicketCB = (props: TicketCardProps): React.ReactNode => {
  return <TicketCard key={props.index} {...props} />;
};

const mockData = Array.from(Array(100), (_, idx) => ({
  id: idx,
  subject: `Ticket ${idx}`,
  status: 'Active',
  description: 'This is desc',
  priority: 'High'
}))

describe('Scroll functionality', () => {

  it('calculates the correct scroll state', () => {
    // Arrange
    const scrollTop = 150;
    const ticketHeight = 50;
    const mainCardHeight = 200;

    const expectedIndex = 3;
    const expectedEnd = 11;

    // Act
    const scrollState = calcScrollState(scrollTop, ticketHeight, mainCardHeight);

    // Assert
    expect(scrollState.index).toBe(expectedIndex);
    expect(scrollState.end).toBe(expectedEnd);
  });

  it('generates the correct ticket list within the specified range', () => {
    // Arrange
    const range = { start: 2, end: 5 };
    const ticketHeight = 50;

    // Act
    const itemList = getCurrentTicketList(range, mockData, ticketHeight, mockRenderTicketCB);
    const { queryByText } = render(<div key={1}>{itemList}</div>);

    // Assert
    expect(queryByText('Ticket 1')).not.toBeInTheDocument();
    expect(queryByText('Ticket 5')).not.toBeInTheDocument();

    expect(queryByText('Ticket 2')).toBeInTheDocument();
    expect(queryByText('Ticket 3')).toBeInTheDocument();
    expect(queryByText('Ticket 4')).toBeInTheDocument();
  });

  it('handles range exceeding original list length', () => {
    // Arrange
    const range = { start: 0, end: 10 };
    const ticketHeight = 50;

    // Act
    const itemList = getCurrentTicketList(range, mockData.slice(0, 2), ticketHeight, mockRenderTicketCB);
    const { queryByText } = render(<div key={2}>{itemList}</div>);

    // Assert
    expect(queryByText('Ticket 0')).toBeInTheDocument();
    expect(queryByText('Ticket 1')).toBeInTheDocument();
  });
});
