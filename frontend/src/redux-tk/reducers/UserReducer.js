import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:JSON.parse(localStorage.getItem('22YardsUser'))
    },
    reducers:{
        UserLogin: (state, action) => {
            state.user = action.payload;
            //stored to persist user because on page refresh data in rtk will be lost;
            localStorage.setItem('22YardsUser', JSON.stringify(state.user));
        },
        UserLogout:(state, action) => {
            state.user=null;
            localStorage.removeItem('22YardsUser')
        }
    }
})

export default userSlice.reducer

export const {UserLogin, UserLogout} = userSlice.actions;