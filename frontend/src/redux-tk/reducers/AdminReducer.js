import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:"Admin",
    initialState : {seller:JSON.parse(localStorage.getItem('22YardsAdmin'))}  ,
    reducers:{
        AdminLogin : (state, action) => {
            state.seller = action.payload;
        },
        AdminLogout : (state, action) => {
            localStorage.removeItem('22YardsAdmin')
            state.seller = null;
        },
    },
})

//action creators
export const{AdminLogin, AdminLogout} = adminSlice.actions

export default adminSlice.reducer
