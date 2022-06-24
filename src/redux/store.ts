import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice';
import cart from './cart/slice';
import pizza from './pizza/slice';
import registration from './registration/slice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
    registration,
  },
});

store.subscribe(() => {
  const { items, totalPrice } = store.getState().cart;
  localStorage.setItem('items', JSON.stringify(items));
  localStorage.setItem('totalPrice', totalPrice.toString());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispath = () => useDispatch<AppDispatch>();
