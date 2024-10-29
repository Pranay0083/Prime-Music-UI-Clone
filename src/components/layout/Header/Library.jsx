import { useState } from 'react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

function Library() {
  const [showLib, setShowLib] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="relative" 
      onMouseEnter={() => setShowLib(true)} 
      onMouseLeave={() => setShowLib(false)}
    >
      <div className="text-zinc-500 cursor-pointer flex items-center space-x-2 hover:text-cyan-400">
        <i className="fa-solid fa-headphones"></i>
        <span>Library</span>
        <i className="fa-solid fa-caret-down"></i>
      </div>
      {showLib && (
        <div className="absolute top-full right-0 bg-black text-white rounded-xl border-gray-600 border-2 z-10" 
        onMouseEnter={() => setShowLib(true)} 
        onMouseLeave={() => setShowLib(false)}>
          <MenuItem text="Music" onClick={() => navigate('/music')} />
          <MenuItem text="Albums" onClick={() => navigate('/album')} />
        </div>
      )}
    </div>
  );
}

const MenuItem = ({ text, onClick }) => (
  <div 
    className='w-40 py-2 px-4 justify-center content-center border-b-2 border-gray-600 last:border-b-0'
    role="button" 
    tabIndex={0} 
    onClick={onClick} 
  >
    <button type="button" title={text} onClick={onClick}>
      {text}
    </button>
  </div>
);

export default Library;
