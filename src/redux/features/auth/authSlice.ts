import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./types";

// Initial state for authentication
const initialState: InitialState = {
    token: null,
    user: null
};

// Creating a slice for authentication
export const authSlice = createSlice({
    name: 'auth', // Slice name
    initialState,
    reducers: {
        // Action to handle user login
        userLoggedIn: (state, action: PayloadAction<InitialState>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },

        // Action to handle user logout
        userLoggedOut: (state) => {
            state.token = null;
            state.user = null;
        }
    }
});

// Exporting actions and reducer
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;