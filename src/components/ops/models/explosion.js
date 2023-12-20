import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import useStore from '../loaders/sounds/soundCreate'
import { useGLTF, useAnimations, Reflector, useTexture } from '@react-three/drei'
import MidiScript from '@/webmidi/midiScript'
import { useControls } from 'leva'
const HPI = Math.PI / 2
const vec = new THREE.Vector3()
const obj = new THREE.Object3D()
const red = new THREE.Color('#900909')

function Explosion({ beat, ...props }) {

  const test = MidiScript()

  const api = useStore((state) => state.api)
  useEffect(() => api.loaded(), [])

  const control = useControls('Explosion', {
    x: { value: 0, min: -20, max: 20, step: 0.00001 },
    y: { value: 0, min: -20, max: 20, step: 0.00001 },
    z: { value: 0, min: -20, max: 20, step: 0.00001 },
    visible: {value: true}
  })

  const [state] = useState({ size: 0, signal: 0 })
  const sceneRef = useRef()
  const instance = useRef()
  const sphere = useRef()
  // The GLTF only contains a point-cloud and baked keyframes for the explosion
  const { scene: originalScene, animations } = useGLTF('/models/explosion.glb')
  const scene = useMemo(() => originalScene.clone(true), [originalScene])
  const { actions, mixer } = useAnimations(animations, sceneRef)
  const { drums, snare } = useStore((state) => state.audio)
  const track = useStore((state) => state.track)
  mixer.timeScale = 2
  // Can reset and play all actions
  const play = () =>
    Object.keys(actions).forEach((key) => {
      actions[key].setLoop(THREE.LoopOnce).stop().reset()
      actions[key].play()
    })
  // Control the sphere and the sparks
  useFrame(() => {
    if (drums.signal && track.kicks - 1 === beat && drums.gain && test.velocity > 0) play((state.size = 1))
    if (snare.signal) state.size = 0
    sphere.current.scale.lerp(vec.set(state.size * drums.gain, state.size * drums.gain, state.size * drums.gain), 0.2)
    sphere.current.children[0].intensity = drums.avg * drums.gain * 10
    // This code transforms the empty GLTF nodes into a single drawcall via instancing
    sceneRef.current.children.forEach((node, i) => instance.current.setMatrixAt(i, node.matrix))
    instance.current.visible = !!drums.gain
    instance.current.instanceMatrix.needsUpdate = true
  })
  return (
    <group position={[control.x, control.y, control.z]} {...props}>
      <mesh ref={sphere}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.95} />
        <pointLight color="red" distance={0.5} />
      </mesh>
      <group scale={[3, 3, 3]}>
        <primitive ref={sceneRef} object={scene} />
        <instancedMesh ref={instance} args={[null, null, originalScene.children.length]}>
          <circleGeometry args={[0.15, 0]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
      </group>
    </group>
  )
}

export default Explosion