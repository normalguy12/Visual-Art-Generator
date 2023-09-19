import * as THREE from 'three'
import React, {useRef, useEffect, useState } from 'react'
import { useThree, useLoader } from '@react-three/fiber'
import MidiScriptTest from '@/webmidi/midiScriptTest'
// import useStore from './soundCreate'
import createAudio from './soundCreate'


const audioHandler = (set, get) => {
  const mockData = () => ({ signal: false, avg: 0, gain: 1, data: [] })

  const drums = createAudio('/drums.mp3', { threshold: 10, expire: 500 })
  const snare = createAudio('/snare.mp3', { threshold: 40, expire: 500 })
  const synth = createAudio('/synth.mp3')
  return {
    loaded: false,
    // clicked: false,
    audio: { drums: mockData(), snare: mockData(), synth: mockData() },
    track: { synthonly: false, kicks: 0, loops: 0 },
    api: {
      async loaded() {
        set({
          loaded: true,
          audio: {
            drums: await drums,
            snare: await snare,
            synth: await synth,
          },
        })
      },
      start() {
        const audio = get().audio
        const files = Object.values(audio)
        const track = get().track
        files.forEach(({ source }) => source.start(0))
        // set({ clicked: true })
        addEffect(() => {
          files.forEach(({ update }) => update())
          if (audio.drums.signal) track.kicks++
          if (audio.snare.signal) {
            if (track.loops++ > 6) {
              track.synthonly = !track.synthonly
              audio.drums.setGain(track.synthonly ? 0 : 1)
              audio.snare.setGain(track.synthonly ? 0 : 1)
              track.loops = 0
            }
            track.kicks = 0
          }
        })
      },
    },
  }
}

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
