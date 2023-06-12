import { createSlice } from '@reduxjs/toolkit'
import { IClient } from '../../types/client-types'
import type { RootState } from '../store'

const initialState: {
  messageNotification: ''
  errorNotification: ''
} = {
  messageNotification: '',
  errorNotification: '',
}

export const notificationSlice = createSlice({
  name: 'notification_slice',
  initialState: initialState,
  reducers: {
    setMessageNotification: (state, action) => {
      state.messageNotification = action.payload
    },
    setErrorNotification: (state, action) => {
      state.errorNotification = action.payload
    },
    resetMessageNotification: (state) => {
      state.messageNotification = initialState.messageNotification
    },
    resetErrorNotification: (state) => {
      state.errorNotification = initialState.errorNotification
    },
  },
})
export const {
  setMessageNotification,
  resetMessageNotification,
  setErrorNotification,
  resetErrorNotification,
} = notificationSlice.actions
export const selectorNotification = (state: RootState) => {
  return state.notification
}
export default notificationSlice.reducer
