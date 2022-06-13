import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  category: 0,
  currentPage: 1,
  pagesCount: 1,
  limit: 4,
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
    setPagesCount: (state, action) => {
      state.pagesCount = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setFilterByParams: (state, action) => {
      state.category = +action.payload.category;
      state.sortType = action.payload.orderBy;
      state.searchValue = action.payload.search;
      state.currentPage = +action.payload.currentPage;
      state.limit = +action.payload.perPage;
      state.navigateByParams = true;
    },
  },
});

export const {
  setCategory,
  setSortType,
  setSearch,
  setCurrentPage,
  setPagesCount,
  setLimit,
  setFilterByParams,
} = filterSlice.actions;

export default filterSlice.reducer;
