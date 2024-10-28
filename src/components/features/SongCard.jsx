import React from 'react';
import { useNavigate } from 'react-router-dom';

const SongCard = ({ song }) => {
  const navigate = useNavigate();

  return (
    <div
      className='flex-shrink-0 cursor-pointer transition-transform hover:scale-105'
      onClick={() => navigate(`/song/${song._id}`)}
    >
      <div className='w-[200px]'>
        <img 
          src={song.thumbnail} 
          alt={`${song.title} thumbnail`} 
          className='h-[200px] w-[200px] rounded-md object-cover mb-2'
        />
        <div className="px-1">
          <h2 className='text-white font-medium text-sm mb-1 truncate'>
            {song.title}
          </h2>
          <div className='text-gray-500 text-xs'>
            {song.artist.map((artist, index) => (
              <span key={artist._id}>
                {artist.name}
                {index < song.artist.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;

