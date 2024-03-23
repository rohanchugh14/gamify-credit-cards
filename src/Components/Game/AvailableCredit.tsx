import {useState} from 'react'
import { Progress } from '@chakra-ui/react'
import { Box,Flex } from '@chakra-ui/react'
type Props = {
  creditLimit: number
  creditUsed: number
}
function AvailableCredit({creditLimit, creditUsed}: Props) {
  return (
    <div className="App">
      <Flex justifyContent="center">
        <Box display="flex" flexDirection="column" width="70vw">
          <Box display="flex" justifyContent="space-between">
            <Box color="white">Total Available Credit</Box>
            <Box color="white">${creditLimit.toFixed(2)}</Box>
          </Box>
          <Box display="flex">
            <Box color="white">${(creditLimit-creditUsed).toFixed(2)}</Box>
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
