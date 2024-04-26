import React, { useMemo } from 'react';
import { ConfigProvider, theme, Tabs } from 'antd';
import TableEntries from './TableEntries';
import CardEntries from './CardEntries';
import { useTranslation } from 'next-i18next';

const { useToken } = theme;

const IndexContent: React.FC = () => {
  const { t } = useTranslation();
  const { token } = useToken();
  
  const items = useMemo(() => ([
    {
      label: t('cardView'),
      key: 'card',
      children: <CardEntries />
    },
    {
      label: t('tabularView'),
      key: 'table',
      children: <TableEntries />
    }
  ]), [t]);

  return (
    <ConfigProvider theme={{
      components: {
        Table: {
          headerBg: '#162560',
          headerSortHoverBg: 'rgba(22, 37, 96, 0.9)',
          headerSortActiveBg: 'rgba(22, 37, 96, 0.9)',
          fixedHeaderSortActiveBg:  'rgba(22, 37, 96, 0.9)',
          headerColor: '#FFFFFF',
          colorIcon: '#FFFFFF',
          colorIconHover: '#f0f0f0'
        },
        Tabs: {
          itemSelectedColor: '#234189'
        }
      }
    }}>
      <Tabs
        type="card"
        defaultActiveKey='card'
        items={items}
        style={{ paddingBlock: token.paddingLG, paddingInline: token.paddingMD }}
      />
    </ConfigProvider>
  )
};

export default IndexContent;