import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';
import { setCurrentPage, setPagesCount } from '../../redux/slices/filterSlice';

function Pagination() {
  const dispatch = useDispatch();
  const { sortType, categoryId, searchValue, pagesCount, limit } = useSelector(
    (state) => state.filter,
  );

  const getPizzasCount = () => {
    axios
      .get(
        `http://localhost:3001/pizzas/count?${categoryId ? `category=${categoryId}` : ``}&orderBy=${
          sortType.name
        }&search=${searchValue}`,
      )
      .then((response) => {
        dispatch(setPagesCount(Math.ceil(response.data / limit)));
      });
  };

  const onPageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    onPageChange(1);
    getPizzasCount();
  }, [categoryId, searchValue]);

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={limit}
      pageCount={pagesCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
