import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem, FetchPizzaArgs } from './types';
const sRequestUrl = 'http://localhost:3001';

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaArgs>(
  'pizza/fetchData',
  async ({ category, orderBy, search, currentPage }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `${sRequestUrl}?${category}&${orderBy}&search=${search}&currentPage=${currentPage}&perPage=4`,
    );
    return data;
  },
);

export const fetchPizzaById = createAsyncThunk<PizzaItem, Record<string, string>>(
  'pizza/fetchPizzaById',
  async ({ id }) => {
    const { data } = await axios.get<PizzaItem>(`${sRequestUrl}/pizza/${id}`);
    return data;
  },
);

export const fetchPizzasCount = createAsyncThunk<number, FetchPizzaArgs>(
  'pizza/fetchCount',
  async ({ category, orderBy, search }) => {
    const { data } = await axios.get<number>(
      `${sRequestUrl}/count?${category}&${orderBy}&search=${search}`,
    );
    return data;
  },
);
