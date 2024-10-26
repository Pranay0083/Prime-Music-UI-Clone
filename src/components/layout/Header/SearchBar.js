import React from 'react';

function SearchBar() {
  return (
    <div className="flex items-center rounded-full h-10 pl-6 pr-6 bg-white w-[256px] justify-between pointer">
      <span className='bg-white text-gray-700'>search</span>
      <i className="fa-solid fa-magnifying-glass bg-white" style={{ color: '#7b8493' }}></i>
    </div>
  );
}

export default SearchBar;
