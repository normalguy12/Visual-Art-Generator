import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

import store from '@/redux/store'

import { Model } from './ops/skeleton/Xbot.jsx'
import Sound from './ops/loaders/sounds/soundLoader.js'
import Testing from './ops/loaders/object/test.js'

extend({ Stats, OrbitControls })

export function RenderPlace( {selectedRender} ) {
  
  return (
    <>
    <Canvas camera={{position: [0, 0, 3]}}>
      <color attach="background" args={['black']} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />      
      <pointLight position={[-10, -10, -10]} />    


     
      {store.getState().renderGet.value.map(comp=>comp)}
      <Model/>
      <mesh>
      {/* <Sound url='/loophouse.wav'/>    */}
      </mesh>
      <axesHelper/>
      <Stats/>
      <OrbitControls/>    
    </Canvas>
    </>
    // <>
    //   <Testing/>
    // </>
  )
}