import {useState} from 'react'
import { Progress } from '@chakra-ui/react'

function CreditBar() {
  const [creditScore, setCreditScore] = useState<number>(635)
  const CREDIT_MAX = 850
  return (
    <div className="App">
      <div>Credit Score: {creditScore}</div>
      <Progress hasStripe colorScheme='red' value={creditScore/CREDIT_MAX*100} />
    </div>
  );
}

export default CreditBar;
