import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const getKey = (obj) => `${obj.id}${obj.size.key}${obj.type.key}`;

const getSum = (items) => items.reduce((previousValue, obj) => previousValue + obj.priceSum, 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const key = getKey(action.payload),
        findIndex = state.items.findIndex((o) => o.key === key);
      if (findIndex > -1) {
        const newItems = state.items.slice(),
          item = newItems[findIndex];
        item.count++;
        item.priceSum = item.price * item.count;
        state.items = newItems;
      } else {
        state.items = [
          ...state.items,
          { ...action.payload, key: key, count: 1, priceSum: action.payload.price },
        ];
      }
      state.totalPrice = getSum(state.items);
    },
    removePizza: (state, action) => {
      const key = getKey(action.payload),
        newItems = state.items.filter((o) => o.key !== key);
      if (state.items.length === 1) {
        state.items = [];
        state.totalPrice = 0;
        return;
      }
      state.items = newItems;
      state.totalPrice = getSum(newItems);
    },
    decrementPizza: (state, action) => {
      const key = getKey(action.payload),
        findIndex = state.items.findIndex((o) => o.key === key);
      let newItems = state.items.slice();
      if (findIndex > -1) {
        const item = newItems[findIndex];
        item.count--;
        item.priceSum = item.price * item.count;
        state.items = newItems;
        if (!item.count) {
          state.items = newItems.filter((o) => o.key !== key);
        }
      }
      state.totalPrice = getSum(newItems);
    },
    clearPizzas: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addPizza, removePizza, decrementPizza, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
