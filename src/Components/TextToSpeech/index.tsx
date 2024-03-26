
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@chakra-ui/react'

type Props = {
  runOnClickPrev: (e: any) => void,
  runOnClickNext: (e: any) => void,
  iter: number,
}
const AudioPlayer = ({runOnClickPrev, runOnClickNext, iter}: Props) => {
  const lastFileIndex = 4;
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = useMemo(() => {
    return new Audio(`/Assets/keeper${iter+1}.mp3`); 
  }, [iter]);

  useEffect(() => {
    audio.src = `/Assets/keeper${iter+1}.mp3`
  }, [audio, iter])
  useEffect(() => {
    const func = async() => {
      isPlaying ? await audio.play() : audio.pause()
    }
    func()
  }, [isPlaying, audio])
  useEffect(() => {
    return () => audio.pause()
  }, [audio])
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Button style={{ marginRight: '5px' }} colorScheme='teal' size='lg' isDisabled={iter===0} onClick={(e: any) => {runOnClickPrev(e)}}>
        Prev Nugget
      </Button>
      <Button colorScheme='red' size='lg' onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </Button>
      <Button style={{ marginLeft: '5px' }} colorScheme='teal' size='lg' isDisabled={iter===lastFileIndex} onClick={(e: any) => {runOnClickNext(e)}}>
        Next Nugget
      </Button>
    </div>
  );
};

export default AudioPlayer;

