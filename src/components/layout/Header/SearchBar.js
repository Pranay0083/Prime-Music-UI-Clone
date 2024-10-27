import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center rounded-full h-10 pl-6 pr-6 bg-white w-[256px] justify-between cursor-pointer" onClick={() => navigate('/search')}>
      <span className="bg-white text-gray-700">search</span>
      <i className="fa-solid fa-magnifying-glass bg-white" style={{ color: '#7b8493' }}></i>
    </div>
  );
}

export default SearchBar;