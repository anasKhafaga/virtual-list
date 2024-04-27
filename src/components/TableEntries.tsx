import React, { useEffect } from 'react';
import { Button, ButtonProps, Flex, Table, Typography, Card } from 'antd';
import { useTranslation } from 'next-i18next';
import { useColumns } from '@/hooks/dashboard';
import { useFetchTickets } from '@/hooks/dashboard';

const { Title } = Typography;

const Footer: React.FC<ButtonProps> = ({ ...props }) => {
  const { t } = useTranslation();
  return (
    <Flex justify='center'>
      <Button {...props}>{t('more')}</Button>
    </Flex>
  )
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

  const dataArray = data?.pages.map(page => page.tickets).flat().map(ticket => ({ key: ticket.id, ...ticket }));  
  
  useEffect(() => {

    const tableNode = document.querySelector(".ant-table-container");

    const config = { childList: true };

    const callback = (mutationList: any) => {
      const tableBodyNode = document.querySelector(".ant-table-body")
      for (const mutation of mutationList) {        
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
      <Table virtual={true} className='table-striped-rows' size='large' title={() => <Title level={2} style={{ margin: 0 }}>{t('title')}</Title>} loading={isLoading} sticky={{ offsetHeader: 10 }} columns={columns} dataSource={dataArray} showSorterTooltip={false} scroll={{ x: 1000, y: 500 }} pagination={false} footer={() => !hasNextPage? null : <Footer type='link' onClick={() => fetchNextPage()} disabled={isFetchingNextPage} />} />
    </Card>
  )
}

export default TableEntries;