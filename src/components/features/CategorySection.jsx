import React, { useState, useRef, useEffect } from "react";
import SongCard from "./SongCard";

const CategorySection = ({ title, songs }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth;
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

  const updateScrollPosition = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollPosition);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollPosition);
      }
    };
  }, []);

  const isAtStart = scrollPosition === 0;
  const isAtEnd =
    scrollPosition >=
    scrollContainerRef.current?.scrollWidth -
      scrollContainerRef.current?.clientWidth;

  return (
    <div >
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-neutral-300">{title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll("left")}
              disabled={isAtStart}
              className={`p-2 rounded-full transition-all duration-200 ${
                isAtStart
                  ? "text-neutral-600 cursor-not-allowed"
                  : "text-neutral-300 hover:bg-neutral-800/50"
              }`}
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left w-6 h-6"></i>
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={isAtEnd}
              className={`p-2 rounded-full transition-all duration-200 ${
                isAtEnd
                  ? "text-neutral-400 cursor-not-allowed"
                  : "text-neutral-300 hover:bg-neutral-800/50"
              }`}
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right w-6 h-6"></i>
            </button>
          </div>
          {/* <button className="text-sm text-neutral-400 hover:text-white transition-colors">
            See all
          </button> */}
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
