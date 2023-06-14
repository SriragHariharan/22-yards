import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from './reducers/AdminReducer'
import EditProductDetails from './reducers/EditProductDetails'

export const store = configureStore({
  reducer: {
    Admin : AdminReducer,
    editProduct: EditProductDetails,
  },
})