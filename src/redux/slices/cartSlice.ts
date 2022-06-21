import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SizeProps = {
  key: number;
  name: string;
};

export type PizzaCartItem = {
  id: number;
  concatedKey?: string;
  count: number;
  image: string;
  title: string;
  size: SizeProps;
  type: SizeProps;
  price: number;
  priceSum: number;
};

interface CartSliceState {
  totalPrice: number;
  items: PizzaCartItem[];
}

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};

const getKey = (obj: PizzaCartItem) => `${obj.id}${obj.size.key}${obj.type.key}`;

const getSum = (items: PizzaCartItem[]) =>
  items.reduce((previousValue: number, obj: PizzaCartItem) => previousValue + obj.priceSum, 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<PizzaCartItem>) => {
      const key = getKey(action.payload),
        findIndex = state.items.findIndex((o) => o.concatedKey === key);
      if (findIndex > -1) {
        const newItems = state.items.slice(),
          item = newItems[findIndex];
        item.count++;
        item.priceSum = item.price * item.count;
        state.items = newItems;
      } else {
        state.items = [
          ...state.items,
          { ...action.payload, concatedKey: key, count: 1, priceSum: action.payload.price },
        ];
      }
      state.totalPrice = getSum(state.items);
    },
    removePizza: (state, action: PayloadAction<PizzaCartItem>) => {
      const key = getKey(action.payload),
        newItems = state.items.filter((o) => o.concatedKey !== key);
      if (state.items.length === 1) {
        state.items = [];
        state.totalPrice = 0;
        return;
      }
      state.items = newItems;
      state.totalPrice = getSum(newItems);
    },
    decrementPizza: (state, action: PayloadAction<PizzaCartItem>) => {
      const key = getKey(action.payload),
        findIndex = state.items.findIndex((o) => o.concatedKey === key);
      let newItems = state.items.slice();
      if (findIndex > -1) {
        const item = newItems[findIndex];
        item.count--;
        item.priceSum = item.price * item.count;
        state.items = newItems;
        if (!item.count) {
          state.items = newItems.filter((o) => o.concatedKey !== key);
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

export const cartSelector = (state: RootState) => state.cart;

export const { addPizza, removePizza, decrementPizza, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
