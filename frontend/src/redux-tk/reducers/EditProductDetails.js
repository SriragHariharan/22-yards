import { createSlice } from "@reduxjs/toolkit";

const editProductSlice = createSlice({
    name:"editProduct",
    initialState:{
        productDetails:null
    },
    reducers:{
        setProductDetails : (state, action) => {
            state.productDetails = action.payload;
        },
        removeProductDetails :(state, action ) => {
            state.productDetails = null;
        },
        editProductName : (state, action) => {
            state.productDetails.productName = action.payload
        },
        editProductPrice : (state, action) => {
            state.productDetails.offerPrice = action.payload            
        }
    }
})

export default editProductSlice.reducer

//action creators

export const {setProductDetails, removeProductDetails, editProductName, editProductPrice} = editProductSlice.actions