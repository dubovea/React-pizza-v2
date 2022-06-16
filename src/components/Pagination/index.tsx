import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import ReactPaginate from 'react-paginate';
import { filterSelector, setCurrentPage } from '../../redux/slices/filterSlice';
import { pizzaSelector } from '../../redux/slices/pizzaSlice';

type PaginationProps = {
  currentPage: number;
  category: number;
  searchValue: string;
  pagesCount: number;
  limit: number;
  page: number;
};

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, category, searchValue }: PaginationProps = useSelector(filterSelector);
  const { pagesCount, limit }: PaginationProps = useSelector(pizzaSelector);
  const nothing: any = null;

  const onPageChange = (page: number) => {
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
      renderOnZeroPageCount={nothing}
    />
  );
};

export default Pagination;
