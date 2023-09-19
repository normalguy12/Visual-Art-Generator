import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useControls } from 'leva'
import store from '@/redux/store'

export default function Capsule (props) {
  // This reference gives us direct access to the THREE.Mesh object.
  const options = useMemo(()=>{
    return {
      x: { value: 0, min: -20, max: 20, step: 0.00001 },
      y: { value: 0, min: -20, max: 20, step: 0.00001 },
      z: { value: 0, min: -20, max: 20, step: 0.00001 },
      radius: { value: 2, min: 0,max: 100, step: 0.00001},
      length: { value: 2, min: 0, max: 100, step: 0.00001 },
      capSubdivision: { value: 10, min: 0, max: 100, step: 0.00001 },
      radialSegment: { value: 20, min: 0, max: 100, step: 0.00001 },
      color: {value: 'pink'},
      visible: {value: true}
    }
  }, [])

  const control = useControls('capsule', options)

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh      
      position={[control.x, control.y, control.z]}
    > 
      <capsuleGeometry args={[control.radius, control.length]}/>      
      <meshStandardMaterial visible={control.visible} color={control.color} />
    </mesh>
  )
}