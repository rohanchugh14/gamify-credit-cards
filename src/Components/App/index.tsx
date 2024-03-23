import Payment from "../Payment";
import "./App.css";
import Game from "../Game";
import { withAuthInfo, WithAuthInfoProps } from "@propelauth/react";
import { useEffect, useState } from "react";
import Routes from "../../Routes";
import { User } from "../types";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Progression from "../LevelUpProgression";
import TextToSpeech from "../TextToSpeech";
import BackgroundSound from "../BackgroundSound";

type Props = {
  user: User;
  setUser: (user: User) => void;
}
const App = ({user, setUser}: Props) => {



  return (
    <>
          <Game user={user}/>
          <Payment user={user} setUser={setUser}/>
          {/* <Progression user={user}/> */}
          {/* <TextToSpeech/> */}
          <BackgroundSound/>
        </>
      )
};

export default App;
