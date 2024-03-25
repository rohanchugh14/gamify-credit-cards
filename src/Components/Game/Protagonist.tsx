import { Box } from '@chakra-ui/react';
import {useState} from 'react'

type Props = {
  creditLimit: number
  creditUsed: number
}
function Protagonist({creditLimit, creditUsed}: Props) {
  const [animationState, setAnimationState] = useState<number>(0)
  let proportion = ((1-creditUsed/creditLimit)*70-4).toFixed(2) + "vw"
  const animFromState = (state: number) => {
    switch (state) {
      case 0:
      case 1: return "Assets/attack.gif"
      case 2: return "Assets/sprint.gif"
      case 3: return "Assets/death.gif"
      default: return "Assets/Idle.gif"
    }
  }
  return (
    <Box className="App" onClick={() => setAnimationState(animationState + 1)}>
      <img src={animFromState(animationState)} alt="protagonist" width="80px" className="Protagonist" style={{right: proportion}}/>
    </Box>
  );
}

export default Protagonist;
