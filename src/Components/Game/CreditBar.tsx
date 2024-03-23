import {useState} from 'react'
import { Progress,Box } from '@chakra-ui/react'

type Props = {
  initCreditScore: number
}

function CreditBar({initCreditScore}: Props) {
  const [creditScore, setCreditScore] = useState<number>(initCreditScore)
  const CREDIT_MAX = 850
  return (
    <div className="App">
      <Box width="30vw">
        <Box color="white">Credit Score: {creditScore}</Box>
        <Progress hasStripe colorScheme='red' value={creditScore/CREDIT_MAX*100} />
      </Box>
    </div>
  );
}

export default CreditBar;
