import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import useStore from '../loaders/sounds/soundCreate'
import { useGLTF, useAnimations, Reflector, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
const HPI = Math.PI / 2
const vec = new THREE.Vector3()
const obj = new THREE.Object3D()
const red = new THREE.Color('#900909')


function Bust() {

  const control = useControls('Bust', {
    x: { value: 0, min: -20, max: 20, step: 0.00001 },
    y: { value: 0, min: -20, max: 20, step: 0.00001 },
    z: { value: 0, min: -20, max: 20, step: 0.00001 },
    visible: {value: true}
  })

  const api = useStore((state) => state.api)
  useEffect(() => api.loaded(), [])
  const ref = useRef()
  const time = useRef(0)
  const { scene, animations, materials } = useGLTF('/models/bust.glb')
  const { actions, mixer } = useAnimations(animations, ref)
  const { drums } = useStore((state) => state.audio)
  const track = useStore((state) => state.track)
  // Play all actions (the fragments flying off)
  useEffect(() => Object.keys(actions).forEach((key) => actions[key].play()), [])
  // Control the exploding statue and the inner materials color
  useFrame((_) => {
    mixer.timeScale = track.synthonly ? 0.125 : 1
    if (!track.synthonly) mixer.setTime((time.current = THREE.MathUtils.lerp(time.current, track.kicks * 1.25, track.kicks === 0 ? 0.25 : 0.15)))
    materials.inner.color.copy(red).multiplyScalar((drums.avg * drums.gain) / 30)
  })
  return <primitive visible={control.visible} scale={[0.2, 0.2, 0.2]} position={[control.x, control.y, control.z]} rotation={[0, -2.4, 0]} ref={ref} object={scene} />
}

export default Bust
