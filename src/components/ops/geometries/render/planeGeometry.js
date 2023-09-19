import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useControls } from 'leva'
import store from '@/redux/store'
import { Euler } from 'three'

export default function Plane (props) {
  // This reference gives us direct access to the THREE.Mesh object.
  const options = useMemo(()=>{
    return {
      x: { value: 0, min: -20, max: 20, step: 0.00001 },
      y: { value: 0, min: -20, max: 20, step: 0.00001 },
      z: { value: 0, min: -20, max: 20, step: 0.00001 },
      rotx: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001 },
      roty: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      rotz: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      width: { value: 2, min: 0,max: 100, step: 0.00001},
      height: { value: 2, min: 0, max: 100, step: 0.00001 },
      widthSegment: { value: 1, min: 0, max: 100, step: 0.00001 },
      heightSegment: { value: 1, min: 0, max: 100, step: 0.00001 },
      color: {value: 'blue'},
      visible: {value: true}
    }
  }, [])

  const control = useControls('plane', options)

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh      
      position={[control.x, control.y, control.z]}
      rotation={[control.rotx, control.roty, control.rotz]}
    > 
      <planeGeometry args={[control.width, control.height, control.widthSegment, control.heightSegment]}/>      
      <meshStandardMaterial visible={control.visible} color={control.color} />
    </mesh>
  )
}