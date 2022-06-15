import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addPizza } from '../../redux/slices/cartSlice';
function PizzaBlock({ id, image, title, price, types, sizes }) {
  // const [pizzaTypes, setPizzaTypes] = useState([]);
  // const [pizzaSizes, setPizzaSizes] = useState([]);

  // const getPizzaTypes = () => {
  //   axios.get(`http://localhost:3001/pizza_types/${id}`).then(function (response) {
  //     setPizzaTypes(response.data);
  //   });
  // };

  // const getPizzaSizes = () => {
  //   axios.get(`http://localhost:3001/pizza_sizes/${id}`).then(function (response) {
  //     setPizzaSizes(response.data);
  //   });
  // };

  // useEffect(() => {
  //   getPizzaTypes();
  //   getPizzaSizes();
  // }, []);
  const dispatch = useDispatch();

  const [sizeIndex, setSizeIndex] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  let [count, setCount] = useState(0);

  const handleClickAdd = () => {
    setCount(++count);
    dispatch(
      addPizza({
        id,
        image,
        title,
        price,
        size: {
          key: sizeIndex,
          name: sizes[sizeIndex],
        },
        type: {
          key: typeIndex,
          name: types[typeIndex],
        },
      }),
    );
  };

  return (
    <Link to={`/${id}`}>
      <div className="pizza-block__wrapper">
        <div className="pizza-block">
          <img className="pizza-block__image" src={image} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
          <div className="pizza-block__selector">
            <ul>
              {types.map((type, i) => (
                <li
                  key={i}
                  className={typeIndex === i ? 'active' : ''}
                  onClick={() => setTypeIndex(i)}>
                  {type}
                </li>
              ))}
            </ul>
            <ul>
              {sizes.map((size, i) => (
                <li
                  key={i}
                  className={sizeIndex === i ? 'active' : ''}
                  onClick={() => setSizeIndex(i)}>
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <div className="button button--outline button--add" onClick={() => handleClickAdd(id)}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {!!count && <i>{count}</i>}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PizzaBlock;
