import { createSlice } from '@reduxjs/toolkit'

export const animationSlice = createSlice({
  name: 'animation',
  initialState: {
    value: [],
  },
  reducers: {
    getAnimation: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return{
        ...state,
        value: [...state.value, action.payload]
      }
    },
  }
})

export const { getAnimation } = animationSlice.actions

export default animationSlice.reducer

