import { createSlice } from '@reduxjs/toolkit'

export const midiSlice = createSlice({
  name: 'midiData',
  initialState: {
    value: 0,
  },
  reducers: {
    getMIDIdata: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
  }
})

export const { getMIDIdata } = midiSlice.actions

export default midiSlice.reducer

