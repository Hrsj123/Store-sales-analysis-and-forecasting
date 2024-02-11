import { createSlice } from "@reduxjs/toolkit";

const initialState = {                  // State variable value initialized
    count: 0
}

export const loginSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        }
    }
});

export const { increment, decrement, reset, incrementByAmount } = loginSlice.actions;

export default loginSlice.reducer;