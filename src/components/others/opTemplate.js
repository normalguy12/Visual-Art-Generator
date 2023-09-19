import React from 'react'

import { Box } from '@chakra-ui/react'

import interact from 'interactjs'

function OperatorTemplate() {
  const position = { x: 50, y: 50 }

  interact('.template').draggable({
    listeners: {
      start (event) {
        console.log(event.type, event.target)
      },
      move (event) {
        position.x += event.dx
        position.y += event.dy

        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`
      },
    },
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
      })
    ]
    
  })
  return (
  <Box className="template" bg='tomato' w='20%' h='7%' p={4} color='white'>
    
  </Box>
  )
}

export default OperatorTemplate
