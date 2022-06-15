import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterSelector, setFilterByParams } from '../redux/slices/filterSlice';
import { fetchPizzas, fetchPizzasCount, pizzaSelector } from '../redux/slices/pizzaSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import Categories from '../components/Categories';
import SortMenu from '../components/SortMenu';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlocks';
import LazyLoading from '../components/PizzaBlocks/LazyLoading';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const isMounted = useRef();

  const { navigateByParams, category, sortType, searchValue, currentPage } =
    useSelector(filterSelector);
  const { items, limit, status } = useSelector(pizzaSelector);

  const categoryStr = category ? `category=${category}` : '',
    sortTypeStr = sortType ? `orderBy=${sortType}` : '';
  const getPizzasCount = () => {
    dispatch(
      fetchPizzasCount({
        category: categoryStr,
        sortType: sortTypeStr,
        searchValue,
      }),
    );
  };

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        category: categoryStr,
        sortType: sortTypeStr,
        searchValue,
        currentPage,
      }),
    );
  };

  const parseUrlParams = () => {
    if (search) {
      const params = qs.parse(search.slice(1));
      dispatch(setFilterByParams(params));
      isMounted.current = true;
    }
  };

  const setUrlParams = () => {
    const queryString = qs.stringify({
      category: category,
      orderBy: sortType,
      search: searchValue,
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
  }, [navigateByParams, category, sortType, searchValue, currentPage]);

  //For mockapi
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `${sRequestUrl}${
  //         category ? `category=${category}` : ``
  //       }&page=${currentPage}&limit=${limit}&sortBy=${sortTypeName}&order=desc&search=${searchValue}`,
  //     )
  //     .then(function (response) {
  //       setPizzas(response.data);
  //       setLoading(false);
  //     });
  //   window.scrollTo(0, 0);
  // }, [category, sortTypeName, searchValue, currentPage]);

  const lazyPizzas = [...new Array(4)].map((_, index) => <LazyLoading key={index} />),
    pizzasBlocks = items.map((o) => <PizzaBlock key={o.id} {...o} />);

  return (
    <>
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
    </>
  );
}
export default Home;
