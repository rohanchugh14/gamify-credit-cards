import { Box } from '@chakra-ui/react';
import {useState} from 'react'

type Props = {
  creditLimit: number
  creditUsed: number
}
function Enemy({creditLimit, creditUsed}: Props) {
  const [animationState, setAnimationState] = useState<number>(0)
  let proportion = (creditUsed/creditLimit*70-4).toFixed(2) + "vw"
  const animFromState = (state: number) => {
    switch (state) {
      case 0:
      case 1: return "Assets/Skeleton Attack.gif"
      case 2: return "Assets/Skeleton Walk.gif"
      case 3: return "Assets/Skeleton Hit.gif"
      case 4: return "Assets/Skeleton Dead.gif"
      default: return "Assets/Skeleton Idle.gif"
    }
  }
  return (
    <Box className="App" onClick={() => setAnimationState(animationState + 1)}>
      <img src={animFromState(animationState)} alt="protagonist" width="80px" className='Enemy' style={{left: proportion}}/>
    </Box>
  );
}

export default Enemy;
