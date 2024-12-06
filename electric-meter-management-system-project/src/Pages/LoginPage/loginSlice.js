import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:'login',
    initialState: {
        useremail:'',
        userpassword:'',
        userrole:''
    },
    reducers: {
        updateUseremail: (state,action) => {
            state.useremail = action.payload
        },

        updateUserpassword: (state,action) => {
            state.userpassword = action.payload
        },
        // updateUserrole: (state, action) => {
        // 
        // }
    }

})

export const {updateUseremail, updateUserpassword,updateUserrole} = loginSlice.actions

export default loginSlice.reducer