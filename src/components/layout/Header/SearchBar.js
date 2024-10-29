import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search/results?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
    navigate('/search');
  };

  const handleBlur = () => {
    if (!searchValue) {
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <div
        className={`flex items-center bg-white rounded-full border border-gray-300 transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-10'}`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full rounded-full outline-none transition-all duration-300 ${isExpanded ? 'px-2 opacity-100' : 'opacity-0 w-0'}`}
        />
        <button
          type="submit"
          className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          onClick={() => !isExpanded && handleFocus()}
        >
          <i className="fa-solid fa-magnifying-glass h-5 w-5 text-gray-600"></i>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
