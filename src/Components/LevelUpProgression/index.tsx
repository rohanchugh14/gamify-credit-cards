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
const knowledgeBook: any = {
    1: `
    Brave Undead,
    
    Embark on a perilous journey to fortify your financial standing, wielding your credit card as a weapon against the looming darkness. But heed this warning: as you amass credit, be vigilant! Just as a dreaded skeleton lurks in the shadows, failure to honor your debts may unleash havoc upon the peaceful town.
    
    Harness the power of your credit card wisely, for it holds the key to building your credit and securing your financial future. Yet, be wary of the dire consequences should you succumb to reckless spending. Should you exhaust your credit without fulfilling your obligations, the skeletal menace shall descend upon the town, laying waste to all that you hold dear.
    
    Forge a path of responsibility and fiscal discipline, lest the darkness consume us all.
    
    May the flames guide your way.
    
    Signed,
    The Keeper of Financial Wisdom`
}
type Props = {
    user: User;
};
function Progression({user}: Props) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Invoke Next Nugget of Knowledge</Button>
  
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Level {user.level}: </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {knowledgeBook[user.level]}
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default Progression;
