import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData: null
}
// intial state of the user will be false , we can put anything here

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.status = true
            state.userData = action.payload

        },
        logout:(state) => {
            state.status = false
            state.userData = null

        }
    }
})

export const {login,logout} = authSlice.actions 

export default authSlice.reducer

// used to track user authentication , keeps asking the store if user is authenticated or not?