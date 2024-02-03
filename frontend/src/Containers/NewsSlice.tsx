import {createSlice} from '@reduxjs/toolkit';
import {INewsFull, INewsWithoutText} from '../types';


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
});


export const NewsReducer = NewsSlice.reducer;