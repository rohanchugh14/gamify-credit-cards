import { useEffect, useMemo, useState } from 'react';
import { Button } from '@chakra-ui/react'
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

type Props = {
  runOnClickPrev: (e: any) => void,
  runOnClickNext: (e: any) => void,
  iter: number,
}
const AudioPlayer = ({runOnClickPrev, runOnClickNext, iter}: Props) => {
  //   const [audioIndex, setAudioIndex] = useState(0);
  //   const [isPlaying, setIsPlaying] = useState(false);
  //   const audioFiles = [
  //     'keeper1',
  //     //'audioTest2',
  //     // Add more MP3 files as needed
  //   ];

    // const audio = new Audio(audioFiles[audioIndex]);
  const audioFiles = useMemo(() => [keeper1, keeper2, keeper3, keeper4, keeper5], [])
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useMemo(() => {
    return new Audio(audioFiles[iter]); 
  }, [audioFiles, iter]);

  useEffect(() => {
    setIsPlaying(false)
    audio.src = audioFiles[iter]
  }, [audio, audioFiles, iter])
  useEffect(() => {
    const func = async() => {
      isPlaying ? await audio.play() : audio.pause()
    }
    func()
  }, [isPlaying, audio])
  // useEffect(() => {
  //   return () => audio.pause()
  // }, [audio])
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


  //   const nextTrack = () => {
  //     const newIndex = (audioIndex + 1) % audioFiles.length; // Loop back to the first track if at the end
  //     setAudioIndex(newIndex);
  //     //setIsPlaying(false); // Pause the current audio
  //     audio.src = audioFiles[newIndex]; // Update the audio source
  //   };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Button style={{ marginRight: '5px' }} colorScheme='teal' size='lg' isDisabled={iter===0} onClick={(e: any) => {runOnClickPrev(e)}}>
        Prev Audio
      </Button>
      <Button colorScheme='red' size='lg' onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Button style={{ marginLeft: '5px' }} colorScheme='teal' size='lg' isDisabled={iter===audioFiles.length-1} onClick={(e: any) => {runOnClickNext(e)}}>
        Next Audio
      </Button>
    </div>
  );
};

export default AudioPlayer;

