import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from './reducers/AdminReducer'

export const store = configureStore({
  reducer: {
    Admin : AdminReducer
  },
})