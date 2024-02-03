import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {ICommentForm} from '../types';

export const getCommentByNewsId = createAsyncThunk(
  'Comments/get-by-news-id',
  async (id: string) => {
    const response = await axiosApi.get(`comments?news_id=${id}` );
    return response.data ?? [];
  });


export const addComment = createAsyncThunk(
  'Comments/add',
  async (comment: ICommentForm) => {
    await axiosApi.post(`comments`, comment);
  });


export const deleteComment = createAsyncThunk(
  'Comments/delete',
  async (id: string) => {
    await axiosApi.delete(`comments/${id}`);
  });

