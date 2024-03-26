import Payment from "../Payment";
import "./App.css";
import Game from "../Game";
import { User } from "../types";
import { Flex } from "@chakra-ui/layout";

type Props = {
  user: User;
  setUser: (user: User) => void;
}
const App = ({user, setUser}: Props) => {



  return (
    <>
          <Game user={user}/>
          <Payment user={user} setUser={setUser}/>
          <Flex flexDirection="column" padding="25px">
          </Flex>
        </>
      )
};

export default App;
