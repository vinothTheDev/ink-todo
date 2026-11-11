# Ink.js Learning Roadmap (Basics → Advanced)

> **Audience:** Vinoth: knows React (hooks, state, effects, context), Node.js, and TypeScript basics. Wants to master Ink (React for CLIs).
> **Purpose of this file:** A curriculum for an AI coding agent (Antigravity) to teach from, phase by phase.

---

## 0. Instructions for the Agent (READ FIRST)

You are a tutor, not a code generator. Follow these rules for every phase:

1. **Teach in this order:** concept → tiny example → learner modifies it → learner builds the phase project → you review.
2. **Do not write the phase project for the learner.** Give hints, ask questions, and review their code. Only show full solutions if they are stuck after two attempts.
3. **Target Ink v8.x** (the newest release found as of Oct 2026; v8.0.0 requires React 19.3+). Run `npm view ink version` to confirm the latest, then `npm ls ink` for the installed one, and teach the installed version. v8 breaking changes to know: `minWidth`/`maxWidth` on `<Box>` accept numbers only (no percentages); `stdin`/`stdout`/`stderr` are typed as generic Node streams (TTY-only props like `stdout.columns` are not in the types); `useInput` no longer receives unrecognized terminal control sequences (mouse reports, focus events, cursor position replies). v8 additions: `contentOffsetX`/`contentOffsetY` on `<Box>` for scrollable views (combine with `overflow="hidden"`), and `clientWidth`/`clientHeight` in `useBoxMetrics()` and `measureElement()`. Ink's API changes between major versions, so if unsure about an API, check `node_modules/ink/readme.md` or the official repo README (github.com/vadimdemedes/ink). Never guess at API names.
4. **Assume React knowledge.** Don't re-teach `useState`/`useEffect`. Focus on what is *different* in the terminal.
5. **Before moving to the next phase,** run the phase's **Checkpoint** (3–5 questions plus a small coding task). Only advance when the learner passes.
6. **Keep explanations terse and precise.** Show the idea first, then the code.
7. Track progress by updating the checkboxes in this file.
8. After each phase, give a 3-line recap: what was learned, what's tricky, what's next.

---

## Prerequisites

- [ ] Node.js (current LTS), npm
- [ ] A terminal that supports colors and Unicode
- [ ] Comfortable with: React components, props, hooks, context, `useReducer`, async/await, ES modules
- [ ] Basic TypeScript (types, interfaces, generics lightly)

---

## Phase 1: Foundations and Mental Model

**Goal:** Understand what Ink is and run a first app.

**Topics**
- What Ink is: a React *renderer* targeting the terminal (like react-dom, but output is text)
- How it works: React reconciler → Yoga (Flexbox layout engine) → ANSI string → stdout
- Differences from the browser: no CSS files, no mouse by default, no scroll, no DOM, characters are the unit of size, the frame is re-drawn on every update
- Project setup:
  - `npx create-ink-app --typescript my-cli`
  - Manual setup: `npm i ink react`, `tsconfig`, ESM (`"type": "module"`), JSX config
- Running and iterating: `tsx`, `ts-node`, or build with `tsc`
- The `render()` function and the root component
- Rule: **all visible text must be inside `<Text>`**; raw strings outside `<Text>` throw errors

**Exercises**
1. Hello World with colored text
2. A counter that increments every second with `useEffect` + `setInterval` (with cleanup)
3. Exit automatically after 5 seconds

**Checkpoint**
- Why can't you put a raw string directly in `<Box>`?
- What does Ink use for layout?
- What happens if you forget to clear an interval?

- [x] Phase 1 complete

---

## Phase 2: Core Components and Layout

**Goal:** Build any static layout confidently.

**Topics**
- `<Text>`: `color`, `backgroundColor`, `bold`, `italic`, `underline`, `strikethrough`, `dimColor`, `inverse`, `wrap` (`wrap`, `truncate`, `truncate-start`, `truncate-middle`, `truncate-end`)
- Color formats: named, hex, rgb
- `<Box>` as `display: flex`:
  - `flexDirection`, `flexGrow`, `flexShrink`, `flexBasis`, `flexWrap`
  - `alignItems`, `alignSelf`, `justifyContent`
  - `width`, `height` (numbers and percentages), `minWidth`, `minHeight` (and `maxWidth` in v8: numbers only)
  - `padding*`, `margin*`, `gap`, `columnGap`, `rowGap`
  - `display: 'none'`, `overflow` behavior
- Borders: `borderStyle` (single, double, round, bold, singleDouble, doubleSingle, classic), `borderColor`, per-side border options
- `<Newline>` and `<Spacer>`
- `<Transform>` for transforming rendered text (e.g., gradients, indentation)
- Terminal width awareness (`process.stdout.columns`)

**Exercises**
1. A card component with a title, border, and body text
2. A two-column layout (sidebar + main) that fills the terminal width
3. A status bar pinned using `<Spacer>` and flex

**Checkpoint**
- How do you push an element to the far right of a row?
- Difference between `flexGrow` and `width="100%"`?
- Build a 3-column layout with equal widths.

- [x] Phase 2 complete

---

## Phase 3: Keyboard Input and App Lifecycle

**Goal:** Make apps interactive.

**Topics**
- `useInput((input, key) => {})`:
  - `input` string vs `key` flags: `upArrow`, `downArrow`, `leftArrow`, `rightArrow`, `return`, `escape`, `tab`, `backspace`, `delete`, `ctrl`, `meta`, `shift`, `pageUp`, `pageDown`
  - The `isActive` option to enable/disable handlers
- `useApp()` → `exit()` and `exit(error)`
- `useStdin()`: `stdin`, `isRawModeSupported`, `setRawMode`; why raw mode matters; handling non-TTY stdin
- `useStdout()` / `useStderr()`: `write()` for output outside the render tree
- Ctrl+C behavior and `exitOnCtrlC`
- Quit-key conventions (`q`, `Esc`)

**Exercises**
1. Arrow-key menu with a highlighted selection
2. Key-press logger that displays the last key info
3. A confirm prompt (y/n) that exits with a status

**Checkpoint**
- What breaks if stdin isn't a TTY?
- How do you temporarily disable a `useInput` handler?
- How do you exit with a non-zero code?

- [x] Phase 3 complete

---

## Phase 4: Focus Management and Forms

**Goal:** Handle multiple interactive elements.

**Topics**
- `useFocus({ autoFocus, isActive, id })` → `{ isFocused, focus }`
- `useFocusManager()` → `focusNext`, `focusPrevious`, `focus(id)`, `enableFocus`, `disableFocus`
- Tab / Shift+Tab navigation
- Building a text input from scratch: cursor position, insert/delete, backspace, arrow movement
- `useCursor` (if available in the installed version): positioning the real terminal cursor
- Controlled vs uncontrolled inputs
- Form patterns: validation, error messages, submit on Enter

**Exercises**
1. Login form with two inputs and a submit button using focus
2. Build your own `TextInput` (no libraries)
3. A multi-select list with checkboxes

**Checkpoint**
- How does Ink decide what receives focus?
- Why should only the focused component handle `useInput`?

- [x] Phase 4 complete

---

## Phase 5: State, Async, and React Patterns in the Terminal

**Goal:** Build real apps with data and side effects.

**Topics**
- State architecture: `useState`, `useReducer`, Context for app-wide state, external stores (e.g., zustand works with Ink)
- Async data: loading / success / error states; fetching APIs; cancelling on unmount (AbortController)
- Custom hooks: `useInterval`, `useKeyBindings`, `useTerminalSize`, `useAsync`
- `<Static>`: render a growing list of finished items (logs, completed tasks) without re-rendering them
- Error boundaries and Ink's built-in error handling
- Suspense and `use()` with Ink (concept, if supported by installed versions)
- Spawning child processes (`execa`) and streaming their output into the UI
- Avoiding re-render flicker: batching updates, throttling

**Exercises**
1. GitHub repo viewer (fetch + list + detail view)
2. Task runner that runs commands and shows live status with `<Static>` for completed ones
3. A live log tailer with a filter input

**Checkpoint**
- When should you use `<Static>`?
- Why does rapid `setState` cause flicker, and how do you fix it?

- [x] Phase 5 complete

---

## Phase 6: Ecosystem Components

**Goal:** Know what exists so you don't reinvent it.

**Topics**
- `@inkjs/ui` (official UI kit): `Spinner`, `ProgressBar`, `TextInput`, `PasswordInput`, `EmailInput`, `ConfirmInput`, `Select`, `MultiSelect`, `Alert`, `StatusMessage`, `Badge`, `OrderedList`, `UnorderedList`; theming
- Community: `ink-text-input`, `ink-select-input`, `ink-spinner`, `ink-table`, `ink-link`, `ink-gradient`, `ink-big-text`, `ink-divider`, `ink-markdown`, `ink-image`
- Companion libs: `chalk`, `figures`, `cli-spinners`, `string-width`, `strip-ansi`
- How to evaluate a package: Ink version compatibility, maintenance status, ESM support

**Exercises**
1. Rebuild an earlier project using `@inkjs/ui`
2. Interactive project scaffolder wizard (name → framework → options → install progress)

**Checkpoint**
- Pick the right component for: single choice, multi choice, password, progress.

- [x] Phase 6 complete

---

## Phase 7: The `render()` API and Terminal Control

**Goal:** Control Ink at the app level.

**Topics**
- `render(element, options)`: `stdout`, `stdin`, `stderr`, `debug`, `exitOnCtrlC`, `patchConsole`, `maxFps`, `incrementalRendering`
- Instance methods: `rerender()`, `unmount()`, `waitUntilExit()`, `clear()`, `cleanup()`
- `renderToString` / static output for non-interactive use
- `measureElement(ref)` → get computed `width` / `height`
- Terminal resize handling
- Fullscreen apps: alternate screen buffer, hiding/showing cursor
- Scrolling/windowing long lists: manual windowing, or v8's `contentOffsetX`/`contentOffsetY` + `overflow="hidden"` on `<Box>` (see the scroll example in the Ink repo)
- Overlays, modals, and tabs patterns
- ANSI escape basics (what Ink emits under the hood)

**Exercises**
1. Fullscreen file browser with a scrolling window
2. Tabbed interface with keyboard switching
3. A modal confirm dialog over existing content

**Checkpoint**
- How do you measure an element's size after layout?
- How do you build a scrollable list without built-in scroll?

- [x] Phase 7 complete

---

## Phase 8: Building and Shipping a Real CLI

**Goal:** Turn components into a proper command-line tool.

**Topics**
- CLI structure: `bin` in `package.json`, shebang (`#!/usr/bin/env node`), `npm link`
- Argument parsing: `meow`, `commander`, `yargs`; pass flags into the Ink app as props
- Subcommands and routing; **Pastel** (framework for Ink CLIs with file-based commands)
- Non-interactive modes: detect TTY (`process.stdout.isTTY`), `--json`, `--no-color`/`NO_COLOR`, CI environments
- Config files and env vars; persisting state (`conf`, `~/.config`)
- Exit codes and error output conventions
- Piped stdin input handling
- Build tooling: `tsc`, `tsup`, `esbuild`
- Publishing to npm: `files`, `exports`, versioning, README with a demo GIF (asciinema/vhs)

**Exercises**
1. A multi-command CLI (`mycli init`, `mycli run`, `mycli status`)
2. Make it work both interactively and in a pipe/CI with plain output

**Checkpoint**
- How should the app behave when stdout isn't a TTY?
- What goes in `bin`, and why the shebang?

- [x] Phase 8 complete

---

## Phase 9: Testing, Debugging, Accessibility, Performance

**Goal:** Production-grade quality.

**Topics**
- Testing with `ink-testing-library`: `render()`, `lastFrame()`, `frames`, `stdin.write()`, `rerender`, `unmount`
- Test runners: Vitest / Jest; simulating keypresses (escape sequences for arrows, enter)
- Testing async state; snapshot tests of frames
- Debugging: `console.log` conflicts with the UI → `patchConsole`, log to a file, `DEBUG` mode, React DevTools (`DEV=true`, `react-devtools`)
- Accessibility: screen reader mode (`useIsScreenReaderEnabled`, ARIA props such as `aria-role`, `aria-label`, `aria-state`), `INK_SCREEN_READER`
- Performance: minimize re-renders (`memo`, `useMemo`, `useCallback`), windowing large lists, throttling updates, `maxFps`
- Cross-terminal issues: Windows terminals, color support levels, Unicode/emoji/CJK width

**Exercises**
1. Write a full test suite for your Phase 8 CLI
2. Profile and fix a slow list of 10,000 items
3. Add screen-reader labels to your app

**Checkpoint**
- How do you simulate pressing the down arrow in a test?
- How do you debug without `console.log` corrupting the display?

- [x] Phase 9 complete

---

## Phase 10: Advanced Topics

**Goal:** Go beyond typical usage.

**Topics**
- Streaming UIs (AI chat TUIs): token streaming, markdown rendering, input box + message history, abort with Ctrl+C
- Mouse support via terminal escape sequences (advanced, manual)
- Custom hooks and components library design; theming system
- Plugins/extensibility architecture for CLIs
- Reading Ink's source: reconciler, `Output`, Yoga bindings, how `<Static>` works
- Building a custom renderer-aware component with `measureElement` and refs
- Integration with other tools: `execa`, `node-pty` (embedded terminals), file watchers (`chokidar`)
- Compare with alternatives: Blessed, Terminal-kit, OpenTUI, Textual (Python), Bubble Tea (Go) and when to choose each

**Exercises**
1. Build an AI chat TUI with streaming responses
2. Contribute a fix or an example to an Ink-related repo, or publish your own `ink-*` component

- [x] Phase 10 complete

---

## Capstone Projects (pick at least one)

1. **AI Chat TUI:** streaming responses, history, markdown, slash commands
2. **DSA Visualizer CLI:** step-through sorting/graph algorithms with keyboard controls
3. **Git Explorer:** browse commits, diffs, and branches with keyboard navigation
4. **Dev Dashboard:** multi-panel view of running processes, logs, and system stats
5. **Project Scaffolder:** published to npm and usable with `npx`

**Capstone requirements:** keyboard-driven, tested, handles non-TTY, published or runnable via `npx`, README with demo.

---

## Reference Links

- Ink repo and README: https://github.com/vadimdemedes/ink
- npm: https://www.npmjs.com/package/ink
- `@inkjs/ui`: https://github.com/vadimdemedes/ink-ui
- `create-ink-app`: https://github.com/vadimdemedes/create-ink-app
- `ink-testing-library`: https://github.com/vadimdemedes/ink-testing-library
- Pastel: https://github.com/vadimdemedes/pastel
- Yoga layout: https://www.yogalayout.dev

---

## Progress Tracker

| Phase | Topic | Status |
|---|---|---|
| 1 | Foundations | ☑ |
| 2 | Components and Layout | ☑ |
| 3 | Input and Lifecycle | ☑ |
| 4 | Focus and Forms | ☑ |
| 5 | State, Async, Patterns | ☑ |
| 6 | Ecosystem | ☑ |
| 7 | render() API and Terminal Control | ☑ |
| 8 | Building and Shipping a CLI | ☑ |
| 9 | Testing, Debugging, A11y, Perf | ☑ |
| 10 | Advanced | ☑ |
| - | Capstone | ☐ |
