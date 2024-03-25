import { Flex} from '@chakra-ui/react';
import {useState} from 'react'
import { User } from "../types";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react'

const questBook: Record<number, string> = {
  1: `Make a payment using your credit card (mock credit use in top navigation bar).`,
  2: `Pay your credit card to raise your credit score.`,
  3: `Prepay your credit card bills before the closing day to decrease credit utilization and boost credit.`,
  4: `When your statement comes, pay it as soon as possible.`,
  5: `Reach 700 credit score.`,
  6: `Apply for another credit card.`,
  7: `Reach 800 credit score.`
}

type Props = {
  user: User;
};
function Quest({user}: Props) {
  const [open, setOpen] = useState(false)
  const [questIter, setQuestIter] = useState(1)
  const btnRef = React.useRef()
  
  return (
    <>
    {/* @ts-ignore*/}
      <Button ref={btnRef} colorScheme='teal' width="10vw" size='lg' onClick={() => setOpen(true)}>
        Quests
      </Button>
      {/* @ts-ignore*/}
      <Drawer
        isOpen={open}
        placement='right'
        onClose={() => setOpen(false)}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Quests:</DrawerHeader>

          <DrawerBody>
            <Flex flexDirection="column" >
              {questBook[questIter]}
              <Button colorScheme='teal' onClick={() => setQuestIter(questIter + 1)} marginTop = "30px">
                Next Quest
              </Button>
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Quest;
