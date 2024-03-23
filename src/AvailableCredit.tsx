import {useState} from 'react'
import { Progress } from '@chakra-ui/react'
import { Box,Flex } from '@chakra-ui/react'

function AvailableCredit() {
  const [creditLimit, setCreditLimit] = useState<number>(2200)
  const [creditUsed, setCreditUsed] = useState<number>(1230.32)
  return (
    <div className="App">
      <Flex justifyContent="center">
        <Box display="flex" flexDirection="column" width="70vw">
          <Box display="flex" justifyContent="space-between">
            <Box>Total Available Credit</Box>
            <Box>${creditLimit}</Box>
          </Box>
          <Box display="flex">
            <Box>${(creditLimit-creditUsed).toFixed(2)}</Box>
          </Box>
          <Box>
            <Progress hasStripe colorScheme='blue' value={creditUsed/creditLimit*100} />
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default AvailableCredit;
