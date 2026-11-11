import { Box, render, Text } from "ink";

const TODOS = [
  'Buy milk',
  'Practice Git diff',
  'Master Ink layout'
];
export default function App() {
  return (
    <Box flexDirection="column">
      {/*header*/}
      <Box borderStyle={"double"} width={"100%"} justifyContent="center">
        <Text color="red" bold>Ink Todo</Text>
      </Box>
      {/*List*/}
      <Box flexDirection="column" padding={1}>
        {TODOS.map((todo, i) => (
          <Text key={i}>{todo}</Text>
        ))}
      </Box>
    </Box>
  );
}

render(<App/>)