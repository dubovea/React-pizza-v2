import { useState, useEffect, useContext } from 'react';
import Categories from '../components/Categories';
import SortMenu from '../components/SortMenu';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlocks/PizzaBlock';
import LazyLoading from '../components/PizzaBlocks/LazyLoading';
import { SearchContext } from '../App';

function Home() {
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [pagesCount, setPagesCount] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    type: 'rating',
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://628e3c78368687f3e71316d3.mockapi.io/Pizzas?${
        categoryId ? `category=${categoryId}` : ``
      }&page=${pagesCount}&limit=4&sortBy=${sortType.type}&order=desc&search=${searchValue}`,
    )
      .then((res) => res.json())
      .then((items) => {
        setPizzas(items);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, pagesCount]);

  const lazyPizzas = [...new Array(4)].map((_, index) => <LazyLoading key={index} />),
    pizzasBlocks = pizzas.map((o) => <PizzaBlock key={o.id} {...o} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChange={setCategoryId} />
          <SortMenu value={sortType} onChange={setSortType} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? lazyPizzas : pizzasBlocks}</div>
        <Pagination onPageChange={(number) => setPagesCount(number)} />
      </div>
    </>
  );
}
export default Home;
