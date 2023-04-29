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
   product: {},
   loading: true,
   error: null,
   // data: 'dada'
};

export const singleProductSlice = createSlice({
   name: 'singleProduct',
   initialState: initialState,
   reducers: {
      changeLikeStatus: (state, action) => {
         state.product = {...state.product, likes: action.payload}
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchSingleProduct.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
         // console.log(action);
         state.product = action.payload;
         state.loading = false;
      });
   },
});


export const { changeLikeStatus } = singleProductSlice.actions;

export default singleProductSlice.reducer;
