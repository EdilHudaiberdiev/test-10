import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import {INewsForm} from '../types';

export const getNews = createAsyncThunk(
  'news/get',
  async () => {
    const response = await axiosApi.get(`news` );
    return response.data ?? [];
  });

export const getOneNewsById = createAsyncThunk(
  'news/get-by-id',
  async (id: string) => {
    const response = await axiosApi.get(`news/${id}` );
    return response.data ?? null;
  });


export const addNews = createAsyncThunk(
  'news/add',
  async (news: INewsForm) => {
    await axiosApi.post(`news`, news);
  });


export const deleteNews = createAsyncThunk(
  'news/delete',
  async (id: string) => {
    await axiosApi.delete(`news/${id}`);
  });

