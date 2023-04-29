import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSingleProduct = createAsyncThunk(
   'product/fetchSingleProduct',
   async function (id, { fulfillWithValue, rejectWithValue, extra: api }) {
      try {
         const product = await api.getProductById(id);
         return fulfillWithValue(product);
      } catch (error) {
         rejectWithValue(error);
      }
   }
);

const initialState = {
   product: [],
   loading: false,
   error: null,
};

export const singleProductSlice = createSlice({
   name: 'singleProduct',
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchSingleProduct.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
         // console.log(action);
         state.data = action.payload;
         state.loading = false;
      });
   },
});

export default singleProductSlice.reducer;
