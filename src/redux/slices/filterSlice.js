import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = {
  searchValue: '',
  categoryId: 0,
  sortType: { name: 'популярности', type: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categoryId = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategory, setSortType, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
