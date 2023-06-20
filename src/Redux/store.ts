import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import filterReducer from './filter/slice'
import gainersReducer from './gainersDate/slice'
import notificationReducer from './notification/slice'
import dataUserReducer from './user/userSlice'

const rootReducer = combineReducers({
  filters: filterReducer,
  gainers: gainersReducer,
  notification: notificationReducer,
  user: dataUserReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
