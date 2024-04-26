import React from "react"
import { EntryDataType } from "@/types/dashboard"
import { TicketCardProps } from "@/components/TicketCard"

export const calcScrollState = (scrollTop: number, ticketHeight: number, mainCardHeight: number) => {
  const index = Math.floor(scrollTop / ticketHeight)
  const end = index + Math.ceil((mainCardHeight * 2) / ticketHeight)
  return { index, end }
}

export const getCurrentTicketList = (range: {start: number, end: number}, originalList: EntryDataType[], ticketHeight: number, renderTicketCB: (props: TicketCardProps) => React.ReactNode) => {
  const { start, end } = range;
  let index = start;
  const itemList = [];
  while(index < end) {
    if(index >= originalList.length) {
      index = originalList.length;
      break;
    }

    const rawItem = originalList[index];
    
    itemList.push(renderTicketCB({index, ticketHeight, rawItem}))

    index++
  }
  
  return itemList;
}