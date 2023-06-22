import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from './reducers/AdminReducer'
import EditProductDetails from './reducers/EditProductDetails'
import CartReducer from './reducers/CartReducer'

export const store = configureStore({
  reducer: {
    Admin : AdminReducer,
    editProduct: EditProductDetails,
    cart : CartReducer,
  },
})