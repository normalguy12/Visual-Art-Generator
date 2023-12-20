import * as THREE from 'three'
import React, {useRef, useEffect, useState } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import MidiScriptTest from '@/webmidi/midiScriptTest'
// import useStore from './soundCreate'


function Sound({ url }) {
  const test = MidiScriptTest();

  const {drums} = audioHandler().audio

  const sound = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)

  const data = createAudio(url, { threshold: 10, expire: 500 })

  useEffect(() => {
    // sound.current.setBuffer(buffer)
    // sound.current.setRefDistance(1)
    // sound.current.setLoop(true)
    // sound.current.play()
    
    // const data = createAudio(url, { threshold: 10, expire: 500 })
    camera.add(listener)
    // console.log(data)
    // analyzer.getAverageFrequency()
    return () => camera.remove(listener)    
  }, [])

  console.log(drums)

  return <positionalAudio ref={sound} args={[listener]} />
}

export default Sound
