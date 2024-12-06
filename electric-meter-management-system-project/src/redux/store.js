import { configureStore } from "@reduxjs/toolkit";
import  loginReducer  from "../Pages/LoginPage/loginSlice";

export const store = configureStore({
    reducer:{
        login:loginReducer
    }
})