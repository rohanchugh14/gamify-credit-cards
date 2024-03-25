import React from "react";
import { User } from "../types";
import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import TextToSpeech from "../TextToSpeech";

const knowledgeBook = [`
    Brave Undead,
    
    Embark on a perilous journey to fortify your financial standing, wielding your credit card as a weapon against the looming darkness. But heed this warning: as you amass credit, be vigilant! Just as a dreaded skeleton lurks in the shadows, failure to honor your debts may unleash havoc upon the peaceful town.
    
    Harness the power of your credit card wisely, for it holds the key to building your credit and securing your financial future. Forge a path of responsibility and fiscal discipline, lest the darkness consume us all.
    
    May the flames guide your way.
    
    Signed,
    The Keeper of Financial Wisdom`,

  `Brave Warrior,

    A second decree now commands your attention: pay fines swiftly. In doing so, you shall gain crucial experience, unlocking a wealth of wisdom and prosperity. Expect rewards in coins, a soaring credit score, and access to superior credit cards. Forge ahead with courage, for your financial journey holds boundless opportunities.
    
    Signed,
    The Keeper of Prosperity`,

  `Noble Adventurer,

    Prepare thyself for the next mandate: prepay ere the statement's dawn. By reducing thy utilization ere it is tallied, thou shalt wield financial prowess unmatched. Embrace this tactic, for it shall bolster thy credit score and grant thee favor with lenders. As thou treadest this path, remember: foresight be thy greatest ally in the battle for fiscal dominion.
    
    Signed,
    The Custodian of Fiscal Fortitude`,

  `Mighty Conqueror,

    On the eve of statement's arrival, heed this dire warning: The contract demands settlement at earliest convenience, lest dire consequences befall thee. Fail not in thy duty, for neglect shall usher a plummet in credit. Let swiftness be thy ally, and debts be met without delay. Thus, safeguard thy financial stronghold from the shadows that lurk.
    
    Signed,
    The Sentinel of Credit Vigilance`,

  `Majestic Conqueror,

    Behold the treasure trove that awaits thee through mastery of thy credit score! As thou diligently tendest to its growth, envision the bountiful rewards that shall grace thy path. A high credit score unlocks gates to untold riches: favorable loan terms, coveted credit cards, and entry to realms of opulence. With each prudent step, thou art closer to securing financial sovereignty and reaping the fruits of thy labor.
    
    Signed,
    The Herald of Financial Ascendancy`
]

type Props = {
  user: User;
};
function Progression({ user }: Props) {
  const [nuggetIter, setNuggetIter] = useState(0)
  const [open, setOpen] = useState(false)
  const onClickPrevHandler = (e: any) => {
    if (nuggetIter > 1) {
      setNuggetIter(nuggetIter -1)
    }
  }
  const onClickNextHandler = (e: any) => {
    if (nuggetIter < 7) {
      console.log(nuggetIter)
      setNuggetIter(nuggetIter +1)
    }
  }
  return (
    <>
      <Button colorScheme="teal" size='lg' onClick={() => setOpen(true)}>Credit Nugget</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {knowledgeBook[nuggetIter]}
          </ModalBody>

          <ModalFooter flexDirection="column" alignContent="center" justifyContent="center">
            <TextToSpeech iter={nuggetIter} runOnClickPrev={onClickPrevHandler} runOnClickNext={onClickNextHandler} />
            <Button colorScheme='teal' width="10vw" size='lg' onClick={() => setOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Progression;
