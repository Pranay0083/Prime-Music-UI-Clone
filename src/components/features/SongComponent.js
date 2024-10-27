import React from 'react';
import ThreeDotMenu from './ThreeDotMenu';

const SongComponent = ({ song }) => {
  return (
    <div className="song-component" style={{ position: 'relative' }}>
      <img src={song.thumbnail} alt={song.title} />
      <p>{song.title} by {song.artist.map(artist => artist.name).join(', ')}</p>
      <ThreeDotMenu song={song} />
    </div>
  );
};

export default SongComponent;
