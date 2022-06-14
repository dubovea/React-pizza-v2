import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  category: 0,
  currentPage: 1,
  sortType: 'rating',
  navigateByParams: false
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setFilterByParams: (state, action) => {
      state.category = +action.payload.category;
      state.sortType = action.payload.orderBy;
      state.searchValue = action.payload.search;
      state.currentPage = +action.payload.currentPage;
      state.navigateByParams = true;
    },
  },
});

export const {
  setCategory,
  setSortType,
  setSearch,
  setCurrentPage,
  setLimit,
  setFilterByParams,
} = filterSlice.actions;

export default filterSlice.reducer;
