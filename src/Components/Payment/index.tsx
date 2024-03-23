import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
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
import { User } from '../types';
import {useState} from 'react'
import { Input } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

type Props = {
  user: User
}

function Payment({user}: Props) {
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
    </Flex>


  );

}

export default Payment;
