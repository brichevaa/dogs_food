import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import { api } from '../utils/api';
import productsSlice from './products/productsSlice';
import counterSlice from './cart/counterSlice';

const store = configureStore({
   reducer: {
      user: userSlice,
      products: productsSlice,
      counter: counterSlice,
   },
   middleware: (
      getDefaultMiddleware // middleware- прослойка для асинхронных взаимодействий (помогает toolkit'у увидеть асинхронные действия)
   ) =>
      getDefaultMiddleware({
         thunk: {
            extraArgument: api,
         },
      }),
});

export default store;
