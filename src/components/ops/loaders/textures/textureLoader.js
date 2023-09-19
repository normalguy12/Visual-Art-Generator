import React from 'react'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const textureLoader = () => {

  const texture = useLoader(THREE.TextureLoader, 'PavingStones092_1K_Color.jpg') //example for 1 texture
  return texture
}

export default textureLoader
