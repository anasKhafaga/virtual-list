import type { EntryDataType } from "@/types/dashboard";
import { useTranslation } from "next-i18next";
import { theme, Typography, Card, Flex} from 'antd';

const { useToken } = theme;
const { Title, Paragraph, Text } = Typography;

export interface TicketCardProps {
  index: number;
  ticketHeight: number;
  rawItem: EntryDataType
}

const TicketCard: React.FC<TicketCardProps> = ({index, ticketHeight, rawItem}) => {
  const { t } = useTranslation();
  const { token } = useToken();
  
  return (
    <div style={{ width: '100%', paddingInline: token.paddingMD, paddingBlock: token.paddingSM, position: 'absolute', top: index*ticketHeight, zIndex: 10, left: 0, height: ticketHeight }}>
      <Card title={<Title level={5}>{rawItem.subject}</Title>} style={{ width: '100%', height: '100%', boxShadow: 'none' }}>
        <Flex gap={10}>
          <Paragraph ellipsis={{ rows: 1, tooltip: rawItem.description }} ><Text strong>{t('ticket.description')}</Text>: <Text>{rawItem.description}</Text></Paragraph>
          <Paragraph ellipsis={{ rows: 1, tooltip: rawItem.priority }} ><Text strong>{t('ticket.priority')}</Text>: <Text>{rawItem.priority}</Text></Paragraph>
          <Paragraph ellipsis={{ rows: 1, tooltip: rawItem.status }} ><Text strong>{t('ticket.status')}</Text>: <Text>{rawItem.status}</Text></Paragraph>
        </Flex>
      </Card>
    </div>
  )
  
}

export default TicketCard