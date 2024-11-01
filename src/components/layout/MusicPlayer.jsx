import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
} from "lucide-react";

const MusicPlayer = ({
  currentTrack,
  onPlayNext,
  onPlayPrevious,
  trackTitle = "Unknown Track",
  artist = "Unknown Artist",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  const handleVolumeChange = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    audioRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-neutral-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between h-20 px-4 gap-4">
          {/* Track Info */}
          <div className="flex items-center min-w-0">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-gray-500" />
            </div>
            <div className="ml-3 min-w-0">
              <div className="text-white truncate text-sm font-medium">
                {trackTitle}
              </div>
              <div className="text-neutral-400 truncate text-xs">{artist}</div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex-1 max-w-2xl">
            <div className="flex flex-col items-center gap-2">
              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={onPlayPrevious}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-black" />
                  ) : (
                    <Play className="w-4 h-4 text-black ml-0.5" />
                  )}
                </button>
                <button
                  onClick={onPlayNext}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full flex items-center gap-2">
                <span className="text-xs text-neutral-400 w-10">
                  {formatTime(currentTime)}
                </span>
                <div
                  ref={progressBarRef}
                  className="flex-1 h-1 bg-neutral-600 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div
                    className="h-full bg-white rounded-full"
                    style={{
                      width: `${(currentTime / duration) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs text-neutral-400 w-10">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-32">
            <button
              onClick={toggleMute}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-neutral-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
            />
          </div>

          <audio
            ref={audioRef}
            src={currentTrack}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;