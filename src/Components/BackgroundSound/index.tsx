import React, { useState } from 'react';

// Define props interface
interface SoundTogglerProps {
  soundFile: string;
  soundOnImage: string;
  soundOffImage: string;
}
const BackgroundSound: React.FC<SoundTogglerProps> = ({ soundFile, soundOnImage, soundOffImage }) => {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(soundFile));

  const toggleSound = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <img
        src={isPlaying ? soundOnImage : soundOffImage}
        style={{ width: '50px', height: '50px', cursor: 'pointer' }}
        onClick={toggleSound}
        alt="sound"
      />
    </div>
  );
};

export default BackgroundSound;

