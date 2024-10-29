import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ album }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className='flex-shrink-0 cursor-pointer transition-transform mr-4 group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/album/${album._id}`)}
    >
      <div className='w-[175px]'>
        <div className='relative flex'>
          <img
            src={album.artists[0].image}
            alt={album.artists[0].name}
            className='h-[175px] w-[175px] rounded-md object-cover mb-2 group-hover:brightness-50 transition-all duration-300'
          />
          <div
            className={`absolute right-12 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full
              transition-all duration-300 backdrop-blur-md h-20 w-20
              ${isHovered ? 'opacity-100 translate-x-0 hover:brightness-50' : 'opacity-0 translate-x-4'}`}
          >
            <i className="fa-solid fa-chevron-right w-6 h-6 text-white bg-transparent absolute right-5 top-8"></i>
          </div>
        </div>
        <div className="px-1">
          <h2 className='text-white font-medium text-sm mb-1 truncate'>
            {album.title}
          </h2>
          <div className='text-gray-500 text-xs'>
            {/* {album.artist.map((artist, index) => (
              <span key={artist._id}>
                {artist.name}
                {index < album.artist.length - 1 ? ', ' : ''}
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
