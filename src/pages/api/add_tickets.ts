import { EntryDataType } from '@/types/dashboard'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/util/db';

const mockData: Omit<EntryDataType, 'id'>[] = Array.from(Array(200), (_, idx) => ({
  subject: `Ticket ${idx+1}`,
  status: 'Active',
  description: 'This is desc',
  priority: 'High'
}))

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { db } = await connectToDatabase();
    await db
      .collection("tickets")
      .insertMany(mockData)
    res.status(200).json({ message: '200 tickets have been added successfully' });

  } catch(e) {
    res.status(500).end("Internal Server Error");
  }
}