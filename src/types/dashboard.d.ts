import React from "react";
import { ObjectId } from "mongodb";

export interface EntryDataType {
  _id?: ObjectId;
  id: string;
  subject: string;
  priority: string;
  status: string;
  description: string;
}

export interface PageRawData {
  tickets: EntryDataType[],
  meta: { total_pages: number }
}