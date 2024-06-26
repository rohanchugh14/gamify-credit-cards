import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useLogoutFunction, useRedirectFunctions } from '@propelauth/react'
import "./Navbar.css";
import { User } from "../types";
import { useState } from "react";
import Routes from "../../Routes";

type Props = {
  user: User;
  setUser: (user: User) => void;
}
export default function Navbar({user, setUser}: Props) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
    pos="sticky" // Make the navbar sticky
        top="0" // Stick to the top of the viewport
        zIndex="100" >
      <Flex
        bg={useColorModeValue("white", "white")}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={"space-between"}>
          <Link to="/">
            <Image
              src="/Assets/capitalone.png"
              alt="Logo"
              boxSize="100px"
              objectFit="contain"
            />
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav user={user} setUser={setUser}/>
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({user, setUser}: Props) => {
  const linkColor = useColorModeValue("black", "black");
  const linkHoverColor = useColorModeValue("#d02c22", "#d02c22");
  const location = useLocation();
  const { redirectToAccountPage } = useRedirectFunctions()
  const logoutFunction = useLogoutFunction()
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const buyItem = async () => {
    const cost = parseFloat(amount)
    if (cost + user.cards[0].currentBalance > user.cards[0].creditLimit) {
      alert("Not enough money!")
      return
    }
    const res = await fetch(`${Routes.API}/buy/${user.cards[0]._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: cost,
      })});
      const data: User = await res.json();
      data.token = user.token;
      setUser(data)
      setIsOpen(false)
  }
  return ( <>
    <Modal isOpen={isOpen} onClose={() => {setIsOpen(false)}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Use Credit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={amount} onChange={(e: any) => setAmount(e.target.value)}placeholder="Amount to buy" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={buyItem}>
              Buy!!!
            </Button>
            <Button variant='ghost' onClick={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    <Stack
      direction={"row"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      spacing={4}
    >
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                padding={"10px 10px"}
                href={navItem.href ?? undefined}
                onClick={navItem.label === "LOGOUT" ? () => logoutFunction(true) : navItem.label === "ACCOUNT" ? () => redirectToAccountPage() : () => setIsOpen(true)}
                fontSize={"18px"}
                fontWeight={500}
                color={linkColor}
                transition="color 0.4s, border-color 0.4s"
                bg={
                  location.pathname === navItem.href
                    ? "#d02c22"
                    : "transparent"
                }
                rounded="full"
                _hover={{
                  borderBottomColor: "#d02c22",
                  color: linkHoverColor,
                }}
                cursor="pointer"
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
    </>);
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "USE CREDIT CARD"
  },
  {
    label: "ACCOUNT",
  },
  {
    label: "LOGOUT",
  }
];