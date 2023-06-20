import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState: {
  userData: {
    firstname: string
    lastname: string
    email: string
    phoneNumber: string
    city: string
    gender: string
    photo: string
  }
} = {
  userData: {
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    city: '',
    gender: '',
    photo: '',
  },
}

export const userDataSlice = createSlice({
  name: 'user_data_slice',
  initialState: initialState,
  reducers: {
    setDataUser: (state, action) => {
      state.userData = action.payload
    },
  },
})
export const { setDataUser } = userDataSlice.actions
export const selectorClients = (state: RootState) => {
  return state.user
}
export default userDataSlice.reducer
