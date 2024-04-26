import React from "react";

export interface EntryDataType {
  id: number;
  subject: string;
  priority: string;
  status: string;
  description: string;
}

export interface PageRawData {
  documents: EntryDataType[],
  meta: { total_pages: number }
}