import { EntryDataType } from '@/types/dashboard'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/util/db';
 
type ResponseData = {
  tickets: EntryDataType[];
  meta: {
    total_pages: number
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { db } = await connectToDatabase();
    const tickets = await db
      .collection<Omit<EntryDataType, 'id'>>("tickets")
      .find({})
      .toArray();
    const data: EntryDataType[] = tickets.map(ticket => ({ ...ticket, id: JSON.stringify(ticket._id)}))
    res.status(200).json({ tickets: data, meta: { total_pages: 1 } })
  } catch(e) {
    res.status(500).end("Internal Server Error");
  }
}