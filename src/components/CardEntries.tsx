import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Form, Radio, Card, RadioChangeEvent } from 'antd';
import TicketCard, { TicketCardProps } from './TicketCard';
import { useInfiniteQuery, QueryFunction } from '@tanstack/react-query';
import type { EntryDataType, PageRawData } from '@/types/dashboard';
import { AppContext } from '@/contexts/app';
import { calcScrollState, getCurrentTicketList } from '@/util/virtualList';

const mockData: EntryDataType[] = Array.from(Array(20000), (_, idx) => ({
  id: idx,
  subject: `Ticket ${idx+1}`,
  status: 'Active',
  description: 'This is desc',
  priority: 'High'
}))

const useFetchTickets = () => {  
  const { qAxios } = useContext(AppContext);

  const queryFn: QueryFunction<PageRawData, [string], number> = async ({ pageParam }) => {
    return (await qAxios.get(`tickets?page=${pageParam}`))?.data
  }

  const response = useInfiniteQuery({
    queryKey: ['tickets'],
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {            
      if(lastPage && (lastPageParam as number) < lastPage.meta.total_pages) {
        return (lastPageParam as number) + 1;
      }
  
      return null;
    },
    enabled: false
  })

  return response;
  
} 

const CardEntries: React.FC = () => {
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const [ticketHeight, setTicketHeight] = useState(175);
  const [mainCardHeight, setMainCardHeight] = useState(1000);
  const [scrollState, setScrollState] = useState({
    index: 0,
    end: Math.ceil((mainCardHeight * 2) / ticketHeight)
  })
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useFetchTickets();

  const renderTicketCB = (props: TicketCardProps) => <TicketCard key={props.index} {...props} />

  const scrollHandler = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    let scrollTop = target.scrollTop
    const { index, end } = calcScrollState(scrollTop, ticketHeight, mainCardHeight);
    setScrollState({
      index,
      end
    })
  }, [ ticketHeight, mainCardHeight ])

  
  useEffect(() => {
    const currentItemList = getCurrentTicketList({start: scrollState.index, end: scrollState.end}, mockData, ticketHeight, renderTicketCB);
    setItems(currentItemList);
  }, [ scrollState, ticketHeight ])
  
  const handleSizeChange = (e: RadioChangeEvent) => {
    setTicketHeight(e.target.value)
  };

  return (
    <>
      <Form.Item label="Size">
        <Radio.Group data-testid='radio-group' value={ticketHeight} onChange={handleSizeChange}>
          <Radio.Button value={200}>Large</Radio.Button>
          <Radio.Button value={175}>Middle</Radio.Button>
          <Radio.Button value={150}>Small</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Card onScroll={scrollHandler} style={{ height: mainCardHeight, overflow: 'auto', position: 'relative' }}>
          {items}
      </Card>
    </>
  )
}

export default CardEntries;