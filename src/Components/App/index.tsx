import Payment from "../Payment";
import "./App.css";
import Game from "../Game";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { useEffect, useState } from "react";
import Routes from "../../Routes";
import { User } from "../types";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Progression from "../LevelUpProgression";

const App = withAuthInfo((props: WithAuthInfoProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchFunc = async () => {
      let data = await fetch(`${Routes.API}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
        },
      });
      const userData: User = await data.json();
      setUser(userData);
    };
    fetchFunc();
  }, []);

  console.log(props);
  return (
    <>
      {user ? (
        <>
          <Game user={user}/>
          <Payment user={user}/>
          <Progression user={user}/>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center">
          <Box>
            <Spinner size="xl" />
          </Box>
        </Flex>
      )}
    </>
  );
});

export default App;
