import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const AlbumCategoryView = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await api.fetchAlbums(token);
        setAlbums(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch albums. Please try again later.");
        console.error("Error fetching albums:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 1500;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;
    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-neutral-300">Albums</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left w-6 h-6 text-neutral-300"></i>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right w-6 h-6 text-neutral-300"></i>
            </button>
          </div>
          {/* <button className="text-sm text-neutral-400 hover:text-white transition-colors">
            See all
          </button> */}
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex overflow-hidden gap-4">
        {/* {songs.map((song) => (
          <div
            key={song._id}
            className="flex-shrink-0"
            onClick={() => setCurrentTrack(song.trackUrl)}
          >
            <SongCard
              song={song}
              onPlay={() => setCurrentTrack(song.trackUrl)}
            />
          </div>
        ))} */}
        {albums.map((album) => (
          <div
            key={album._id}
            className="flex-shrink-0 cursor-pointer transition-transform mr-4 group"
            onClick={() => navigate(`/album/${album._id}`)}
          >
            <div className="w-[175px]">
              <div className="relative flex">
                <img
                  src={album.artists[0].image}
                  alt={album.artists[0].name}
                  className="h-[175px] w-[175px] rounded-md object-cover mb-2 group-hover:brightness-50 transition-all duration-300"
                />
                <div
                  className={`absolute right-12 top-1/2 -translate-y-1/2 bg-black/20 p-2 rounded-full
          transition-all duration-300 backdrop-blur-md h-20 w-20
          ${
            isHovered
              ? "opacity-100 translate-x-0 hover:brightness-50"
              : "opacity-0 translate-x-4"
          }`}
                >
                  <i className="fa-solid fa-chevron-right w-6 h-6 text-white bg-transparent absolute right-5 top-8"></i>
                </div>
              </div>
              <div className="px-1">
                <h2 className="text-white font-medium text-sm mb-1 truncate">
                  {album.title}
                </h2>
                <div className="text-gray-500 text-xs">
                  {album.artists.map((artist, index) => (
                    <span key={artist._id}>
                      {artist.name}
                      {index < album.artists.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumCategoryView;
