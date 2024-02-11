import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
// File where state variables are stored!
export const store = configureStore({
    reducer: {
        login: loginReducer,                // First state variable & its actions
    }
})