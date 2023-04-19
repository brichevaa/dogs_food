import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { openNotification } from '../../components/Notification/Notification';

// объявление асинхронных actions
export const fetchUser = createAsyncThunk(
   'user/fetchUser',
   async function (_, { fulfillWithValue, rejectWithValue, extra: api }) {
      try {
         const data = await api.getUserInfo();
         return fulfillWithValue(data);
      } catch (error) {
         rejectWithValue(error);
      }
   }
);
export const changeUser = createAsyncThunk(
   'user/changeUser',
   async function (dataOutside, { fulfillWithValue, rejectWithValue, extra: api }) {
      try {
         const data = dataOutside.avatar
            ? await api.changeAvatar(dataOutside)
            : await api.changeUserInfo(dataOutside);
         openNotification('success', 'Успешно', 'Данные успешно изменены');
         return fulfillWithValue(data);
      } catch (error) {
         openNotification('error', 'Ошибка!', 'Не удалось изменить данные');
         rejectWithValue(error);
      }
   }
);

const isError = (action) => {
   return action.type.endsWith('rejected');
};

// объявление начального стейта
const initialState = {
   data: {},
   loading: false,
   error: null,
   test: 'undefined',
};
// создание среза стейта
const userSlice = createSlice({
   // название, которое добавляеся к типа action'а
   name: 'user',
   // initialState - начальное состояние
   initialState: initialState,
   // reducers - не асинхронные действия с хранилищем
   reducers: {},
   // extraReducers - асинхронные действия с хранилищем
   extraReducers: (builder) => {
      builder.addCase(fetchUser.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchUser.fulfilled, (state, action) => {
         state.data = action.payload; // action.payload == fulfillWithValue(data), action.type == 'user/fetchUser/[status]'
         state.loading = false;
      });
      builder.addCase(changeUser.fulfilled, (state, action) => {
         state.data = action.payload;
         state.loading = false;
      });
      builder.addCase(changeUser.rejected, (state, action) => {
         state.error = action.payload;
         state.loading = false;
      });
      builder.addMatcher(isError, (state, action) => {
         state.error = action.payload;
         state.loading = false;
         openNotification('error', 'Ошибка!', 'Ошибка загрузки');
      });
   },
});

export default userSlice.reducer;
