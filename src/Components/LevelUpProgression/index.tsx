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
    
    Harness the power of your credit card wisely, for it holds the key to building your credit and securing your financial future. Forge a path of responsibility and fiscal discipline, lest the darkness consume us all.
    
    May the flames guide your way.
    
    Signed,
    The Keeper of Financial Wisdom`,

    2: `Brave Warrior,

    A second decree now commands your attention: pay fines swiftly. In doing so, you shall gain crucial experience, unlocking a wealth of wisdom and prosperity. Expect rewards in coins, a soaring credit score, and access to superior credit cards. Forge ahead with courage, for your financial journey holds boundless opportunities.
    
    Signed,
    The Keeper of Prosperity`,

    3: `Noble Adventurer,

    Prepare thyself for the next mandate: prepay ere the statement's dawn. By reducing thy utilization ere it is tallied, thou shalt wield financial prowess unmatched. Embrace this tactic, for it shall bolster thy credit score and grant thee favor with lenders. As thou treadest this path, remember: foresight be thy greatest ally in the battle for fiscal dominion.
    
    Signed,
    The Custodian of Fiscal Fortitude`,

    4: `Mighty Conqueror,

    On the eve of statement's arrival, heed this dire warning: The contract demands settlement at earliest convenience, lest dire consequences befall thee. Fail not in thy duty, for neglect shall usher a plummet in credit. Let swiftness be thy ally, and debts be met without delay. Thus, safeguard thy financial stronghold from the shadows that lurk.
    
    Signed,
    The Sentinel of Credit Vigilance`,

    5: `Majestic Conqueror,

    Behold the treasure trove that awaits thee through mastery of thy credit score! As thou diligently tendest to its growth, envision the bountiful rewards that shall grace thy path. A high credit score unlocks gates to untold riches: favorable loan terms, coveted credit cards, and entry to realms of opulence. With each prudent step, thou art closer to securing financial sovereignty and reaping the fruits of thy labor.
    
    Signed,
    The Herald of Financial Ascendancy`,

    6: `Illustrious Conqueror,

    Behold the ladder of credit cards, each rung ascending to greater realms of prosperity. Begin thy ascent with the humble starter card, offering a foothold to novices in the realm of credit. As thou prove thy mettle, advance to rewards cards, where loyalty is met with riches in the form of cashback and points.
    
    Yet, the pinnacle beckons—the elite cards, reserved for those of distinguished merit. Herein lie unparalleled privileges: exclusive access, concierge services, and opulent rewards beyond measure. Choose wisely, for with each step, thou art bestowed the keys to realms of unparalleled opulence.
    
    Ascend the ladder with wisdom, and the treasures of the credit card realm shall be thine to command.
    
    Signed,
    The Sage of Credit Mastery`,

    7: `Mighty Conqueror of the Fiscal Realm,

    Having traversed the arduous path of credit mastery, thou hast emerged victorious, adorned with the knowledge and confidence to conquer the vast expanse of the fiscal world that lies before thee. With thy newfound wisdom as thy blade and thy indomitable spirit as thy shield, go forth and claim thy rightful place among the financial elite.
    
    Know that the treasures thou seeketh are within reach, awaiting thy command. From the halls of credit to the vaults of wealth, thou art poised to seize the fruits of thy labor and reign supreme over thy domain. Let not doubt nor fear hinder thy progress, for thou art destined for greatness.
    
    Arise, noble conqueror, and claim thy rightful throne in the realm of finance. The world awaits thy triumph.
    
    Signed,
    The Architect of Financial Mastery`

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
