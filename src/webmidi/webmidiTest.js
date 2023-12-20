'use client'

import { useEffect, useState, memo } from "react"
import store from "@/redux/store"
import MidiScript from "./midiScript"

function WebMidiTest(){  
  
  let velocity;

  const test = MidiScript()

  useEffect(()=>{
    const log = console.log.bind(console)
  let midi
  const context = new (window.AudioContext || window.webkitAudioContext)()
  const btn = document.getElementsByClassName('button')
  var data
  let cmd
  let channel
  var type
  var note
  var velocity
  let samplepaths

  // const [test, setTest] = useState({
  //   note: '',
  //   velocity: 0
  // })



  let test = {
    note: '',
    velocity: 0
  }

  let samples = ['/kick.wav', '/snare.wav', '/synth.mp3', '_.mp3', '/isaiah.mp3', '/rooting.mp3']
  // samples.push(`/${store.getState().audioGet.value}`)
  
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
      sysex: false
    }).then(onMIDISuccess, onMIDIFailure)
  } else {
    alert('No MIDI support in your browser.')
  }

  // add event listeners
  // document.addEventListener('keydown', keyController)
  // document.addEventListener('keyup', keyController)
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('mousedown', clickPlayOn)
    btn[i].addEventListener('mouseup', clickPlayOff)
  }
  // prepare audio files
  for (let i = 0; i < btn.length; i++) {
    addAudioProperties(btn[i])
  }

  const sampleMap = {
    key60: 1,
    key61: 2,
    key62: 3,
    key63: 4,
    key64: 5,
    key65: 6,
    key66: 7,
    key67: 8,
    key68: 9,
    key69: 10,
    key70: 11,
    key70: 12
  }
  // user interaction
  function clickPlayOn (e) {
    e.target?.classList.add('active')
    e.target?.play()
  }

  function clickPlayOff (e) {
    e.target?.classList.remove('active')
  }

  // midi functions
  function onMIDISuccess (midiAccess) {
    midi = midiAccess
    const inputs = midi.inputs.values()
    // loop through all inputs
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      // listen for midi messages
      input.value.onmidimessage = onMIDIMessage
      listInputs(input)
    }
    // listen for connect/disconnect message
    midi.onstatechange = onStateChange
  }

  function onMIDIFailure (e) {
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e)
  }

  function onMIDIMessage (event) {
    data = event.data
    cmd = data[0] >> 4
    channel = data[0] & 0xf
    type = data[0] & 0xf0 // channel agnostic message type. Thanks, Phil Burk.
    note = data[1]
    velocity = data[2]
    // with pressure and tilt off
    // note off: 128, cmd: 8
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11:
    // bend: 224, cmd: 14
    log('MIDI data', data)

    // Display Midi Notes  
    switch (type) {
      case 144: // noteOn message
        noteOn(note, velocity)
        break
      case 128: // noteOff message
        noteOff(note, velocity)
        break
    }
    // setTest({
    //   note: note,
    //   velocity: velocity
    // })
    test.note = note;
    test.velocity = velocity;
  }

  function onStateChange (event) {
    const port = event.port
    const state = port.state
    const name = port.name
    const type = port.type
    if (type === 'input') {
      log('name', name, 'port', port, 'state', state)
    }
  }

  function midiToFreq(number){
    const a =440;
    return (a/32) * (2 ** ((number-9)/12))
  }

  function listInputs (inputs) {
    const input = inputs.value
    log("Input port : [ type:'" + input.type + "' id: '" + input.id + "' manufacturer: '" + input.manufacturer + "' name: '" + input.name + "' version: '" + input.version + "']")
  }

  function noteOn (midiNote, velocity) {
    player(midiNote, velocity)
    setupSamples(samples).then((response)=>{
      samplepaths = response;
      console.log(samplepaths)
      switch(midiNote){
        case (36):{
          playSample(samplepaths[0], 0)
          break;
        }
        case (37):{
          playSample(samplepaths[1], 0)
          break;
        }
        case (38):{
          playSample(samplepaths[2], 0)
          break;
        }
        case (39):{
          playSample(samplepaths[3], 0)
          break;
        }
        case (44):{
          playSample(samplepaths[4], 0)
          break;
        }
        case (45):{
          playSample(samplepaths[5], 0)
          break;
        }
      }
    })
    
  }

  function noteOff (midiNote, velocity) {
    player(midiNote, velocity)
    // drums.gain.disconnect()
    // const drumGain = drums.gain
    // drums.source.stop();
  }

  function player (note, velocity) {
    const sample = sampleMap['key' + note]
    if (sample) {
      if (type === (0x80 & 0xf0) || velocity === 0) {
        // needs to be fixed for QuNexus, which always returns 144
        btn[sample - 1]?.classList.remove('active')
        return
      }
      btn[sample - 1]?.classList.add('active')
      btn[sample - 1]?.play(velocity)
    }
  }

  async function getFile(url) {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await context.decodeAudioData(arrayBuffer)
    return audioBuffer
   }
   
   async function setupSamples(paths){
     const audioBuffers = []
   
     for(const path of paths){
       const sample = await getFile(path)
       audioBuffers.push(sample)
     }
     return audioBuffers
   }
   
   function playSample(audioBuffer, time){
     const sampleSource = context.createBufferSource();
     const gain = context.createGain()
     gain.gain.value = 0.4;
     sampleSource.buffer = audioBuffer
     sampleSource.connect(gain)
     gain.connect(context.destination)
    //  sampleSource.resume()
     sampleSource.start(time)
   }
  }, [test.velocity])

  return (
    <>
    </>
  )
}

export default WebMidiTest