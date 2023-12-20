import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useControls } from 'leva'
import store from '@/redux/store'

import MidiScript from '@/webmidi/midiScript'

export default function Ring (props) {
  // This reference gives us direct access to the THREE.Mesh object.
  const options = useMemo(()=>{
    return {
      x: { value: 0, min: -20, max: 20, step: 0.00001 },
      y: { value: 0, min: -20, max: 20, step: 0.00001 },
      z: { value: 0, min: -20, max: 20, step: 0.00001 },
      rotx: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001 },
      roty: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      rotz: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      innerRadius : { value: 1, min: 0,max: 30, step: 0.00001},
      outerRadius : { value: 5, min: 0, max: 30, step: 0.00001 },
      thetaSegments : { value: 5, min: 3, max: 30, step: 0.00001 },
      phiSegments : { value: 5, min: 0, max: 30, step: 0.00001 },
      thetaStart: { value: 0, min: 1, max: Math.PI*2, step: 0.00001 },
      thetaLength: { value: Math.PI*2, min: 0, max: Math.PI*2, step: 0.00001 },
      color: {value: 'pink'},
      visible: {value: true}
    }
  }, [])

  const control = useControls('Ring', options)

  const test = MidiScript()

  const ref = useRef()
  useFrame(() => {
    ref.current.rotation.x = test.velocity
  })
  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh
      visible={control.visible}
      ref = {ref}   
      position={[control.x, control.y, control.z]}
      rotation={[control.rotx, control.roty, control.rotz]}
    > 
      <ringGeometry args={[control.innerRadius, control.outerRadius, control.thetaSegments, control.phiSegments, control.thetaStart, control.thetaLength]}/>      
      <meshStandardMaterial visible={control.visible} color={control.color} />
        
    </mesh>
  )
}