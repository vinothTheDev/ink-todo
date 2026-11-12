import { Box, render, Text, useInput } from "ink";
import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState(0)
  const [todos, setTodos] = useState([
      {name: 'Buy milk', done: false},
      {name: 'Practice Git diff',  done: false},
      {name: 'Master Ink layout', done: false}
  ])
  useInput((i,k) => {
    if (k.downArrow) setSelected(p=> (p+1)%todos.length)
    if (k.upArrow) setSelected(p => (p - 1 + todos.length) % todos.length)
    if (i === ' ') {
      setTodos(p => p.map((t, i) =>
        selected === i ? { ...t, done: !t.done } : t)
      )
    }
  })
  const doneCount = todos.filter(t=> t.done).length
  return (
    <Box flexDirection="column">
      {/*header*/}
      <Box borderStyle={"double"} width={"100%"} justifyContent="center">
        <Text color="magenta" bold>Ink Todo</Text>
      </Box>
      {/*List*/}
      <Box flexDirection="column" padding={1}>
        {todos.map((todo, i) => (
          <Text key={i} color={selected===i ? 'cyan': 'white'} bold={selected===i}>
            { todo.done? "[x]": "[ ]"}{todo.name}
          </Text>
        ))}
      </Box>
      {/*Count*/}
      <Box width={"100%"} justifyContent="center">
        <Text dimColor>Completed: {doneCount}/{todos.length }</Text>
      </Box>
    </Box>
  );
}

render(<App />)
