import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type IFilterSlice = {
  helpTypeUuid?: string
  city?: string
  dateInterval?: string
}
const initialState: IFilterSlice = {
  helpTypeUuid: '',
  city: '',
  dateInterval: '',
}
export const filterSlice = createSlice({
  name: 'filters_slice',
  initialState,
  reducers: {
    setHelpTypeId(state, action) {
      state.helpTypeUuid = action.payload
    },
    setLocation(state, action) {
      state.city = action.payload
    },

    setIntervalDate(state, action) {
      state.dateInterval = action.payload
    },
    resetActions(state) {
      state.helpTypeUuid = initialState.helpTypeUuid
      state.city = initialState.city
      state.dateInterval = initialState.dateInterval
      console.log(initialState.dateInterval)
    },
  },
})

export const { setHelpTypeId, setLocation, setIntervalDate, resetActions } = filterSlice.actions
export const selectFilters = (state: RootState) => {
  return state.filters
}

export default filterSlice.reducer
