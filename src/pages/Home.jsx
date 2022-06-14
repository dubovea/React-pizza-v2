import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterByParams, setPagesCount } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Categories from '../components/Categories';
import SortMenu from '../components/SortMenu';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlocks';
import LazyLoading from '../components/PizzaBlocks/LazyLoading';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMounted = useRef();
  const sRequestUrl = 'http://localhost:3001';
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { navigateByParams, category, sortType, searchValue, currentPage, limit } = useSelector(
    (state) => state.filter,
  );

  const getPizzasCount = () => {
    axios
      .get(
        `${sRequestUrl}/count?${
          category ? `category=${category}` : ``
        }&orderBy=${sortType}&search=${searchValue}`,
      )
      .then((response) => {
        dispatch(setPagesCount(Math.ceil(response.data / limit)));
      });
  };

  const getPizzas = () => {
    setLoading(true);
    axios
      .get(
        `${sRequestUrl}?${
          category ? `category=${category}` : ``
        }&orderBy=${sortType}&search=${searchValue}&currentPage=${currentPage}&perPage=${limit}`,
      )
      .then(function (response) {
        setLoading(false);
        setPizzas(response.data);
      });
  };

  const parseUrlParams = () => {
    const urlValue = window.location.search;
    if (urlValue) {
      const params = qs.parse(urlValue.slice(1));
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
    pizzasBlocks = pizzas.map((o) => <PizzaBlock key={o.id} {...o} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <SortMenu />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? lazyPizzas : pizzasBlocks}</div>
        <Pagination />
      </div>
    </>
  );
}
export default Home;
