import { Box, render, Spacer, Text } from "ink";
import { sign } from "node:crypto";

export default function App() {
  return (
    <Box>
      <Box borderStyle={"double"} width={"100%"} justifyContent="center">
        <Text color="red" bold>Ink Todo</Text>
      </Box>
    </Box>
  );
}

render(<App/>)