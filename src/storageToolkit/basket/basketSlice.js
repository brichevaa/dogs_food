import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   items: [],
   totalPrice: 0,
   totalCount: 0,
   loading: false,
};

const basketSlice = createSlice({
   name: 'basket',
   initialState: initialState,
   reducers: {
      addItem(state, action) {
         // state.items.push(action.payload);
         console.log(action.payload);
         const findItem = state.items.find((obj) => obj.id === action.payload.id);
         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }
         state.totalPrice = state.items.reduce((sum, obj) => {
            return obj.price * obj.count + sum;
         }, 0);
      },
      minusItem(state, action) {
         const findItem = state.items.find((obj) => obj.id === action.payload);
         if (findItem) {
            findItem.count--;
         }
         // state.totalPrice = state.items.reduce((sum, obj) => {
         //    return obj.price * obj.count - sum;
         // }, 0);
      },
      removeItem(state, action) {
         state.items = state.items.filter((e) => e.id !== action.payload);
      },
      clearItems(state) {
         state.items = [];
         state.totalPrice = 0;
      },
   },
});

export const { totalPrice, totalCount, addItem, removeItem, clearItems, minusItem } =
   basketSlice.actions;

export default basketSlice.reducer;
