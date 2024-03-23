import { Flex } from '@chakra-ui/react';
import {useState} from 'react'


function Gold() {
  const [gold, setGold] = useState<number>(0)
  return (
    <Flex justifyContent="flex-end">
      <div className="App">
        <div>Gold: {gold}</div>
      </div>
    </Flex>
  );
}

export default Gold;
