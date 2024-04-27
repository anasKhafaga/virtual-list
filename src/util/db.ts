import { Db, MongoClient } from "mongodb"

let uri = process.env.MONGODB_URI ?? '';

let cachedClient: MongoClient | null = null
let cachedDB: Db | null = null;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

export async function connectToDatabase() {
  if (cachedClient && cachedDB) {
    return { client: cachedClient, db: cachedDB }
  }

  try {
    const client = await MongoClient.connect(uri)
  
    const db = await client.db('ticket-app')
  
    cachedClient = client
    cachedDB = db;
    return { client, db }
  } catch(e) {
    throw e;
  }

}