import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

function Categories() {
  const dispatch = useDispatch();
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const categoryId = useSelector((state) => state.filter.categoryId);
  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={i === categoryId ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
