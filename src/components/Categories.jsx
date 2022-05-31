function Categories({ value, onChange }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (index) => {
    onChange(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={i === value ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
