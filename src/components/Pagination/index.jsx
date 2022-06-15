import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';
import { filterSelector, setCurrentPage } from '../../redux/slices/filterSlice';
import { pizzaSelector } from '../../redux/slices/pizzaSlice';

function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, category, searchValue } = useSelector(filterSelector);
  const { pagesCount, limit } = useSelector(pizzaSelector);

  const onPageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    onPageChange(1);
  }, [category, searchValue]);

  return (
    <ReactPaginate
      forcePage={currentPage - 1}
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
