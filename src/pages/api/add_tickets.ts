import { EntryDataType } from '@/types/dashboard'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/util/db';

let idx = 1;

const getMockData: () => Omit<EntryDataType, 'id'>[] = () => Array.from(Array(200), () => ({
  subject: `Ticket ${idx++}`,
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
      .insertMany(getMockData())

    res.status(200).json({ message: '200 tickets have been added successfully' });

  } catch(e) {   
    res.status(500).end("Internal Server Error");
  }
}