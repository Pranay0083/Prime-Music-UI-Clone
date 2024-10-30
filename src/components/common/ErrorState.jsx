import React from 'react';
import { Music, WifiOff } from 'lucide-react';

const ErrorState = ({ error, retry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {/* Animated Icon Container */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 animate-pulse">
            <Music className="w-full h-full text-red-500 opacity-75" />
          </div>
          <WifiOff className="absolute inset-0 w-full h-full text-red-500 animate-bounce" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-red-500">
            Playback Error
          </h2>
          
          <p className="text-zinc-400 text-sm">
            {error || "Oops! Looks like the music stopped playing. Don't worry, it happens to the best of us."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={retry}
            className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
          
          <button className="w-full px-6 py-3 border border-zinc-700 hover:border-zinc-600 rounded-lg font-medium transition-colors duration-200">
            Go to Homepage
          </button>
        </div>

        {/* Help Text */}
        <p className="text-zinc-500 text-xs">
          If the problem persists, please check your internet connection or contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorState;