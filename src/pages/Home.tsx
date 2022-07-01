import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { filterSelector } from '../redux/filter/selectors';
import { setFilterByParams } from '../redux/filter/slice';
import { FilterSliceState } from '../redux/filter/types';
import { pizzaSelector } from '../redux/pizza/selectors';
import { fetchPizzas, fetchPizzasCount } from '../redux/pizza/actions';
import { FetchPizzaArgs, PizzaSliceState } from '../redux/pizza/types';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import Categories from '../components/Categories';
import SortMenu from '../components/SortMenu';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlocks';
import LazyLoading from '../components/PizzaBlocks/LazyLoading';
import { useAppDispath } from '../redux/store';

const Home: React.FC = () => {
  import('../utils/math').then((math) => math.add(5, 5));
  const dispatch = useAppDispath();
  const navigate = useNavigate();
  const searchLocation = useLocation().search;
  const isMounted = useRef<boolean>();

  const { navigateByParams, category, orderBy, search, currentPage } = useSelector(filterSelector);
  const { items, limit, status }: PizzaSliceState = useSelector(pizzaSelector);

  const categoryStr = category ? `category=${category}` : '',
    sortTypeStr = orderBy ? `orderBy=${orderBy}` : '';
  const getPizzasCount = () => {
    const params: FetchPizzaArgs = {
      category: categoryStr,
      orderBy: sortTypeStr,
      search,
    };
    dispatch(fetchPizzasCount(params));
  };

  const getPizzas = () => {
    const params: FetchPizzaArgs = {
      category: categoryStr,
      orderBy: sortTypeStr,
      search,
      currentPage,
    };
    dispatch(fetchPizzas(params));
  };

  const parseUrlParams = () => {
    if (searchLocation) {
      const params = qs.parse(searchLocation.slice(1)) as unknown;
      dispatch(setFilterByParams(params as FilterSliceState));
      isMounted.current = true;
    }
  };

  const setUrlParams = () => {
    const queryString = qs.stringify({
      category: category,
      orderBy: orderBy,
      search: search,
      currentPage: currentPage,
      perPage: limit,
    });
    navigate(`?${queryString}`);
  };

  useEffect(() => {
    parseUrlParams();
  }, []);

  useEffect(() => {
    setUrlParams();
    if (!isMounted.current) {
      getPizzasCount();
      getPizzas();
    }

    isMounted.current = false;
    window.scrollTo(0, 0);
  }, [navigateByParams, category, orderBy, search, currentPage]);

  const lazyPizzas = [...new Array(4)].map((_, index) => <LazyLoading key={index} />),
    pizzasBlocks = items.map((o) => <PizzaBlock key={o.id} {...o} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortMenu />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить данные. Повторите попытку позднее...</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? lazyPizzas : pizzasBlocks}</div>
      )}

      <Pagination />
    </div>
  );
};
export default Home;
