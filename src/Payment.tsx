import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'



function Payment() {
  const data = 
    {
        balance: 100,
        due_date: new Date('Mar 20'),
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
    <div>
        <TableContainer>
  <Table variant='simple'>
    <Tbody>
      <Tr>
        <Td>Statement Balance</Td>
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
    </div>
    
  );
  
}

export default Payment;
