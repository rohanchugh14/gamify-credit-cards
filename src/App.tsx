import Navbar from './Components/Navbar';
import EXPBar from './EXPBar';
import Payment from './Payment';
import CreditBar from './CreditBar';
import Gold from './Gold';
import AvailableCredit from './AvailableCredit';
import './App.css'


function App() {
  return (
    <div className="App">
      <EXPBar />
      <CreditBar />
      <Gold />
      <AvailableCredit />
      <Payment />
    </div>
  );
}

export default App;
