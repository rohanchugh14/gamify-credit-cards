import { useState, useEffect } from 'react';
//@ts-ignore
import audioTest from './background_music.mp3'
import { Button } from '@chakra-ui/react';
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // const audio = new Audio(audioTest);
  const [audio, setAudio] = useState<any>(null)
  

  useEffect(() => {
    if (audio === null) {
      setAudio(new Audio(audioTest))
      return
    }
    audio.loop = true; // Set the audio to loop
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
  }, [audio]); // Empty dependency array to run effect only once after initial render

  const togglePlay = async() => {
    if (isPlaying) {
      console.log("pausing")
      audio.pause();
    } else {
      console.log("playing")
      await audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      {/* Optional: Display playback controls */}
      <Button colorScheme='red' size='lg' onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
    </div>
  );
};

export default AudioPlayer;
