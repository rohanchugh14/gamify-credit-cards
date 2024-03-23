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

type Props = {
  user: User
}

function Payment({ user }: Props) {
  const [open, setOpen] = useState(false)
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
  user.cards[0].transactions.sort((a: Transaction, b: Transaction) => (new Date(a.date) > new Date(b.date)) ? -1 : 1)
  return (
    <Flex justifyContent="center" flexDirection="column">
      <Flex justifyContent="center" marginTop="30px">
        <Button onClick={() => setOpen(true)} colorScheme='red' width="10vw">Pay</Button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Make a payment towards your credit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Pay From
              <Select>
                <option value='option1'>Bank Account 1 - 5984</option>
                <option value='option2'>Bank Account 2 - 1438</option>
                <option value='option3'>Bank Account 3 - 3994</option>
              </Select>
              Amount
              <Select>
                <option value='option1'>Current balance - ${data.balance.toFixed(2)}</option>
                <option value='option2'>Total minimum payment due - ${data.min_payment.toFixed(2)}</option>
                <option value='option3'>Fixed Amount</option>
              </Select>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={() => setOpen(false)}>
                Pay
              </Button>
              <Button variant='ghost'>Get Help!</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex justifyContent="center" marginTop="10px">
        <TableContainer>
          <Table variant='simple'>
            <Tbody>
              <Tr>
                <Td>Current Balance</Td>
                <Td>${data.balance.toFixed(2)}</Td>
              </Tr>
            </Tbody>
            <Tbody>
              <Tr>
                <Td>Payment Due Date</Td>
                <Td>{String(DueDate)}</Td>
              </Tr>
              <Tr>
                <Td>Minimum Payment Due</Td>
                <Td>${data.min_payment.toFixed(2)}</Td>
              </Tr>
              <Tr>
                <Td>Closing Date Due</Td>
                <Td>{ClosingDate}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Flex justifyContent="center" marginTop='10px'>
        <TableContainer>
          <Table variant='striped' colorScheme='teal'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
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
                <Td>{transaction.amount}</Td>
              </Tr>)}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>

      </Flex>
    </Flex>


  );

}

export default Payment;
