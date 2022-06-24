import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzaById, fetchPizzas, fetchPizzasCount } from './actions';
import { PizzaSliceState, Status } from './types';

const emptyPizza = { id: 0, concatedKey: '', image: '', title: '', sizes: [], types: [], price: 0 };

const initialState: PizzaSliceState = {
  pizza: emptyPizza,
  items: [],
  pagesCount: 0,
  limit: 4,
  status: Status.LOADING,
};

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
    builder.addCase(fetchPizzaById.rejected, (state, action) => {
      state.pizza = emptyPizza;
    });
  },
});

export default pizzaSlice.reducer;
