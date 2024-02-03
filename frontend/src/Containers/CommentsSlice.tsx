import {createSlice} from '@reduxjs/toolkit';
import {IComment} from '../types';
import {addComment, deleteComment, getCommentByNewsId} from './CommentsThunk';


interface commentsState {
  comments: IComment[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: commentsState = {
  comments: [],
  isLoading: false,
  isError: false,
};

const CommentsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(addComment.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addComment.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addComment.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(getCommentByNewsId.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.comments = [];
    });
    builder.addCase(getCommentByNewsId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    });
    builder.addCase(getCommentByNewsId.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteComment.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  }
});


export const CommentsReducer = CommentsSlice.reducer;