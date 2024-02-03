import {createSlice} from '@reduxjs/toolkit';
import {INewsFull, INewsWithoutText} from '../types';
import {addNews, deleteNews, getNews, getOneNewsById} from './NewsThunk';


interface newsState {
  newsList: INewsWithoutText[];
  newsById: INewsFull | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: newsState = {
  newsList: [],
  newsById: null,
  isLoading: false,
  isError: false,
};

const NewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newsList = action.payload;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getOneNewsById.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getOneNewsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newsById = action.payload;
    });
    builder.addCase(getOneNewsById.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(addNews.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addNews.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addNews.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteNews.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteNews.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteNews.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});


export const NewsReducer = NewsSlice.reducer;