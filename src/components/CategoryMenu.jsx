import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CategoryMenu = () => {
  const categories = useSelector((state) => state.categories);

  return (
    <ul className='categories-list list-group'>
      {categories.map((category) => (
        <li key={category.id} className='list-group-item'>
          <Link
            className='list-list-group-item-action'
            to={`/category/${category.id}`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryMenu;
