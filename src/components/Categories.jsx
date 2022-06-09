import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategory } from '../redux/slices/filterSlice';

function Categories() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get('http://localhost:3001/categories').then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const onClickCategory = (id) => {
    dispatch(setCategory(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onClickCategory(category.id)}
            className={category.id === categoryId ? 'active' : ''}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
