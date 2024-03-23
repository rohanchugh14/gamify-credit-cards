import { Flex, Box } from '@chakra-ui/react';
import {useState} from 'react'


function Gold() {
  const [gold, setGold] = useState<number>(0)
  return (
    <Flex justifyContent="flex-end">
      <div className="App">
        <Box color="white">Gold: {gold}</Box>
      </div>
    </Flex>
  );
}

export default Gold;
