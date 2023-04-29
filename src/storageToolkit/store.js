import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import { api } from '../utils/api';
import productsSlice from './products/productsSlice';
import singleProductSlice from './singleProduct/singleProductSlice';
import basketSlice from './basket/basketSlice';

const store = configureStore({
   reducer: {
      user: userSlice,
      products: productsSlice,
      product: singleProductSlice,
      basket: basketSlice,
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
