import { createSlice } from '@reduxjs/toolkit'

export const idSlice = createSlice({
  name: 'id',
  initialState: {
    value: ''
  },
  reducers: {
    getID: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    }
  }
})

export const { getID } = idSlice.actions

export default idSlice.reducer

