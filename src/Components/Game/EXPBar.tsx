import { Button } from '@chakra-ui/react'
import {useState} from 'react'
import { Progress, Box } from '@chakra-ui/react'

type Props = {
  exp: number;
  level: number;
}

function EXPBar({exp, level}: Props) {




  return (
    <div className="App">
      <Box width="30vw">
        {/* <Button colorScheme='blue' onClick={onClickFunc}>Button</Button> */}
        <Box color="white">Level: {level}</Box>
        <Progress hasStripe colorScheme='green' value={(exp/(2**level/5))*100} />
      </Box>
    </div>
  );
}

export default EXPBar;
