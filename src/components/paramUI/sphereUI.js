import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'

import React from 'react'

function BoxUI() {
  return (
    <>
      <Slider size='lg' w='30%' defaultValue={1} >
        <SliderTrack>
          <SliderFilledTrack/>
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <Slider id='dcf' size='lg' w='30%' defaultValue={1}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  )
}

export default BoxUI

