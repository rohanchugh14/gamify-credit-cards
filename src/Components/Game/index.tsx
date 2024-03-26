import React from "react";
import EXPBar from "./EXPBar";
import CreditBar from "./CreditBar";
import Gold from "./Gold";
import AvailableCredit from "./AvailableCredit";
import { Flex } from '@chakra-ui/react';
import Protagonist from "./Protagonist";
import Enemy from "./Enemy";
import { User } from "../types";
import BackgroundSound from "../BackgroundSound";

type Props = {
  user: User;
};
const Game = ({user}: Props) => {
  const creditLimit = user.cards[0].creditLimit
  const creditUsed = user.cards[0].currentBalance
  return (
    <Flex flexDirection="column" 
    justifyContent="space-between" 
    backgroundImage="url('Assets/Background.png')"
    backgroundSize='cover'
    height="30vw">
      <Flex flexDirection="column" padding="25px">
        <Flex justifyContent="space-between">
          <EXPBar exp={user.exp} level={user.level} />
          <BackgroundSound
            soundFile="Assets/background_music.mp3" // Replace with the path to your audio file
            soundOnImage="Assets/MusicOn.png" // Replace with the path to your sound on image
            soundOffImage="Assets/MusicOff.png" // Replace with the path to your sound off image
          />
        </Flex>
        <CreditBar creditScore={user.creditScore}/>
        <Flex marginTop= '15px' >
        <Gold gold={user.gold}/>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        <Flex justifyContent="center">
          <Flex justifyContent="space-between" width="70vw" className="Entities">
            <Enemy creditLimit={creditLimit} creditUsed={creditUsed}/>
            <Protagonist creditLimit={creditLimit} creditUsed={creditUsed}/>
          </Flex>
        </Flex>
        <Flex justifyContent="center">
          <Flex justifyContent="space-between" width="77vw" className="Shops">
            <img src="Assets/shop_anim.gif" alt="Evil Shop" className="EvilHouse"/>
            <img src="Assets/shop_anim.gif" alt="Good Shop"/>
          </Flex>
        </Flex>
        <Flex backgroundImage="url('Assets/Ground.png')"
        backgroundSize='cover'
        justifyContent="center"
        padding="15px">
          <AvailableCredit creditLimit={creditLimit} creditUsed={creditUsed} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Game;
