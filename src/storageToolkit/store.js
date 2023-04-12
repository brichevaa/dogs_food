import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import { api } from '../utils/api';
import productsSlice from './products/productsSlice';

const store = configureStore({
   reducer: {
      user: userSlice,
      products: productsSlice,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         thunk: {
            extraArgument: api,
         },
      }),
});

export default store;
