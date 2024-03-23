import React from "react";
import EXPBar from "./EXPBar";
import CreditBar from "./CreditBar";
import Gold from "./Gold";
import AvailableCredit from "./AvailableCredit";

const Game = () => {
  return (
    <>
      <EXPBar />
      <CreditBar />
      <Gold />
      <AvailableCredit />
    </>
  );
};

export default Game;
