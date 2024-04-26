import { EntryDataType } from '@/types/dashboard'
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  tickets: EntryDataType[];
  meta: {
    total_pages: number
  }
}

const mockData: EntryDataType[] = Array.from(Array(20000), (_, idx) => ({
  id: idx,
  subject: `Ticket ${idx+1}`,
  status: 'Active',
  description: 'This is desc',
  priority: 'High'
}))

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ tickets: mockData, meta: { total_pages: 1 } })
}