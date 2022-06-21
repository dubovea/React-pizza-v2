import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
  search: '',
  category: 0,
  currentPage: 1,
  orderBy: 'rating',
  navigateByParams: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSortType: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilterByParams: (state, action: PayloadAction<FilterSliceState>) => {
      state.category = +action.payload.category;
      state.orderBy = action.payload.orderBy;
      state.search = action.payload.search;
      state.currentPage = +action.payload.currentPage;
      state.navigateByParams = true;
    },
  },
});

export const { setCategory, setSortType, setSearch, setCurrentPage, setFilterByParams } =
  filterSlice.actions;

export default filterSlice.reducer;
