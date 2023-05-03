import { createSlice } from '@reduxjs/toolkit';
import { calcTotalPrice, getBasketFromLS } from '../../utils/utils';

const basketData = getBasketFromLS();

const initialState = {
   items: basketData.items,
   totalPrice: basketData.totalPrice,
   totalCount: 0,
   loading: false,
};

const basketSlice = createSlice({
   name: 'basket',
   initialState: initialState,
   reducers: {
      addItem(state, action) {
         const findItem = state.items.find((obj) => obj.id === action.payload.id);
         if (findItem) {
            findItem.count++;
         } else {
            state.items.push({
               ...action.payload,
               count: 1,
            });
         }
         state.totalPrice = calcTotalPrice(state.items);
      },
      minusItem(state, action) {
         const findItem = state.items.find((obj) => obj.id === action.payload);
         if (findItem) {
            findItem.count--;
         }
         state.totalPrice = calcTotalPrice(state.items);
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

export const { addItem, removeItem, clearItems, minusItem } = basketSlice.actions;

export default basketSlice.reducer;
