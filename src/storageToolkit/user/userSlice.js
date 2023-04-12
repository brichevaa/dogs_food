import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { openNotification } from '../../components/Notification/Notification';

export const fetchUser = createAsyncThunk('user/fetchUser', async function (dataOutside, { fulfillWithValue, rejectWithValue, extra: api }) {
   try {
      const data = await api.getUserInfo();
      // console.log(data);
      return fulfillWithValue(data);
   } catch (error) {
      console.log(error);
      rejectWithValue(error);
   }
});
export const changeUser = createAsyncThunk('user/changeUser', async function (dataOutside, { fulfillWithValue, rejectWithValue, extra: api }) {
   try {
      const data = dataOutside.avatar ? await api.changeAvatar(dataOutside) : await api.changeUserInfo(dataOutside);
      openNotification('success', 'Успешно', 'Данные успешно изменены');
      return fulfillWithValue(data);
   } catch (error) {
      openNotification('error', 'Ошибка!', 'Не удалось изменить данные');
      rejectWithValue(error);
   }
});

const isError = (action) => {
   return action.type.endsWith('rejected');
};

const initialState = {
   data: {},
   loading: false,
   error: null,
   test: 'undefined',
};

const userSlice = createSlice({
   name: 'user',
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchUser.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(fetchUser.fulfilled, (state, action) => {
         state.data = action.payload;
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
      });
   },
});

export default userSlice.reducer;
