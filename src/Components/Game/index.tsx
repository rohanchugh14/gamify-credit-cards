import React from "react";
import EXPBar from "./EXPBar";
import CreditBar from "./CreditBar";
import Gold from "./Gold";
import AvailableCredit from "./AvailableCredit";
import { Flex } from '@chakra-ui/react';
import Protagonist from "./Protagonist";
import Enemy from "./Enemy";
import {useState} from 'react'
import { User } from "../types";

type Props = {
  user: User;
};
const Game = ({user}: Props) => {
  const [creditLimit, setCreditLimit] = useState<number>(user.cards[0].creditLimit)
  const [creditUsed, setCreditUsed] = useState<number>(user.cards[0].currentBalance)
  const EnemyStyle = { 
    right: (creditUsed/creditLimit)+"vw"
  }
  return (
    <Flex flexDirection="column" 
    justifyContent="space-between" 
    backgroundImage="url('Assets/Background.png')"
    backgroundSize='cover'
    height="30vw">
      <Flex flexDirection="column" padding="25px">
        <Flex justifyContent="space-between">
          <EXPBar initXP={user.exp} initLevel={user.level} />
          <Gold />
        </Flex>
        <CreditBar initCreditScore={user.creditScore}/>
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
