
import React from 'react'

import { Box } from '@chakra-ui/react'

import interact from 'interactjs'
import { DeleteIcon } from '@chakra-ui/icons'

import store from '@/redux/store'
import { modelLoader } from '../../skeleton/modelLoader'
import ReactWebMidi from '@/webmidi/webmidi'
function SphereOperator() {
  let position = { x: 0, y: 0 }
  // interact('.template').draggable({
  //   listeners: {
  //     start (event) {
  //       console.log(event.type, event.target)
  //     },
  //     move (event) {
  //       position.x += event.dx
  //       position.y += event.dy

  //       event.target.style.transform =
  //         `translate(${position.x}px, ${position.y}px)`
  //     },
  //   },
  //   modifiers: [
  //     interact.modifiers.restrictRect({
  //       restriction: 'parent',
  //     })
  //   ]
    
  // })

  function handleBox(){
    // useEffect(() => {
    //   function keyListener(e) {
    //     if (e.keyCode === 46) {
    //       //delete
    //       console.log('delete')
    //     }
    //   }
  
    //   document.addEventListener("keydown", keyListener);
  
    //   return () => document.removeEventListener("keydown", keyListener);
    // });
  }

  return (
  <>
  <Box className="template" bg='tomato' w='100%' h='5%' p={4} color='white' onClick={handleBox}>
  <DeleteIcon/>
  </Box></>
  
  )
}

export default SphereOperator
