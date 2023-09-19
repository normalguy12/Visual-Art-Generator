import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { useControls } from 'leva'
import store from '@/redux/store'

export default function Circle (props) {
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
      segments: { value: 32, min: 0, max: 128, step: 0.00001 },
      thetaStart: { value: 10, min: 0, max: Math.PI*2, step: 0.00001 },
      thetaLength: { value: 20, min: 0, max: Math.PI*2, step: 0.00001 },
      color: {value: 'pink'},
      visible: {value: true}
    }
  }, [])

  const control = useControls('circle', options)

  // Return the view.
  // These are regular three.js elements expressed in JSX.
  return (
    <mesh      
      position={[control.x, control.y, control.z]}
      rotation = {[control.rotx, control.roty, control.rotz]}
    > 
      <circleGeometry args={[control.radius, control.segments]}/>      
      <meshStandardMaterial visible={control.visible} color={control.color} />
         
    </mesh>
  )
}