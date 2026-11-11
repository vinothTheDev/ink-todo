import { Box, render, Text, useInput } from "ink";
import { useState } from "react";

const TODOS = [
  'Buy milk',
  'Practice Git diff',
  'Master Ink layout'
];
export default function App() {
  const [selected, setSelected] = useState(0)
  useInput((i,k) => {
    if (k.downArrow) setSelected(p=> (p+1)%TODOS.length)
    if (k.upArrow) setSelected(p=> (p-1+ TODOS.length)%TODOS.length)
  })
  return (
    <Box flexDirection="column">
      {/*header*/}
      <Box borderStyle={"double"} width={"100%"} justifyContent="center">
        <Text color="red" bold>Ink Todo</Text>
      </Box>
      {/*List*/}
      <Box flexDirection="column" padding={1}>
        {TODOS.map((todo, i) => (
          <Text key={i} color={selected===i ? 'cyan': 'white'} bold={selected===i}>
            {selected===i ? '>':' '}{todo}
          </Text>
        ))}
      </Box>
    </Box>
  );
}

render(<App/>)