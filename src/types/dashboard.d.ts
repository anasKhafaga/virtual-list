import React from "react";

export interface EntryDataType {
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