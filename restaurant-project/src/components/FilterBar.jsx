import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterBar = ({ mode, onFilterChange }) => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('Price');
  const [selectedCategory, setSelectedCategory] = useState('Categories');

  const handleFilterChange = (e) => {
    setFilterOpen(e.target.checked);
    onFilterChange({ isOpen: e.target.checked, price: selectedPrice, category: selectedCategory });
  };

  const handleDropdownChange = (type, value) => {
    if (type === 'price') {
      setSelectedPrice(value);
    } else if (type === 'category') {
      setSelectedCategory(value);
    }
    onFilterChange(filterOpen);
  };

  const handleBtnClear = () => {
    setFilterOpen(false);
    setSelectedPrice('Price');
    setSelectedCategory('Categories');
    onFilterChange(false);
  };

  const toggleDropdown = (type) => {
    setDropdownOpen({ ...dropdownOpen, [type]: !dropdownOpen[type] });
  };

  return (
    <section className='filter-bar'>
      {mode === 'home' ? (
        <>
          <div className="filter-section">
            <label htmlFor="filter">Filter By: </label>
            <label className='radio-button'>
              <input type="radio" name="e" checked={filterOpen} onChange={handleFilterChange} /> Open
            </label>
            <div className="dropdown">
              <input type="checkbox" id="my-dropdown" value="" name="my-checkbox" />
              <label htmlFor="my-dropdown" data-toggle="dropdown">
                {selectedPrice}
              </label>
              <ul>
                <li><a href="#" onClick={() => handleDropdownChange('price', '0')}>0</a></li>
                <li><a href="#" onClick={() => handleDropdownChange('price', '1')}>1</a></li>
                <li><a href="#" onClick={() => handleDropdownChange('price', '2')}>2</a></li>
                <li><a href="#" onClick={() => handleDropdownChange('price', '3')}>3</a></li>
              </ul>
            </div>

            <div className="dropdown">
              <input type="checkbox" id="my-anchor" value="" name="my-anchor" />
              <label htmlFor="my-anchor" data-toggle="dropdown">
                {selectedCategory}
              </label>
              <ul>
                <li><a href="#" onClick={() => handleDropdownChange('category', 'Restaurant')}>Restaurant</a></li>
                <li><a href="#" onClick={() => handleDropdownChange('category', 'Bar')}>Bar</a></li>
              </ul>
            </div>
          </div>

          <button className="btn-clear" onClick={handleBtnClear}>CLEAR ALL</button>
        </>
      ) : (
        <button className='btn-back' onClick={() => navigate('/')}>Back</button>
      )}
    </section>
  );
};

export default FilterBar;
