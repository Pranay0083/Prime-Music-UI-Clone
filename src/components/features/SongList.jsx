import React from "react";

const SongList = ({ songs }) => {
  return (
    <div className="mt-8">
      <table className="w-full">
        <thead>
          <tr className="text-gray-400 border-b border-gray-800">
            <th className="pb-4 text-left font-medium w-16">#</th>
            <th className="pb-4 text-left font-medium">Title</th>
            <th className="pb-4 text-left font-medium w-16"></th>
            <th className="pb-4 text-left font-medium w-16"></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr 
              key={song._id}
              className="group hover:bg-white/5 transition-colors"
            >
              <td className="py-4 text-gray-400">{index + 1}</td>
              <td className="py-4">
                <div className="flex flex-col">
                  <span className="font-medium group-hover:text-white transition-colors">
                    {song.title}
                  </span>
                </div>
              </td>
              <td className="py-4">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fa-solid fa-plus text-gray-400 hover:text-white"></i>
                </button>
              </td>
              <td className="py-4">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fa-solid fa-ellipsis-vertical text-gray-400 hover:text-white"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongList;
