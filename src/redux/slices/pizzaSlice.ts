import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


export type PizzaItem = {
  id: number;
  concatedKey: string;
  image: string;
  title: string;
  sizes: string[];
  types: string[];
  price: number;
};

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  pizza: PizzaItem;
  items: PizzaItem[];
  pagesCount: number;
  limit: number;
  status: Status;
}

const emptyPizza = { id: 0, concatedKey: '', image: '', title: '', sizes: [], types: [], price: 0 };

const initialState: PizzaSliceState = {
  pizza: emptyPizza,
  items: [],
  pagesCount: 0,
  limit: 4,
  status: Status.LOADING,
};

export type FetchPizzaArgs = {
  category: string;
  orderBy: string;
  search: string;
  currentPage?: number;
};

const sRequestUrl = 'http://localhost:3001';
export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaArgs>(
  'pizza/fetchData',
  async ({ category, orderBy, search, currentPage }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `${sRequestUrl}?${category}&${orderBy}&search=${search}&currentPage=${currentPage}&perPage=${initialState.limit}`,
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

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchPizzasCount.fulfilled, (state, action) => {
      state.pagesCount = Math.ceil(action.payload / state.limit);
    });
    builder.addCase(fetchPizzasCount.rejected, (state) => {
      state.pagesCount = 0;
    });
    builder.addCase(fetchPizzaById.pending, (state) => {
      state.pizza = emptyPizza;
    });
    builder.addCase(fetchPizzaById.fulfilled, (state, action) => {
      state.pizza = action.payload;
    });
    builder.addCase(fetchPizzaById.rejected, (state) => {
      state.pizza = emptyPizza;
    });
  },
});

export const pizzaSelector = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
