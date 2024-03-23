import React, { useState, useEffect } from 'react';
//@ts-ignore
import audioTest from './background_music.mp3'
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const audio = new Audio(audioTest);
  audio.loop = true; // Set the audio to loop

  useEffect(() => {
    const playAudio = () => {
      audio.play();
      setIsPlaying(true);
      audio.volume = 0.2;
    };

    // Check if the user has interacted with the page before playing audio
    const handleUserInteraction = () => {
      window.removeEventListener('click', handleUserInteraction);
      playAudio();
    };

    // Listen for the first user interaction (e.g., click) to play audio
    window.addEventListener('click', handleUserInteraction);

    // Clean up
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      audio.pause();
      setIsPlaying(false);
    };
  }, []); // Empty dependency array to run effect only once after initial render

  return (
    <div>
      {/* Optional: Display playback controls */}
      <button onClick={() => setIsPlaying(!isPlaying)}>
        
      </button>
    </div>
  );
};

export default AudioPlayer;
