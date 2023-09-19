import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useControls } from 'leva'
import { useGLTF } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three'

function Skeleton(...props) {
  const loader = useGLTF('models/xbot.glb')
  
  return (
    <primitive object={loader.scene}/>
  )
}

export default Skeleton
