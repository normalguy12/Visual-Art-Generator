import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

import store from '@/redux/store'

import { Model } from './ops/models/Xbot.jsx'
import DancingDot from './ops/models/dancingDot.js'
import { useControls } from 'leva'
import Explosion from './ops/models/explosion.js'
import Bust from './ops/models/bust.js'
import Particle from './ops/models/particles.js'
import WebMidiTest from '@/webmidi/webmidiTest.js'
extend({ Stats, OrbitControls })

export default function RenderPlace( {selectedRender} ) {
  
  const control = useControls('Main Canvas', {
    color: {value: 'black'},
    rotate: {value: false}
  })

  console.log(store.getState().renderGet.value)

  return (
    <>
    <Canvas camera={{position: [0, 0, 3]}}>
      <color attach="background" args={[control.color]} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />      
      {/* <pointLight position={[-10, -10, -10]} />     */}
      {/* <Particle/>
      <DancingDot/>
      <Bust/>
      <Explosion/>
      <Model/> */}
      {store.getState().renderGet.value.map(comp=>comp.element())}
      
      <mesh>
      {/* <Sound url='/loophouse.wav'/>    */}
      </mesh>
      <axesHelper/>
      <Stats/>
      <OrbitControls autoRotate={control.rotate}/>
    </Canvas>

    </>
    // <>
    //   <Testing/>
    // </>
  )
}