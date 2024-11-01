import React, { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackInfo, setCurrentTrackInfo] = useState({
    title: '',
    artist: '',
    albumId: null
  });

  const playTrack = (trackUrl, trackInfo) => {
    // console.log(`playing ${trackUrl}`)
    setCurrentTrack(trackUrl);
    setCurrentTrackInfo(trackInfo);
  };

  const clearTrack = () => {
    setCurrentTrack(null);
    setCurrentTrackInfo({
      title: '',
      artist: '',
      albumId: null
    });
  };

  return (
    <MusicContext.Provider 
      value={{ 
        currentTrack, 
        currentTrackInfo, 
        playTrack, 
        clearTrack 
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusicPlayer = () => useContext(MusicContext);