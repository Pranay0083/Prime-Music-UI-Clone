import React from 'react';
import { Disc3, Home, ChevronLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* Animated Record Player */}
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 animate-spin-slow">
            <Disc3 className="w-full h-full text-violet-500" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl font-bold text-white">404</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Oops! The beat dropped out
          </h1>
          <p className="text-gray-400 text-lg">
            Looks like this Page doesn't exists on our website. The page you're looking for has gone off the charts.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center px-6 py-3 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>

        {/* Sound Wave Animation */}
        <div className="flex justify-center items-center gap-1 mt-8">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-violet-500 rounded-full animate-soundwave"
              style={{
                height: `${Math.random() * 2 + 1}rem`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes soundwave {
          0%, 100% {
            height: 0.5rem;
          }
          50% {
            height: 2rem;
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-soundwave {
          animation: soundwave 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;