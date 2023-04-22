import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   value: 0,
   show: true,
};

const counterSlice = createSlice({
   name: 'counterToolkit',
   initialState: initialState,
   reducers: {
      plus(state, action) {
         state.value = state.value + action.payload;
      },
      minus(state, action) {
         state.value = state.value - action.payload;
      },
   },
});

export const { plus, minus } = counterSlice.actions;

export default counterSlice.reducer;
