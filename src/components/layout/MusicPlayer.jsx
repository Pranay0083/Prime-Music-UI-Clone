import AudioPlayer from 'react-h5-audio-player';

const MusicPlayer = ({ currentTrack }) => {
  console.log("player")
  return (
    <div className="music-player" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <AudioPlayer
      autoPlay
      src={currentTrack}
      onPlay={e => console.log("onPlay")}
      // other props here
    />
    </div>
  );
};

export default MusicPlayer;