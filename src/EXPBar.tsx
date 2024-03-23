import { Button } from '@chakra-ui/react'
import {useState} from 'react'
import { Progress } from '@chakra-ui/react'

function EXPBar() {
  const [XP, setXP] = useState<number>(0)
  const [level, setLevel] = useState<number>(1)

  // current XP
  // level
  // if current XP >= XP to next level:
    // current XP = 0
    // level += 1
    // XP to next level = 2^level
  // progress = XP/XP to next level

  // somewhere else add 20, then pass in full val to this
  const calculateLevel = (newXP: number) => {
    let currLevel = level
    console.log(newXP)
    while(newXP > 2 ** currLevel) {
      newXP -= 2 ** currLevel
      currLevel += 1 
    }
    console.log(currLevel, newXP)
    return [currLevel, newXP]

  }

  const onClickFunc = () => {
    const [newLevel, newXP] = calculateLevel(XP + 20)
    setLevel(newLevel)
    setXP(newXP)
  }

  return (
    <div className="App">
      <Button colorScheme='blue' onClick={onClickFunc}>Button</Button>
      <div>level: {level}</div>
      <Progress value={XP/2**level*100} />
    </div>
  );
}

export default EXPBar;
