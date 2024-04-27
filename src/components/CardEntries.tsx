import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Radio, Card, RadioChangeEvent } from 'antd';
import TicketCard, { TicketCardProps } from './TicketCard';
import type { EntryDataType } from '@/types/dashboard';
import { useFetchTickets } from '@/hooks/dashboard';
import { calcScrollState, getCurrentTicketList } from '@/util/virtualList';
import { useTranslation } from 'next-i18next';

const CardEntries: React.FC = () => {
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const [ticketHeight, setTicketHeight] = useState(175);
  const { t } = useTranslation();
  const [mainCardHeight, setMainCardHeight] = useState(1000);
  const [scrollState, setScrollState] = useState({
    index: 0,
    end: Math.ceil((mainCardHeight * 2) / ticketHeight)
  })
  
  const {
    data
  } = useFetchTickets();
  
  const dataArray = useMemo(() => data?.pages.map(page => page.tickets).flat() ?? [], [ data?.pages, data?.pages.length ])
  
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
    const currentItemList = getCurrentTicketList({start: scrollState.index, end: scrollState.end}, dataArray, ticketHeight, renderTicketCB);
    setItems(currentItemList);
  }, [ scrollState, ticketHeight, dataArray ])

  const handleSizeChange = (e: RadioChangeEvent) => {
    setTicketHeight(e.target.value)
  };

  return (
    <>
      <Form.Item label={t('size')}>
        <Radio.Group data-testid='radio-group' value={ticketHeight} onChange={handleSizeChange}>
          <Radio.Button value={200}>{t('large')}</Radio.Button>
          <Radio.Button value={175}>{t('middle')}</Radio.Button>
          <Radio.Button value={150}>{t('small')}</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Card onScroll={scrollHandler} style={{ height: mainCardHeight, overflow: 'auto', position: 'relative' }}>
          {items}
      </Card>
    </>
  )
}

export default CardEntries;