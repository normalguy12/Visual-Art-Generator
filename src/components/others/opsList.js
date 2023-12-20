import React from 'react'
import { ModalCloseButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { List, ListItem, UnorderedList } from "@chakra-ui/react"
import { Cateogry } from '@/components/opsTypes'
import { NodeCategory } from '../opsNodes'
import { SimpleGrid } from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux";

import { getID } from '@/redux/idReducer'

import store from '@/redux/store'




const OpsList = props => {
  const [isOpen, setIsOpen] = useState(false)

  const { opPlace, renderPlace, deleteRender } = props

  const dispatch = useDispatch()
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 192) {
        setIsOpen(!isOpen);
      }
    }

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  function handleClick(e){
    e.preventDefault()
    dispatch(getID(e.currentTarget.id))
    setIsOpen(false)
    renderPlace();
    opPlace();
    console.log(store.getState().renderGet.value)  }

  function handleDelete(e){
    e.preventDefault()
    dispatch(getID(e.currentTarget.id))
    setIsOpen(false)
    deleteRender();
    
    
  }

  var a;
  const [name, setName] = useState('')

  function getCategory(e){
    setName(e.currentTarget.id)
    
    for(var i = 0; i < NodeCategory.length; i++){
      if(NodeCategory[i].name === name){
        a = NodeCategory[i].list.map((element)=><OpsElementList optype={element.optype}/>)
      }
    }
    console.log(a)
  }


  const OpsElementList = (props)=>{
    return (
        <ListItem>{props.optype} 
          <Button display='inline-block' id={props.optype} onClick={handleClick}>Add</Button>
          {/* <Button display='inline-block' id={props.optype} onClick={handleDelete}>Delete</Button>  */}
        </ListItem>
    )
  }

const OpsItemList = (props) =>{
  return <ListItem cursor='pointer' id={props.name} onClick={getCategory}>{props.name}</ListItem>
}
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal
        isCentered
        onClose={()=>setIsOpen(false)}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        variant="black"
        scrollBehavior='inside'
      >
        <ModalOverlay 
          bg='blackAlpha.300'
        />
        <ModalContent maxH="400px" maxW="600px">
        <ModalHeader>Operators</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={10}>
              <UnorderedList>
                {Cateogry.map((op)=><OpsItemList name={op.name}></OpsItemList>)}
              </UnorderedList>
              <UnorderedList>
                {/* {...list} */}
                {NodeCategory.find(obj=>obj.name === name)?.list.map(op=><OpsElementList optype = {op.optype}/>)}
                {/* {(NodeCategory.find((obj)=>obj.name === name)).list} */}
                {/* {rightSide} */}
              </UnorderedList>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default OpsList