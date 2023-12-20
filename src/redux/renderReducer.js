import { createSlice } from '@reduxjs/toolkit'

export const renderSlice = createSlice({
  name: 'renderItem',
  initialState: {
    value: [],
    count: 0,
  },
  reducers: {
    getRenderItem: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return{
        ...state,
        value: [...state.value, action.payload],
      }
    },
    getCount: (state) =>{
      state.count += 1
    },
    getUpdate: (state, action) =>{
      let arr = action.payload
      return{
        ...state,
        value: arr
      }
    }
  }
})

export const { getRenderItem, getCount, getUpdate } = renderSlice.actions

export default renderSlice.reducer

