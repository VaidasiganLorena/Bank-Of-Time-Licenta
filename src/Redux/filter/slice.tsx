import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type IFilterSlice = {
  helpTypes?: number
  city?: string
  periods?: string
  startDate?: string
  endDate?: string
}
const initialState: IFilterSlice = {
  helpTypes: undefined,
  city: undefined,
  startDate: undefined,
  endDate: undefined,
}
export const filterSlice = createSlice({
  name: 'filters_slice',
  initialState,
  reducers: {
    setHelpTypeId(state, action) {
      state.helpTypes = action.payload
    },
    setLocation(state, action) {
      state.city = action.payload
    },
    setStartDate(state, action) {
      state.periods = action.payload
    },
    setEndDate(state, action) {
      state.periods = action.payload
    },
    resetActions(state) {
      state.helpTypes = undefined
      state.city = undefined
      state.periods = undefined
    },
  },
})

export const { setHelpTypeId, setLocation, setStartDate, setEndDate, resetActions } =
  filterSlice.actions
export const selectFilters = (state: RootState) => {
  return state.filters
}

export default filterSlice.reducer
