import { createSlice } from '@reduxjs/toolkit'
import { IGainer } from '../../types/typeGainer'
import type { RootState } from '../store'

const initialState: {
  gainersEntriesData: IGainer[]
} = {
  gainersEntriesData: [],
}

export const gainersSlice = createSlice({
  name: 'gainers_slice',
  initialState: initialState,
  reducers: {
    setGainers: (state, action) => {
      state.gainersEntriesData = action.payload
    },
  },
})
export const { setGainers } = gainersSlice.actions
export const selectorClients = (state: RootState) => {
  return state.gainers
}
export default gainersSlice.reducer
