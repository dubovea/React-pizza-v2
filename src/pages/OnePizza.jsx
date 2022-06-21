import { useEffect } from 'react';
import { useAppDispath } from '../redux/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPizzaById } from '../redux/pizza/actions';
import { pizzaSelector } from '../redux/pizza/selectors';

function OnePizza() {
  const { pizzaId } = useParams();
  const dispatch = useAppDispath();
  const { pizza } = useSelector(pizzaSelector);

  useEffect(() => {
    dispatch(
      fetchPizzaById({
        id: pizzaId,
      }),
    );
  }, []);

  return (
    <div className="pizza-block__wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={pizza.image} alt="Pizza" />
        <h4 className="pizza-block__title">{pizza.title}</h4>
      </div>
    </div>
  );
}

export default OnePizza;
