import { Tooltip, type TableColumnsType } from "antd";
import type { EntryDataType } from "@/types/dashboard";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FileTextFilled } from "@ant-design/icons";

export const useColumns = (): TableColumnsType<EntryDataType> => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  return [
    {
      title: () => <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ t(`ticket.type`) }>{''}</Tooltip>,
      ellipsis: {
        showTitle: false
      },
      dataIndex: 'icon',
      align: 'center',
      width: '5%',
      fixed: 'left',
      render: () => (
          <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ t(`ticket.icon`) }>
            <FileTextFilled style={{opacity: 0.45}} />
          </Tooltip>
        )
    },
    {
      title: () => <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ t(`ticket.subject`) }>{t(`ticket.subject`)}</Tooltip>,
      ellipsis: {
        showTitle: false
      },
      dataIndex: 'subject',
      fixed: 'left',
      width: '30%',
      render: (value) => (
          <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ t(`ticket.type`) }>
            {value}
          </Tooltip>
        )
    },
    {
      title: () => <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ t('ticket.status') }>{t('ticket.status')}</Tooltip>,
      ellipsis: {
        showTitle: false
      },
      dataIndex: 'status',
      width: '12.5%',
      render: (value) => (
        <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ value }>{value}</Tooltip> 
      )
    },
    {
      title: () => <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ t('ticket.description') }>{t('ticket.description')}</Tooltip>,
      ellipsis: {
        showTitle: false
      },
      dataIndex: 'description',
      width: '40%',
      render: (value) => (
        <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ value }>{value}</Tooltip>
      )
    },
    {
      title: () => <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ t('ticket.priority') }>{t('ticket.priority')}</Tooltip>,
      ellipsis: {
        showTitle: false
      },
      dataIndex: 'priority',
      width: '12.5%',
      render: (value) => (
        <Tooltip placement={locale === 'ar'? "topRight" : "topLeft"} title={ value }>{value}</Tooltip> 
      )
    }
  ]
}