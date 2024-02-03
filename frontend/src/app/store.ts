import {configureStore} from '@reduxjs/toolkit';
import {NewsReducer} from '../Containers/NewsSlice';
import {CommentsReducer} from '../Containers/CommentsSlice';

export const store = configureStore({
  reducer: {
    news: NewsReducer,
    comments: CommentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;