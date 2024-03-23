import {
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  TableContainer,
  TableCaption,
  Tfoot,
  Thead,
  Flex,
  Box,
  Button
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Transaction, User } from '../types';
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import Routes from '../../Routes';
import Quest from '../LevelUpProgression/Quest';
import Progression from '../LevelUpProgression';

type Props = {
  user: User
  setUser: (user: User) => void
}

function Payment({ user, setUser }: Props) {
  const [open, setOpen] = useState(false)
  const [inputVal, setInputVal] = useState('0')
  const [selectVal, setSelectVal] = useState('current')
  const data =
  {
    balance: 100,
    due_date: new Date('Mar 27'),
    min_payment: 35.00,
    closing_date: new Date('Mar 30'),
  }
  const DueDate = data.due_date.toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit'
  });
  const ClosingDate = data.closing_date.toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit'
  });

  const makePayment = async () => {
    let paymentAmount = 0
    console.log(selectVal)
    switch (selectVal) {
      case 'current':
        paymentAmount = user.cards[0].currentBalance
        break
      case 'min':
        paymentAmount = user.cards[0].minPayment
        break
      case 'fixed':
        paymentAmount = parseFloat(inputVal)
        break
    }
    const res = await fetch(`${Routes.API}/makePayment/${user.cards[0]._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: paymentAmount,
      })
    });
    const data: User = await res.json();
    data.token = user.token;
    console.log(data)
    setOpen(false)
    setUser(data)
  }

  const selectOnChange = (e: any) => {
    console.log(e.target.value)
    setSelectVal(e.target.value)
  }
  console.log("boolean thing", parseFloat(inputVal) > user.cards[0].currentBalance)
  console.log("inp val", inputVal)
  console.log("parsed inp val", parseFloat(inputVal))
  console.log("curr bal", user.cards[0].currentBalance)
  user.cards[0].transactions.sort((a: Transaction, b: Transaction) => (new Date(a.date) > new Date(b.date)) ? -1 : 1)
  return (
    <Flex justifyContent="center" flexDirection="column" marginBottom="30px">
      <Flex justifyContent="center" marginTop="30px" >
        <Flex marginLeft="15px" marginRight="15px">
          <Quest user={user} />
        </Flex>
        <Flex marginLeft="15px" marginRight="15px">
          <Button size='lg' onClick={() => setOpen(true)} colorScheme='red' width="10vw">Pay</Button>
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Make a payment towards your credit</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Pay From
                <Select marginTop="5px">
                  <option value='option1'>Bank Account 1 - 5984</option>
                  <option value='option2'>Bank Account 2 - 1438</option>
                  <option value='option3'>Bank Account 3 - 3994</option>
                </Select>
                Amount
                <Select value={selectVal} onChange={selectOnChange} marginTop="5px">
                  <option value='current'>Current balance - ${user.cards[0].currentBalance.toFixed(2)}</option>
                  <option value='min' disabled={user.cards[0].minPayment > user.cards[0].currentBalance}>Total minimum payment due - ${user.cards[0].minPayment.toFixed(2)}</option>
                  <option value='fixed'>Fixed Amount</option>
                </Select>
                {selectVal === 'fixed' ? <Input placeholder='Enter amount' value={inputVal} onChange={(e: any) => setInputVal(e.target.value)} marginTop="5px" /> : <></>}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => makePayment()} isDisabled={parseFloat(inputVal) > user.cards[0].currentBalance}>
                  Pay
                </Button>
                <Button variant='ghost'>Get Help!</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <Flex marginLeft="15px" marginRight="15px">
          <Progression user={user} />
        </Flex>
      </Flex>
      <Flex justifyContent="center" marginTop="10px">
        <TableContainer width="90vw">
          <Table variant='striped' colorScheme="blackAlpha">
            <Tbody>
              <Tr justifyContent="space-between">
                <Td>Current Balance</Td>
                <Td isNumeric>${user.cards[0].currentBalance.toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Payment Due Date</Td>
                <Td isNumeric>{String(DueDate)}</Td>
              </Tr>
              <Tr>
                <Td>Minimum Payment Due</Td>
                <Td isNumeric>${user.cards[0].minPayment.toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Closing Date Due</Td>
                <Td isNumeric>{ClosingDate}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" marginLeft="5vw" marginTop="2vw">
        <h1 style={{fontSize: 30}}>Transaction Table</h1>
        <Flex justifyContent="center" marginTop='10px'>
          <TableContainer width="90vw">
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Description</Th>
                  <Th>Category</Th>
                  <Th>Name</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {user.cards[0].transactions.map((transaction) => <Tr>
                  <Td>{new Date(transaction.date).toLocaleDateString(undefined, {
                    month: 'short',
                    day: '2-digit'
                  })}</Td>
                  <Td>{transaction.description}</Td>
                  <Td>{transaction.category}</Td>
                  <Td>{user.cards[0].name}</Td>
                  <Td>${transaction.amount.toFixed(2)}</Td>
                </Tr>)}
              </Tbody>
            </Table>
          </TableContainer>

        </Flex>
      </Flex>
    </Flex>


  );

}

export default Payment;
