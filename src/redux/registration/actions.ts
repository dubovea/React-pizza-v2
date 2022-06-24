import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Registration } from './types';
const sRequestUrl = 'http://localhost:3001';

export const registration = createAsyncThunk<boolean, Registration>(
  'registration/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const { login, email, password } = params;
      const { data } = await axios.post<boolean>(`${sRequestUrl}/registration`, {
        login: login.value,
        email: email.value,
        password: password.value,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  },
);
