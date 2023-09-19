import clock from './clock'
import { NUM_ABLETON_MIDI_CHANNELS } from './constants'

const NoteMapping = {
  on: false,
  startedAt: 0.0,
  endedAt: 0.0,
  noteOnVelocity: 0.0,
  noteOffVelocity: 0.0,
}

/* eslint-disable-next-line */
const MIDI_NOTE_ON = 144
/* eslint-disable-next-line */
const MIDI_NOTE_OFF = 128

const NUM_LAST_NOTES = 5

const {WebMidi} = require("webmidi");

class WebMidiWrapper {
  constructor() {
    this.keyboard = null

    this.notesCurrentlyDown = new Array(10).fill(false)

    this.numNotesCurrentlyDown = 0
    this.noteOnListeners = {}
    this.noteOffListeners = {}

    this.lastNoteOnStartedAt = 0.0

    this.noteArray = {}

    // for an 88 key Roland FP 30
    for (let i = 21; i < 108; ++i) {
      this.noteArray[i] = Object.assign({}, NoteMapping)
    }

    // stores last `NUM_LAST_NOTES` notes played
    // should not write anything to this directly, because
    // it's a circular queue but looks like an array.
    this.lastNotes = []
    
    WebMidi.enable(err => {
      if (err) {
        console.log('WebMid could not be enabled: ', err)
        return
      }

      if (WebMidi.inputs.length === 0) {
        return
      }

      //this.keyboard = WebMidi.inputs[0]
      this.keyboard = WebMidi.getInputByName('Launchkey MIDI') || WebMidi.getInputByName('MIDIIN2 (Launchkey MIDI)') || null
      if (this.keyboard) {
        this.keyboard.addListener('noteon', 'all', this.noteOn)
        this.keyboard.addListener('noteoff', 'all', this.noteOff)
      }

      this.abletonNoteOnListeners = []
      this.abletonNoteOffListeners = []
      this.abletonControlChangeListeners = []
      for (let i = 0; i < NUM_ABLETON_MIDI_CHANNELS; ++i) {
        this.abletonNoteOnListeners.push({})
        this.abletonNoteOffListeners.push({})
        this.abletonControlChangeListeners.push({})
      }

      this.ableton = WebMidi.getInputByName('loopMIDI Port IN')
      if (this.ableton) {
        this.ableton.addListener('noteon', 'all', this.abletonNoteOn)
        this.ableton.addListener('noteoff', 'all', this.abletonNoteOff)
        this.ableton.addListener('controlchange', 'all', this.abletonControlSignal)
      }
    }, true)
  }

  abletonControlSignal = event => {
    let { channel } = event
    channel--
    const controlChangeListenerNames = Object.keys(this.abletonControlChangeListeners[channel])
    controlChangeListenerNames.forEach(listenerName => {
      if (listenerName === 'undefined') {
        console.error('Attempted to access undefined listener name.')
      } else {
        const entry = this.abletonControlChangeListeners[channel][listenerName]
        if (entry instanceof Function) {
          entry(event)
        } else if (entry instanceof Array) {
          for (let i = 0; i < entry.length; ++i) {
            entry[i](event)
          }
        }
      }
    })
  }

  abletonNoteOn = event => {
    let { channel } = event
    channel--
    const noteOnListenerNames = Object.keys(this.abletonNoteOnListeners[channel])
    noteOnListenerNames.forEach(listenerName => {
      if (listenerName === 'undefined') {
        console.error('Attempted to access undefined listener name.')
      } else {
        const { note } = event
        const entry = this.abletonNoteOnListeners[channel][listenerName]
        if (entry instanceof Function) {
          entry(note)
        } else if (entry instanceof Array) {
          for (let i = 0; i < entry.length; ++i) {
            entry[i](note)
          }
        }
      }
    })
  }

  abletonNoteOff = event => {
    let { channel } = event
    channel--
    const noteOffListenerNames = Object.keys(this.abletonNoteOffListeners[channel])
    noteOffListenerNames.forEach(listenerName => {
      if (listenerName === 'undefined') {
        console.error('Attempted to access undefined listener name.')
      } else {
        const { note } = event
        const entry = this.abletonNoteOffListeners[channel][listenerName]
        if (entry instanceof Function) {
          entry(note)
        } else if (entry instanceof Array) {
          for (let i = 0; i < entry.length; ++i) {
            entry[i](note)
          }
        }
      }
    })
  }

  noteOn = event => {
    const {
      note: { number },
    } = event

    // edge case for VMPK
    if (event.timestamp === 0) {
      event.timestamp = clock.getElapsedTime() * 1000
    }

    this.noteArray[number].number = number
    this.noteArray[number].on = true
    this.noteArray[number].startedAt = event.timestamp / 1000.0
    this.noteArray[number].noteOnVelocity = event.velocity

    this.noteArray[number].endedAt = 0.0
    this.noteArray[number].noteOffVelocity = 0.0

    if (this.lastNotes.length >= NUM_LAST_NOTES) {
      this.lastNotes.shift()
    }
    this.lastNotes.push(number)
    this.lastNoteOnStartedAt = this.noteArray[number].startedAt

    this.numNotesCurrentlyDown++
    const idx = this.notesCurrentlyDown.indexOf(number)
    if (idx === -1) {
      let ctr = 0
      while (ctr !== 10) {
        if (this.notesCurrentlyDown[ctr] === false) {
          this.notesCurrentlyDown[ctr] = number
          break
        }
        ++ctr
      }
    }

    const noteOnListenerNames = Object.keys(this.noteOnListeners)
    noteOnListenerNames.forEach(listenerName => {
      if (listenerName === 'undefined') {
        console.error('Attempted to access undefined listener name.')
      } else {
        const entry = this.noteOnListeners[listenerName]
        if (entry instanceof Function) {
          entry(this.noteArray[number])
        } else if (entry instanceof Array) {
          for (let i = 0; i < entry.length; ++i) {
            entry[i](this.noteArray[number])
          }
        }
      }
    })
  }

  noteOff = event => {
    const {
      note: { number },
    } = event

    this.noteArray[number].number = number
    this.noteArray[number].on = false
    this.noteArray[number].endedAt = event.timestamp / 1000.0
    this.noteArray[number].noteOffVelocity = event.velocity

    //this.noteArray[number].startedAt = 0.0
    this.noteArray[number].noteOnVelocity = 0.0

    this.numNotesCurrentlyDown--
    const idx = this.notesCurrentlyDown.indexOf(number)
    if (idx !== -1) {
      this.notesCurrentlyDown[idx] = false
    }

    const noteOffListenerNames = Object.keys(this.noteOffListeners)
    noteOffListenerNames.forEach(listenerName => {
      if (listenerName === 'undefined') {
        console.error('Attempted to access undefined listener name.')
      } else {
        const entry = this.noteOffListeners[listenerName]
        if (entry instanceof Function) {
          entry(this.noteArray[number])
        } else if (entry instanceof Array) {
          for (let i = 0; i < entry.length; ++i) {
            entry[i](this.noteArray[number])
          }
        }
      }
    })
  }

  // remember that Ableton is index base-1
  // the CALLER is expected to pass the correct `channel` to this function.
  addAbletonListener = (event, listener, channel, listenerName) => {
    if (event === 'noteon') {
      // this conditional is to fix a
      // weird bug where this.abletonNoteOnListeners is not defined sometimes.
      if (!this.abletonNoteOnListeners) return

      const channelEntries = this.abletonNoteOnListeners[channel]
      const entry = channelEntries[listenerName]
      // if entry exists already
      if (entry !== undefined) {
        if (entry instanceof Array) {
          // if there is already a list of functions
          entry.push(listener)
        } else if (entry instanceof Function) {
          // if there is only one function
          const newEntry = [entry, listener]
          this.abletonNoteOnListeners[channel][listenerName] = newEntry
        }
      } else {
        this.abletonNoteOnListeners[channel][listenerName] = listener
      }
    } else if (event === 'noteoff') {
      const entry = this.abletonNoteOffListeners[channel][listenerName]
      // if entry exists already
      if (entry !== undefined) {
        if (entry instanceof Array) {
          entry.push(listener)
        } else if (entry instanceof Function) {
          const newEntry = [entry, listener]
          this.abletonNoteOffListeners[channel][listenerName] = newEntry
        }
      } else {
        this.abletonNoteOffListeners[channel][listenerName] = listener
      }
    } else if (event === 'controlchange') {
      const entry = this.abletonControlChangeListeners[channel][listenerName]
      // if entry exists already
      if (entry !== undefined) {
        if (entry instanceof Array) {
          entry.push(listener)
        } else if (entry instanceof Function) {
          const newEntry = [entry, listener]
          this.abletonControlChangeListeners[channel][listenerName] = newEntry
        }
      } else {
        this.abletonControlChangeListeners[channel][listenerName] = listener
      }
    }
  }

  // z. B. addListener('noteon', listener, listenerName)
  addListener(event, listener, listenerName) {
    if (event === 'noteon') {
      const entry = this.noteOnListeners[listenerName]
      // if entry exists already
      if (entry !== undefined) {
        if (entry instanceof Array) {
          entry.push(listener)
        } else if (entry instanceof Function) {
          const newEntry = [entry, listener]
          this.noteOnListeners[listenerName] = newEntry
        }
      } else {
        this.noteOnListeners[listenerName] = listener
      }
    } else if (event === 'noteoff') {
      const entry = this.noteOffListeners[listenerName]
      // if entry exists already
      if (entry !== undefined) {
        if (entry instanceof Array) {
          entry.push(listener)
        } else if (entry instanceof Function) {
          const newEntry = [entry, listener]
          this.noteOffListeners[listenerName] = newEntry
        }
      } else {
        this.noteOffListeners[listenerName] = listener
      }
    } else {
      this.keyboard.addListener(event, 'all', listener)
    }
  }

  onNotePress(fn, noteNumber) {
    const listenerName = `MIDI#${noteNumber}Press`
    this.addListener(
      'noteon',
      note => {
        if (note.number === noteNumber) {
          fn(note)
        }
      },
      listenerName
    )
  }

  onNoteRelease(fn, noteNumber) {
    this.addListener(
      'noteoff',
      note => {
        if (note.number === noteNumber) {
          fn(note)
        }
      },
      `MIDI#${noteNumber}Release`
    )
  }
}

const MidiControl = new WebMidiWrapper()
export default MidiControl