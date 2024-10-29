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
    <div className="flex space-x-8 mb-8">
      <div className="w-64 h-64">
        <img src={album.image} alt="Cover Art" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-end pb-8">
        <div className="text-teal-400 uppercase text-sm mb-2">ALBUM</div>
        <h1 className="text-5xl font-bold mb-4">{album.title}</h1>
        <div className="text-gray-400 mb-2">
          {album.artists.map(artist => (
            <span
              key={artist._id}
              className="cursor-pointer hover:underline"
              onClick={() => goToArtistPage(artist._id)}
            >
              {artist.name}
            </span>
          ))}
        </div>
        <div className="text-gray-400 mb-4">{album.songs.length} songs</div>
        <button
          className="bg-teal-400 text-black px-8 py-2 rounded-full hover:bg-teal-300 transition-colors"
          onClick={playAllSongs}
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default AlbumHeader;
