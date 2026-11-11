# Ink Quick Setup Cheatsheet

### 1. Initialize
```bash
npm init -y
```

### 2. Add `"type": "module"` & dev script to `package.json`
```json
{
  "type": "module",
  "scripts": {
    "dev": "node --watch --import=tsx src/index.tsx"
  }
}
```

### 3. Install Dependencies
```bash
npm i ink react @inkjs/ui
npm i -D typescript @types/node @types/react tsx
```

### 4. Create `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "types": ["node"]
  }
}
```

### 5. Create `src/index.tsx`
```tsx
import { render, Text, Box } from "ink";

function App() {
  return (
    <Box borderStyle="round" borderColor="green" padding={1}>
      <Text color="green" bold>Hello Ink!</Text>
    </Box>
  );
}

render(<App />);
```

### 6. Run
```bash
npm run dev
```

---

### Quick Rules
- **All text** must be inside `<Text>...</Text>` (never raw in `<Box>`).
- `<Box>` defaults to **row** direction (`flexDirection="column"` to stack).
- Use `node --watch --import=tsx` so keyboard input isn't blocked.
