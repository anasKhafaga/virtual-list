import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, ButtonProps, Flex, Table, Typography, Card } from 'antd';
import { useTranslation } from 'next-i18next';
import { useInfiniteQuery, QueryFunction } from '@tanstack/react-query';
import type { EntryDataType, PageRawData } from '@/types/dashboard';
import { useColumns } from '@/hooks/dashboard';
import { AppContext } from '@/contexts/app';

const mockData: EntryDataType[] = Array.from(Array(5000), (_, idx) => ({
  key: idx,
  id: idx,
  subject: `Ticket ${idx+1}`,
  status: 'Active',
  description: 'This is desc',
  priority: 'High'
}))

const { Title } = Typography;

const Footer: React.FC<ButtonProps> = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <Flex justify='center'>
      <Button {...props}>{t('more')}</Button>
    </Flex>
  )
}

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

const TableEntries: React.FC = () => {
  const columns = useColumns();

  const { t } = useTranslation();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useFetchTickets();

  useEffect(() => {

    const tableNode = document.querySelector(".ant-table-container");

    const config = { childList: true };

    const callback = (mutationList: any) => {
      const tableBodyNode = document.querySelector(".ant-table-body")
      for (const mutation of mutationList) {
        console.log(mutation);
        
        if (mutation.type === "childList") {
          if(mutation.addedNodes.length > 0) {
            tableBodyNode?.classList.remove('with__scroller');
          } else if (mutation.removedNodes.length > 0) {
            tableBodyNode?.classList.add('with__scroller');
          }
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(tableNode as HTMLDivElement, config);
    
    return () => observer.disconnect();
  }, [])

  return (
    <Card>
      <Table virtual={true} className='table-striped-rows' size='large' title={() => <Title level={2} style={{ margin: 0 }}>{t('title')}</Title>} loading={isLoading} sticky={{ offsetHeader: 10 }} columns={columns} dataSource={mockData} showSorterTooltip={false} scroll={{ x: 1000, y: 500 }} pagination={false} footer={() => !hasNextPage? null : <Footer type='link' onClick={() => fetchNextPage()} disabled={isFetchingNextPage} />} />
    </Card>
  )
}

export default TableEntries;