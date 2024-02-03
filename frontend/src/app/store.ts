import {configureStore} from '@reduxjs/toolkit';
import {NewsReducer} from '../Containers/NewsSlice';

export const store = configureStore({
  reducer: {
    news: NewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;