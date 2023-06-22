import { createSlice } from "@reduxjs/toolkit";

const setInitialState = () => {
    let lsCart = JSON.parse(localStorage.getItem('22YardsCart'))
    console.log("lsCart", lsCart);
    if(lsCart === null){
        return []
    }else{
        return lsCart
    }

}

const cartSlice = createSlice({
    name:"cart",
    initialState: { cart:setInitialState(), billAmount:JSON.parse(localStorage.getItem('22YardsCartBill')) },
    reducers:{
        NewCartItem : (state, action) => {
            state.cart= [action.payload, ...state.cart]
            localStorage.setItem("22YardsCart", JSON.stringify(state.cart)  )
        },
        ChangeProductQuantity : (state, action) => {
            let productIndex = state.cart.findIndex((item => item.productID == action.payload.productID));
            state.cart[productIndex].quantity = state.cart[productIndex].quantity + action.payload.quantity;
            state.cart[productIndex].totalPrice = state.cart[productIndex].offerPrice * state.cart[productIndex].quantity;
            localStorage.setItem("22YardsCart", JSON.stringify(state.cart)  )
        },
        RemoveCartItem : (state, action) => {
            state.cart = state.cart.filter(item => item.productID !== action.payload);
            localStorage.setItem("22YardsCart", JSON.stringify(state.cart)  )
        },
        SetCartTotal : (state, action) => {
            state.billAmount = action.payload; 
            console.log("Bill :::",state.billAmount);
            localStorage.setItem("22YardsCartBill", JSON.stringify(state.billAmount)  )
        },
        DeleteCart :(state, action) => {
            state.billAmount=null;
            state.cart=null;
            localStorage.setItem("22YardsCartBill", JSON.stringify(state.billAmount)  )
            localStorage.setItem("22YardsCart", JSON.stringify(state.billAmount)  )
        }
    }
})

export default cartSlice.reducer;

//action creators 
export const { NewCartItem, ChangeProductQuantity, RemoveCartItem, SetCartTotal, DeleteCart } = cartSlice.actions;