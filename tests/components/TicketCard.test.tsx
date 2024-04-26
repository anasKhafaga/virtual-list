import React from 'react';
import { render } from '@testing-library/react';
import TicketCard, { TicketCardProps } from '@/components/TicketCard';

describe('TicketCard Component', () => {
  const mockData: TicketCardProps = {
    index: 0,
    ticketHeight: 100,
    rawItem: {
      id: 0,
      subject: 'Test Ticket Subject',
      description: 'Test Ticket Description',
      priority: 'High',
      status: 'Open',
    },
  };

  it('renders with correct data', () => {
    const { getByText } = render(<TicketCard {...mockData} />);
    getByText('Test Ticket Subject')
    getByText('ticket.description')
    getByText('Test Ticket Description')
    getByText('ticket.priority')
    getByText('High')
    getByText('ticket.status')
    getByText('Open')
  });
});
