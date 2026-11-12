import { TextInput } from "@inkjs/ui";
import { Box, render, Text, useApp, useInput } from "ink";
import { useState } from "react";

export default function App() {
  const {exit} = useApp()
  const [selected, setSelected] = useState(0)
  const [todos, setTodos] = useState([
      {name: 'Buy milk', done: false},
      {name: 'Practice Git diff',  done: false},
      {name: 'Master Ink layout', done: false}
  ])
  const [isAdding, setIsAdding] = useState(false);
  useInput((i, k) => {
    if (isAdding) {
      if (k.escape) setIsAdding(false);
      return;
    }
    if (i === 'q') exit()
    if (i === 'a') {
        setIsAdding(true);
        return;
    }
    if (k.downArrow) setSelected(p=> (p+1)%todos.length)
    if (k.upArrow) setSelected(p => (p - 1 + todos.length) % todos.length)
    if (i === ' ') {
      setTodos(p => p.map((t, i) =>
        selected === i ? { ...t, done: !t.done } : t)
      )
    }
    if (i === 'c') {
      setTodos(prev => prev.filter(t => !t.done));
    }
    if (i === 'd' && todos.length > 0) {
      setTodos(prev => prev.filter((_, idx) => idx !== selected));
      setSelected(prev => Math.max(0, Math.min(prev, todos.length - 2)));
    }
  })
  const doneCount = todos.filter(t=> t.done).length
  return (
    <Box flexDirection="column">
      {/*header*/}
      <Box borderStyle={"double"} width={"100%"} justifyContent="center">
        <Text color="red" bold>Ink Todo</Text>
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
      {isAdding ? (
        <Box marginTop={1}>
          <Text color="green" bold>New: </Text>
          <TextInput
            placeholder="Enter todo title (Enter to save, Esc to cancel)..."
            onSubmit={(value) => {
              const trimmed = value.trim();
              if (trimmed) {
                setTodos(prev => [...prev, { name: trimmed, done: false }]);
              }
              setIsAdding(false);
            }}
          />
        </Box>
      ) : null}
      <Text dimColor>Space: Toggle • a: Add • d: Delete • c: Clear • q: Quit</Text>
    </Box>
  );
}

render(<App />, {alternateScreen: true})
