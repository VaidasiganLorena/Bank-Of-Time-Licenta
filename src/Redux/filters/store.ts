import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import filterReducer from './slice'

const rootReducer = combineReducers({
  filters: filterReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
