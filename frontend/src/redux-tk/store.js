import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from './reducers/AdminReducer'
import EditProductDetails from './reducers/EditProductDetails'
import CartReducer from './reducers/CartReducer'
import UserReducer from './reducers/UserReducer'

export const store = configureStore({
  reducer: {
    Admin : AdminReducer,
    editProduct: EditProductDetails,
    cart : CartReducer,
    User: UserReducer
  },
})