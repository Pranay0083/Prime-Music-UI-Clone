import React from "react";
import { useNavigate } from "react-router-dom";

const AlbumHeader = ({ album }) => {
  const navigate = useNavigate();

  const playAllSongs = () => {
    console.log("Playing all songs in the album:", album.songs);
  };

  const goToArtistPage = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
      <div className="relative group w-64 h-64 flex-shrink-0">
        <img 
          src={album.image || "/api/placeholder/256/256"} 
          alt={album.title}
          className="w-full h-full object-cover rounded-lg shadow-xl group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      
      <div className="flex flex-col justify-end">
        <span className="text-sm font-medium uppercase tracking-wider text-gray-400">ALBUM</span>
        <h1 className="text-4xl font-bold mt-2 mb-4">{album.title}</h1>
        
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          {album.artists.map((artist, index) => (
            <React.Fragment key={artist._id}>
              <button
                onClick={() => goToArtistPage(artist._id)}
                className="hover:text-white hover:underline transition-colors"
              >
                {artist.name}
              </button>
              {index < album.artists.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
          <span>•</span>
          <span>{album.songs.length} songs</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={playAllSongs}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-full transition-colors"
          >
            <i class="fa-solid fa-play"></i>
            Play
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeader;
