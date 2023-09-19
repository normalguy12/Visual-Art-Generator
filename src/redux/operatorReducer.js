import { createSlice } from '@reduxjs/toolkit'

export const operatorSlice = createSlice({
  name: 'renderItem',
  initialState: {
    value: []
  },
  reducers: {
    getNodeItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return{
        ...state,
        value: [...state.value, action.payload]
      }
    }
  }
})

export const { getNodeItem } = operatorSlice.actions

export default operatorSlice.reducer

