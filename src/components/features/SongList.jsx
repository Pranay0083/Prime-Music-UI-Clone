import React from "react";

const SongList = ({ songs }) => {
  return (
    <div className="space-y-2">
      {songs.map((song) => (
        <div
          key={song._id}
          className="flex items-center justify-between py-3 px-4 hover:bg-gray-900 rounded-lg group"
        >
          <div className="flex items-center space-x-4">
            <span className="w-6 text-gray-400">{song._id}</span>
            <div>
              <div className="text-white">{song.title}</div>
              <div className="text-gray-400">{song.artist.map(artist => artist.name).join(', ')}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <i className="fa-solid fa-plus text-gray-400"></i>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <i className="fa-solid fa-ellipsis-vertical text-gray-400"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
