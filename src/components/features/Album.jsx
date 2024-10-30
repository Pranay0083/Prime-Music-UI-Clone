import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";

const Album = ({ albums = [], loading = false }) => {
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 1500;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    const newPosition = direction === "left"
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(maxScroll, scrollPosition + scrollAmount);

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  if (loading) return <LoadingState />;

  if (!albums.length) {
    return (
      <div className="mt-8 p-4 rounded-lg bg-neutral-800/20">
        <p className="text-neutral-400 text-center">No albums available</p>
      </div>
    );
  }

  const isAtStart = scrollPosition === 0;
  const isAtEnd = scrollPosition >= (scrollContainerRef.current?.scrollWidth - scrollContainerRef.current?.clientWidth);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-neutral-300">Albums</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll("left")}
              disabled={isAtStart}
              className={`p-2 rounded-full transition-all duration-200 
                ${isAtStart 
                  ? 'text-neutral-600 cursor-not-allowed' 
                  : 'text-neutral-300 hover:bg-neutral-800/50'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={isAtEnd}
              className={`p-2 rounded-full transition-all duration-200
                ${isAtEnd
                  ? 'text-neutral-600 cursor-not-allowed'
                  : 'text-neutral-300 hover:bg-neutral-800/50'}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-hidden gap-4 scroll-smooth"
      >
        {albums.map((album) => (
          <div
            key={album._id}
            className="flex-shrink-0 cursor-pointer transition-transform mr-4 group"
            onClick={() => navigate(`/album/${album._id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                    ${isHovered
                      ? "opacity-100 translate-x-0 hover:brightness-50"
                      : "opacity-0 translate-x-4"
                    }`}
                >
                  <ChevronRight className="w-6 h-6 text-white absolute right-5 top-8" />
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

export default Album;