import React from 'react';
import SongCard from './SongCard';

const CategorySection = ({ title, songs }) => {
  return (
    <div className='mt-8'>
      <h1 className='text-xl font-bold text-neutral-300 mb-4'>
        {title}
      </h1>
      <div className='flex overflow-x-auto scrollbar-hide gap-4'>
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;