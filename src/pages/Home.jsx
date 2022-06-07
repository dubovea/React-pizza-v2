import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import SortMenu from '../components/SortMenu';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlocks/PizzaBlock';
import LazyLoading from '../components/PizzaBlocks/LazyLoading';

function Home() {
  const axios = require('axios').default;
  const limit = 4;
  const sRequestUrl = 'http://localhost:3001/pizzas';
  const [pizzas, setPizzas] = useState([]);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const { categoryId, sortType, searchValue } = useSelector((state) => state.filter),
    sortTypeName = sortType.type;

  const getPizzas = () => {
    setLoading(true);
    axios
      .get(
        `${sRequestUrl}?${
          categoryId ? `category=${categoryId}` : ``
        }&orderBy=${sortTypeName}&search=${searchValue}&currentPage=${currentPage}&perPage=${limit}`,
      )
      .then(function (response) {
        setLoading(false);
        setPizzas(response.data);
      });
  };

  const getPizzasCount = () => {
    axios.get(`${sRequestUrl}/count`).then((response) => {
      setPagesCount(Math.ceil(response.data / limit));
    });
  };

  useEffect(() => {
    getPizzasCount();
  }, []);

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sortTypeName, searchValue, currentPage]);

  //For mockapi
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(
  //       `${sRequestUrl}${
  //         categoryId ? `category=${categoryId}` : ``
  //       }&page=${currentPage}&limit=${limit}&sortBy=${sortTypeName}&order=desc&search=${searchValue}`,
  //     )
  //     .then(function (response) {
  //       setPizzas(response.data);
  //       setLoading(false);
  //     });
  //   window.scrollTo(0, 0);
  // }, [categoryId, sortTypeName, searchValue, currentPage]);

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
        <Pagination
          pagesCount={pagesCount}
          limit={limit}
          onPageChange={(number) => setCurrentPage(number)}
        />
      </div>
    </>
  );
}
export default Home;
