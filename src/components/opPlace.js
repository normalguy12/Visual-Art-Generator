import React from 'react'

import store from '@/redux/store'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export function OpPlace( {opPlace} ) {
  
  return (
    <>
      {store.getState().operatorGet.value.map(comp=>comp)}
    </>
  )
}