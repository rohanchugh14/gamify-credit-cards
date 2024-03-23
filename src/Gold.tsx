import {useState} from 'react'

function Gold() {
  const [gold, setGold] = useState<number>(0)
  return (
    <div className="App">
      <div>Gold: {gold}</div>
    </div>
  );
}

export default Gold;
