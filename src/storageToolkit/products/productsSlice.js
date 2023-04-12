import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../user/userSlice';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async function (dataOutside, { fulfillWithValue, rejectWithValue, extra: api }) {
   try {
      const products = await api.getProductList();
      return fulfillWithValue(products);
   } catch (error) {
      rejectWithValue(error);
   }
});

const initialState = {
   data: [],
   favorites: [],
   loading: false,
   total: null,
   error: null,
};

const productsSlice = createSlice({
   name: 'products',
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         state.data = action.payload;
         state.loading = false;
      });
   },
});

export default productsSlice.reducer;
