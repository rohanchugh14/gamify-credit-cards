import {useState} from 'react'
import { Progress,Box } from '@chakra-ui/react'

function CreditBar() {
  const [creditScore, setCreditScore] = useState<number>(635)
  const CREDIT_MAX = 850
  return (
    <div className="App">
      <Box width="30vw">
        <div>Credit Score: {creditScore}</div>
        <Progress hasStripe colorScheme='red' value={creditScore/CREDIT_MAX*100} />
      </Box>
    </div>
  );
}

export default CreditBar;
