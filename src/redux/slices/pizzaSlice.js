import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pizza: {},
  items: [],
  pagesCount: 0,
  limit: 4,
  status: '',
};

const sRequestUrl = 'http://localhost:3001';
export const fetchPizzas = createAsyncThunk(
  'pizza/fetchData',
  async ({ category, sortType, searchValue, currentPage }) => {
    const { data } = await axios.get(
      `${sRequestUrl}?${category}&${sortType}&search=${searchValue}&currentPage=${currentPage}&perPage=${initialState.limit}`,
    );
    return data;
  },
);

export const fetchPizzaById = createAsyncThunk('pizza/fetchPizzaById', async ({ id }) => {
  const { data } = await axios.get(`${sRequestUrl}/${id}`);
  return data;
});

export const fetchPizzasCount = createAsyncThunk(
  'pizza/fetchCount',
  async ({ category, sortType, searchValue }) => {
    const { data } = await axios.get(
      `${sRequestUrl}/count?${category}&${sortType}&search=${searchValue}`,
    );
    return data;
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
    [fetchPizzasCount.fulfilled]: (state, action) => {
      state.pagesCount = Math.ceil(action.payload / state.limit);
    },
    [fetchPizzasCount.rejected]: (state) => {
      state.pagesCount = 0;
    },
    [fetchPizzaById.pending]: (state, action) => {
      state.pizza = {};
    },
    [fetchPizzaById.fulfilled]: (state, action) => {
      state.pizza = action.payload;
    },
    [fetchPizzaById.rejected]: (state, action) => {
      state.pizza = {};
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export const pizzaSelector = (state) => state.pizza;

export default pizzaSlice.reducer;
