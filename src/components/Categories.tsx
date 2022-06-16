import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { filterSelector, setCategory } from '../redux/slices/filterSlice';

type CategoryProps = {
  id: number;
  name: string;
};

function Categories() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const getCategories = () => {
    axios.get('http://localhost:3001/categories').then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const { category }: { category: number } = useSelector(filterSelector);
  const onClickCategory = (id: number) => {
    dispatch(setCategory(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((obj) => (
          <li
            key={obj.id}
            onClick={() => onClickCategory(obj.id)}
            className={obj.id === category ? 'active' : ''}>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
