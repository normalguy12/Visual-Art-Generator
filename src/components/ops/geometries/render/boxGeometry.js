import { Component, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useMemo } from 'react'
import { color } from 'framer-motion'
import store from '@/redux/store'
import MidiScript from '@/webmidi/midiScript'

export default function Box (){
  
  const options = useMemo(()=>{
    return {
      x: { value: 0, min: -20, max: 20, step: 0.00001 },
      y: { value: 0, min: -20, max: 20, step: 0.00001 },
      z: { value: 0, min: -20, max: 20, step: 0.00001 },
      width: { value: 2, min: 0,max: 20, step: 0.00001},
      height: { value: 2, min: 0, max: 20, step: 0.00001 },
      depth: { value: 2, min: 0, max: 20, step: 0.00001 },
     
      color: {value: 'pink'},
      visible: {value: true}
    }
  }, [])

  const control = useControls('Box', options)

    return (
      <>
      <mesh      
        // {...props}
        // ref={ref}
        // scale={clicked ? 1.5 : 1}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
        position={[control.x, control.y, control.z]}
        visible={control.visible}
      > 
        <boxGeometry  args={[control.width, control.height, control.depth]} />      
        <meshStandardMaterial color={control.color} />    
        
      </mesh>
     
      </>
    )
  
}