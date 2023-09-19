import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useControls } from 'leva'
import store from '@/redux/store'
import ReactWebMidi from '@/webmidi/webmidi'
import MidiControl from '@/webmidi/webmidiTest'

export default function Sphere (props) {
  // This reference gives us direct access to the THREE.Mesh object.
  const options = useMemo(()=>{
    return {
      x: { value: 0, min: -20, max: 20, step: 0.00001 },
      y: { value: 0, min: -20, max: 20, step: 0.00001 },
      z: { value: 0, min: -20, max: 20, step: 0.00001 },
      rotx: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001 },
      roty: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      rotz: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      radius: { value: 1, min: 0,max: 100, step: 0.00001},
      widthSegment: { value: 32, min: 0, max: 100, step: 0.00001 },
      heightSegment: { value: 16, min: 0, max: 100, step: 0.00001 },
      phiStart: { value: 0, min: 0, max: 100, step: 0.00001 },
      phiLength: { value: Math.PI * 2, min: 0, max: 100, step: 0.00001 },
      thetaStart: { value: 0, min: 0, max: 100, step: 0.00001 },
      thetaLength: { value: Math.PI, min: 0, max: 100, step: 0.00001 },
      color: {value: 'pink'},
      visible: {value: true}
    }
  }, [])

  const control = useControls('sphere', options)  
  const test = useRef(0);


  // Animation setting
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime()
  })

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <>
    <mesh
      ref = {ref}      
      position={[control.x, control.y, control.z]}
      rotation={[control.rotx, control.roty, control.rotz]}
    > 
      <sphereGeometry args={[control.radius, control.widthSegment, control.heightSegment, control.phiStart, control.phiLength, control.thetaStart, control.thetaLength]}/>      
      <meshStandardMaterial visible={control.visible} color={control.color} />
     
    </mesh>
    
    </>
    
 
  )
}