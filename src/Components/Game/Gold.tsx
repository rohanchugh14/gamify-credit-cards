import { Flex, Box } from '@chakra-ui/react';

type Props = {
  gold: number
}
function Gold({gold}: Props) {
  return (
    <Flex justifyContent="flex-end">
      <div className="App">
        <Box color="white">Gold: {gold}</Box>
      </div>
    </Flex>
  );
}

export default Gold;
