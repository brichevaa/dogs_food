import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filteredCards, findLike } from '../../utils/utils';

export const fetchProducts = createAsyncThunk(
   'products/fetchProducts',
   async function (_, { fulfillWithValue, rejectWithValue, extra: api, getState }) {
      try {
         const { user } = getState();
         const products = await api.getProductList();

         return fulfillWithValue({ ...products, user: user.data });
      } catch (error) {
         rejectWithValue(error);
      }
   }
);

export const fetchAddProducts = createAsyncThunk(
   'products/fetchAddProducts',
   async function (dataOutside, { fulfillWithValue, rejectWithValue, extra: api }) {
      try {
         const addedProduct = await api.addProduct({ ...dataOutside });
         console.log(addedProduct);
         return fulfillWithValue(addedProduct);
      } catch (error) {
         rejectWithValue(error);
      }
   }
);

export const fetchDeleteProducts = createAsyncThunk(
   'products/fetchDeleteProducts',
   async function (id, { fulfillWithValue, rejectWithValue, extra: api }) {
      try {
         const products = await api.deleteProductById(id);
         return fulfillWithValue(products);
      } catch (error) {
         rejectWithValue(error);
      }
   }
);

export const fetchSearchProducts = createAsyncThunk(
   'products/fetchSearchProducts',
   async function (search, { fulfillWithValue, rejectWithValue, extra: api, getState }) {
      try {
         const products = await api.searchProducts(search);
         return fulfillWithValue(products);
      } catch (error) {
         rejectWithValue(error);
      }
   }
);

export const fetchChangeLikeProduct = createAsyncThunk(
   'products/fetchChangeLikeProduct',
   async function (product, { fulfillWithValue, rejectWithValue, extra: api, getState }) {
      try {
         const { user, product: singleProduct } = getState();
         // fixme - refactor -> take from inside
         const wasLiked = findLike(product, user.data);
         const data = await api.changeLikeProductStatus(product._id, wasLiked);
         return fulfillWithValue({ product: data, wasLiked: wasLiked, singleProduct, user });
      } catch (error) {
         rejectWithValue(error);
      }
   }
);

const initialState = {
   data: [],
   favorites: [],
   loading: false,
   total: 0,
   error: null,
   currentPage: 1,
   productPerPage: 8,
};

const productsSlice = createSlice({
   name: 'products',
   initialState: initialState,
   reducers: {
      sortedProducts: (state, action) => {
         switch (action.payload) {
            case 'Сначала дешёвые':
               state.data = state.data.sort((a, b) => a.price - b.price);
               break;
            case 'Сначала дорогие':
               state.data = state.data.sort((a, b) => b.price - a.price);
               break;
            case 'Популярные':
               state.data = state.data.sort((a, b) => b.likes.length - a.likes.length);
               break;
            case 'Новинки':
               state.data = state.data.sort(
                  (a, b) => new Date(b.created_at) - new Date(a.created_at)
               );
               break;
            default:
               state.data = state.data.sort((a, b) => b.discount - a.discount);
               break;
         }
      },
      setCurrentPage: (state, action) => {
         console.log(action);
         state.currentPage = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
         const { products, user } = action.payload;
         state.data = products.filter((e) => e.author._id === user._id);
         // state.data = products;
         state.total = action.payload.total ?? 0;

         state.favorites = products.filter((e) => findLike(e, user));
         state.loading = false;
      });
      builder.addCase(fetchChangeLikeProduct.fulfilled, (state, action) => {
         state.loading = false;
         state.error = null;
         const { product, wasLiked, singleProduct, user } = action.payload;
         state.data = state.data.map((e) => {
            return e._id === product._id ? product : e;
         });
         if (!wasLiked) {
            state.favorites.push(product);
            // singleProduct = {...singleProduct, likes: [...singleProduct.likes, user.data._id]}
         } else {
            state.favorites = state.favorites.filter((e) => e._id !== product._id);
            // singleProduct.product = {...singleProduct.product, likes: singleProduct.product.likes.filter(e => e !== user.data._id)}
         }
      });
      builder.addCase(fetchSearchProducts.pending, (state) => {
         state.loading = true;
         state.error = null;
      });
      builder.addCase(fetchSearchProducts.fulfilled, (state, action) => {
         state.data = filteredCards(action.payload);
         state.loading = false;
      });
      builder.addCase(fetchAddProducts.fulfilled, (state, action) => {
         state.data = [...state.data, action.payload];
         state.loading = false;
      });
      builder.addCase(fetchDeleteProducts.fulfilled, (state, action) => {
         state.data = state.data.filter((e) => e._id !== action.payload._id);
         state.loading = false;
      });
   },
});

export const { sortedProducts, total, setCurrentPage, productPerPage } = productsSlice.actions;

export default productsSlice.reducer;
