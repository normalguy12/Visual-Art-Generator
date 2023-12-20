import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import useStore from '../loaders/sounds/soundCreate'

function DancingDot() {
  const { drums, snare } = useStore((state) => state.audio)
  const api = useStore((state) => state.api)
  useEffect(() => api.loaded(), [])
  const dot = useRef()
  useFrame((_) =>
    dot.current.rotation.set(Math.sin(_.clock.elapsedTime * 2) / 10 + (drums.avg * drums.gain) / 100, _.clock.elapsedTime + (snare.avg * snare.gain) / 100, 0),
  )
  return (
    <group ref={dot}>
      <mesh position={[-1, 0.25, 0]}>
        <sphereGeometry args={[0.03, 32, 32]} />
        <meshBasicMaterial toneMapped={false} color="black" />
      </mesh>
    </group>
  )
}
export default DancingDot