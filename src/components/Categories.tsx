import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { filterSelector, setCategory } from '../redux/slices/filterSlice';
import { useAppDispath } from '../redux/store';

type CategoryProps = {
  id: number;
  name: string;
};

const Categories: React.FC = () => {
  const dispatch = useAppDispath();
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
};

export default Categories;
