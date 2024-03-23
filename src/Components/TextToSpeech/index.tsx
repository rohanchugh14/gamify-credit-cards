import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
// @ts-ignore
import keeper1 from './keeper1.mp3'
//@ts-ignore
import keeper2 from './keeper2.mp3'
// @ts-ignore
import keeper3 from './keeper3.mp3'
//@ts-ignore
import keeper4 from './keeper4.mp3'
// @ts-ignore
import keeper5 from './keeper5.mp3'
import { calcLength } from 'framer-motion';

type Props = {
  runOnClickPrev: (e: any) => void,
  runOnClickNext: (e: any) => void
}
const AudioPlayer = ({runOnClickPrev, runOnClickNext}: Props) => {
  //   const [audioIndex, setAudioIndex] = useState(0);
  //   const [isPlaying, setIsPlaying] = useState(false);
  //   const audioFiles = [
  //     'keeper1',
  //     //'audioTest2',
  //     // Add more MP3 files as needed
  //   ];

  //   const audio = new Audio(audioFiles[audioIndex]);
  const audioFiles = [keeper1, keeper2, keeper3, keeper4, keeper5];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(audioFiles[currentTrackIndex]);


  useEffect(() => {
    isPlaying ? audio.play() : audio.pause()
  }, [isPlaying, audio])
  useEffect(() => {
    return () => audio.pause()
  }, [audio])
  const togglePlay = () => {
    if (isPlaying) {
      console.log("pausing")
      audio.pause();
    } else {
      console.log("playing")
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };


  //   const nextTrack = () => {
  //     const newIndex = (audioIndex + 1) % audioFiles.length; // Loop back to the first track if at the end
  //     setAudioIndex(newIndex);
  //     //setIsPlaying(false); // Pause the current audio
  //     audio.src = audioFiles[newIndex]; // Update the audio source
  //   };
  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % audioFiles.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false); // Pause the current audio
    audio.src = audioFiles[nextIndex]; // Update the audio source
  };
  const previousTrack = () => {
    const previousIndex = (currentTrackIndex - 1 + audioFiles.length) % audioFiles.length;
    setCurrentTrackIndex(previousIndex);
    setIsPlaying(false); // Pause the current audio
    audio.src = audioFiles[previousIndex]; // Update the audio source
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Button style={{ marginRight: '5px' }} colorScheme='teal' size='lg' onClick={(e: any) => {previousTrack(); runOnClickPrev(e)}}>
        Prev Audio
      </Button>
      <Button colorScheme='red' size='lg' onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Button style={{ marginLeft: '5px' }} colorScheme='teal' size='lg' onClick={(e: any) => {nextTrack(); runOnClickNext(e)}}>
        Next Audio
      </Button>
    </div>
  );
};

export default AudioPlayer;

