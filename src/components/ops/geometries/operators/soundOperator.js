import React from 'react'

import { Box } from '@chakra-ui/react'


import store from '@/redux/store'
function SoundOperator(props) {
 
  const {modalSound} = props

  function handleBox(e){
    e.preventDefault()
    modalSound();
  }

  return (
  <Box cursor='pointer' className="template" bg='tomato' w='100%' h='10%' p={4} color='white' onClick={handleBox}>
    Your MIDI is ready! Click to load your sounds!
  </Box>
  )
}

export default SoundOperator
