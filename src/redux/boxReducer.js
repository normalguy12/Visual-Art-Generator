import { createSlice } from '@reduxjs/toolkit'

export const boxSlice = createSlice({
  name: 'box',
  initialState: {
    x: 1,
    y: 1,
    z: 1
  },
  reducers:{
    updateState(state, action){
      state.x = action.payload.x
      state.y = action.payload.y
      state.z = action.payload.x
    }
  }
})

export const { updateState } = boxSlice.actions

export default boxSlice.reducer

