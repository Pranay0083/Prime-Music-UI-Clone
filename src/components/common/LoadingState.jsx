import React from 'react';

// Animated bars that simulate music equalizer
const LoadingBars = () => (
  <div className="flex items-end gap-1 h-8">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="w-1 bg-red-500 rounded-t animate-pulse"
        style={{
          height: `${Math.max(40, Math.random() * 100)}%`,
          animationDelay: `${i * 0.2}s`
        }}
      />
    ))}
  </div>
);

// Card skeleton for music items
const CardSkeleton = () => (
  <div className="bg-zinc-900 rounded-lg p-4 w-full">
    {/* Album art skeleton */}
    <div className="aspect-square bg-zinc-800 rounded-md mb-4 animate-pulse">
      <LoadingBars />
    </div>
    {/* Text content skeletons */}
    <div className="space-y-2">
      <div className="h-4 bg-zinc-800 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-zinc-800 rounded w-1/2 animate-pulse" />
    </div>
  </div>
);

// Grid of card skeletons
const CardsLoadingState = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Full page loading state
const PageLoadingState = () => (
  <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Center loading animation */}
      <div className="mb-8">
        <LoadingBars />
      </div>
      
      {/* Loading text with dot animation */}
      <div className="text-zinc-400 flex items-center space-x-2">
        <span>Loading</span>
        <span className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              .
            </span>
          ))}
        </span>
      </div>
    </div>
  </div>
);

// Main loading component that can handle different types
const LoadingState = ({ type = 'page', cardCount = 8 }) => {
  switch (type) {
    case 'cards':
      return <CardsLoadingState count={cardCount} />;
    case 'inline':
      return (
        <div className="flex items-center justify-center p-4">
          <LoadingBars />
        </div>
      );
    case 'page':
    default:
      return <PageLoadingState />;
  }
};

export default LoadingState;



// // For full page loading
// <LoadingState type="page" />

// // For a grid of loading cards
// <LoadingState type="cards" cardCount={12} />

// // For inline loading
// <LoadingState type="inline" />