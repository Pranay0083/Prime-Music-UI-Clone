import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';

const MusicPlayer = ({ currentTrack }) => {
  // const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   if (currentTrack) {
  //     setTrackIndex(trackList.indexOf(currentTrack));
  //   }
  // }, [currentTrack, trackList]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    // if (trackIndex < trackList.length - 1) {
    //   playNext(trackIndex + 1);
    //   setTrackIndex(trackIndex + 1);
    // }
  };

  const handlePrevious = () => {
    // if (trackIndex > 0) {
    //   playPrevious(trackIndex - 1);
    //   setTrackIndex(trackIndex - 1);
    // }
  };

  return (
    <div className="music-player" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      {currentTrack && (
        <AudioPlayer
          src={currentTrack.audio_url}
          onPlay={handlePlayPause}
          onPause={handlePlayPause}
          onClickNext={handleNext}
          onClickPrevious={handlePrevious}
          showSkipControls={true}
          showJumpControls={false}
          customAdditionalControls={[]}
          customVolumeControls={[]}
        />
      )}
    </div>
  );
};

export default MusicPlayer;