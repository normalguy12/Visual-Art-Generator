import { useEffect, useState } from "react"
import store from 'zustand'

function MidiScriptTest(){  
  const log = console.log.bind(console)
  // const keyData = document.getElementById('key_data')
  // const deviceInfoInputs = document.getElementById('inputs')
  // const deviceInfoOutputs = document.getElementById('outputs')
  let midi
  const ua = navigator.userAgent.toLowerCase()
  // if (ua.indexOf('safari') !== -1) {
  //   if (ua.indexOf('chrome') > -1) {
  //     let AudioContext = AudioContext
  //     console.log('Chrome Browser Detected') // Chrome
  //   } else {
  //     let AudioContext = webkitAudioContext
  //     console.log('Safari Browser Detected') // Safari
  //   }
  // }
  const context = new AudioContext()
  const btn = document.getElementsByClassName('button')
  var data
  let cmd
  let channel
  var type
  var note
  var velocity

  // const [test, setTest] = useState({
  //   note: '',
  //   velocity: 0
  // })

  let test = {
    note: '',
    velocity: 0
  }

  // request MIDI access
  // useEffect(()=>{
    
  
  // }, [])

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

  function listInputs (inputs) {
    const input = inputs.value
    log("Input port : [ type:'" + input.type + "' id: '" + input.id + "' manufacturer: '" + input.manufacturer + "' name: '" + input.name + "' version: '" + input.version + "']")
  }

  function noteOn (midiNote, velocity) {
    player(midiNote, velocity)
  }

  function noteOff (midiNote, velocity) {
    player(midiNote, velocity)
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

  // audio functions
  function loadAudio (object, url) {
    // var data = []
    // const loader = useLoader(AudioLoader, audio)
    // const gain = loader.gain()
    // const frequency = loader.AudioAnalyzer();
    // var data1 = [gain, frequency] 
    // data.push(...data, data1)
    // return data
  }

  function addAudioProperties (object) {
    object.name = object.id
    object.source = object.dataset.sound
    loadAudio(object, object.source)
    object.play = function (volume) {
      var s = context.createBufferSource()
      var g = context.createGain()
      var v
      s.buffer = object.buffer
      s.playbackRate.value = randomRange(0.5, 2)
      if (volume) {
        v = rangeMap(volume, 1, 127, 0.2, 2)
        s.connect(g)
        g.gain.value = v * v
        g.connect(context.destination)
      } else {
        s.connect(context.destination)
      }

      s.start()
      object.s = s
    }
  }

  // utility functions
  function randomRange (min, max) {
    return Math.random() * (max + min) + min
  }

  function rangeMap (x, a1, a2, b1, b2) {
    return ((x - a1) / (a2 - a1)) * (b2 - b1) + b1
  }
  // function frequencyFromNoteNumber (note) {
  //   return 440 * Math.pow(2, (note - 69) / 12)
  // }
  return test
}

export default MidiScriptTest