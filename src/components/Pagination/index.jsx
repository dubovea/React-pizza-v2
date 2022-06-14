import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';
import { setCurrentPage } from '../../redux/slices/filterSlice';

function Pagination() {
  const dispatch = useDispatch();
  const { currentPage, category, searchValue } = useSelector((state) => state.filter);
  const { pagesCount, limit } = useSelector((state) => state.pizza);

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
