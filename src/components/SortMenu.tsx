import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { filterSelector, setSortType } from '../redux/slices/filterSlice';
import { useAppDispath } from '../redux/store';

type SortProps = {
  id: number;
  name: string;
  type: string;
};

const SortMenu: React.FC = React.memo(() => {
  const dispatch = useAppDispath();
  const sortMenuRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState<SortProps[]>([]);

  const getCategories = () => {
    axios.get('http://localhost:3001/sorters').then((response) => {
      setCategories(response.data);
    });
  };

  useEffect(() => {
    getCategories();
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !event.composedPath().includes(sortMenuRef.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const { orderBy }: { orderBy: string } = useSelector(filterSelector),
    title = categories.find((o) => o.type === orderBy)?.name;

  const onChangeSortCategory = (obj: SortProps) => {
    setVisible(false);
    dispatch(setSortType(obj.type));
  };

  return (
    <div ref={sortMenuRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisible(!visible)}>{title}</span>
      </div>
      {visible && (
        <div className="sort__popup">
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                className={category.type === orderBy ? 'active' : ''}
                onClick={() => onChangeSortCategory(category)}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortMenu;
