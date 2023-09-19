import { Component, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useMemo } from 'react'
import { color } from 'framer-motion'
import store from '@/redux/store'
import MidiScript from '@/webmidi/midiScript'
function handleSeparate(){
  
}

export default class Box extends Component {
  
  constructor(props){
    super(props);
    this.id = 
    this.options = {
      x: 1,
      y: 1,
      z: 1
    };
    this.test = this.test.bind(this);
  }
  test = (e) =>{
    e.preventDefault()
    this.options.x = store.getState().midiGet.value
    return this.options.x;
  }
  render(){
    return (
      <>
      <mesh      
        // {...props}
        // ref={ref}
        // scale={clicked ? 1.5 : 1}
        // onClick={(event) => click(!clicked)}
        // onPointerOver={(event) => hover(true)}
        // onPointerOut={(event) => hover(false)}
        position={[this.options.x, this.options.y, this.options.z]}
      > 
        <boxGeometry args={[1, 1, 1]} />      
        <meshStandardMaterial color='pink' />    
        
      </mesh>
     
      </>
    )
  }
  
}