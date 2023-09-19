import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useControls } from 'leva'
import store from '@/redux/store'
import { Euler } from 'three'

export default function Octa (props) {
  // This reference gives us direct access to the THREE.Mesh object.
  const options = useMemo(()=>{
    return {
      x: { value: 0, min: -20, max: 20, step: 0.00001 },
      y: { value: 0, min: -20, max: 20, step: 0.00001 },
      z: { value: 0, min: -20, max: 20, step: 0.00001 },
      rotx: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001 },
      roty: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      rotz: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
      radius : { value: 1, min: 0,max: 100, step: 0.00001},
      detail : { value: 0, min: 0, max: 100, step: 1 },
      
      color: {value: 'blue'},
      visible: {value: true}
    }
  }, [])

  const control = useControls('Octahedron', options)

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh      
      position={[control.x, control.y, control.z]}
      rotation={[control.rotx, control.roty, control.rotz]}
    > 
      <octahedronGeometry args={[control.radius, control.detail]}/>      
      <meshStandardMaterial visible={control.visible} color={control.color} />
    </mesh>
  )
}