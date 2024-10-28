import React, { useState, useRef } from "react";
import SongCard from "./SongCard";

const CategorySection = ({ title, songs }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 1000;
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

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-neutral-300">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
              aria-label="Scroll left"
            >
            <i class="fa-solid fa-chevron-left w-6 h-6 text-neutral-300"></i>
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 rounded-full hover:bg-neutral-800/50 transition-colors"
              aria-label="Scroll right"
            >
              <i class="fa-solid fa-chevron-right w-6 h-6 text-neutral-300"></i>
            </button>
          </div>
          <button className="text-sm text-neutral-400 hover:text-white transition-colors">
            See all
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden gap-4"
      >
        {songs.map((song) => (
          <div key={song._id} className="flex-shrink-0">
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
