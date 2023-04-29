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
         console.log(action);
         // state.data = state.data.map((e) => {
         //    return e._id === product._id ? product : e;
         // });
         const idProduct = action.payload;
         if (product.id === idProduct) state.value = state.value + action.payload;
      },
      minus(state, action) {
         state.value = state.value - action.payload;
      },
   },
});

export const { plus, minus } = counterSlice.actions;

export default counterSlice.reducer;
