# Git Practice Roadmap: learn every daily Git command with a tiny Ink app

> **Learner:** Vinoth. Knows React and has finished Ink. Finds Git hard. Wants simple steps and lots of practice.
> **Method:** Build **Ink Todo**, a very small terminal app, one tiny feature at a time. Every feature is a reason to use a Git command. The app is only practice material; Git is the subject.

---

## 0. Instructions for the Agent (READ FIRST)

You are a patient Git tutor.

1. **One idea per stage.** Explain it in 3–5 lines using the picture in section 1, then let the learner type the commands.
2. **The learner types every Git command.** Before each command, say in one line what it will do. After it runs, say what changed (use `git status` / `git log --oneline --graph --all` to show it).
3. **Never write the app code for the learner beyond the starter in section 2.** The code is tiny; give the feature goal and let them write it. Help only if stuck.
4. **Run risky commands only after a backup:** `git branch backup/<stage>`. Remind the learner that `git reflog` can rescue most mistakes.
5. **After every stage:** show the learner's `git log --oneline --graph --all`, give a 3-line recap, tick the checkbox, and run the **Check** (short quiz plus one task). Do not move on until they pass.
6. **Keep language simple and short.** No jargon without a one-line meaning first.
7. **Verify commands with `git help <cmd>` if unsure.** Never guess flags. Check `git --version`.
8. Mistakes are part of the plan. When the learner makes one, use it as the lesson.

---

## 1. The picture (repeat it at the start of every stage)

```
 Working folder        Staging area (basket)        Local repo (history)         Remote (GitHub)
 your files      ──►   chosen changes         ──►   saved snapshots        ──►   cloud copy
              git add                      git commit                    git push
              ◄── git restore              ◄── git reset / revert        ◄── git pull / fetch
```

- **Commit** = a save point with a message.
- **Branch** = a separate line of work (a movable label on a commit).
- **HEAD** = "you are here".
- **Merge / rebase** = ways to join branches.
- **Remote** = a copy of the repo on GitHub.

---

## 2. The practice project: Ink Todo

A terminal app that shows a list of todos. That's it. Keep it so small that writing it never gets in the way of Git.

**Setup (Stage 0):**

```bash
mkdir ink-todo && cd ink-todo
npm init -y
npm i ink react
npm i -D typescript tsx @types/react
```

Set `"type": "module"` in `package.json`, add a script `"start": "tsx src/app.tsx"`, and a minimal `tsconfig.json` (jsx: react-jsx, module/target ESNext, moduleResolution Bundler, strict).

**Starter `src/app.tsx`** (the only code the agent may provide):

```tsx
import React from 'react';
import {render, Text} from 'ink';

const App = () => <Text color="green">Ink Todo</Text>;

render(<App />);
```

Run with `npm start`. If it prints "Ink Todo", you're ready.

**Features to add later (the learner writes these, each is tiny):**

| Feature | Size |
|---|---|
| Show a hard-coded list of 3 todos | ~5 lines |
| Highlight a selected todo with up/down arrows | ~10 lines |
| Toggle done with space | ~5 lines |
| Show a count "2/3 done" | ~3 lines |
| Add a color theme | ~5 lines |
| Press `q` to quit | ~3 lines |
| Show a footer with key hints | ~3 lines |

---

## 3. Command coverage (every daily Git command, and where it's practiced)

| Command | Stage |
|---|---|
| `git --version`, `git config` | 1 |
| `git init`, `git status`, `git add`, `git commit -m` | 1 |
| `.gitignore` | 1 |
| `git diff`, `git diff --staged` | 2 |
| `git log`, `--oneline`, `--graph`, `--all` | 3 |
| `git show` | 3 |
| `git commit --amend` | 4 |
| `git restore`, `git restore --staged` | 4 |
| `git rm`, `git mv` | 4 |
| `git reset --soft / --mixed / --hard` | 5 |
| `git revert` | 5 |
| `git reflog` | 5 |
| `git branch`, `git switch`, `git switch -c`, `git branch -d` | 6 |
| `git merge` (fast-forward and merge commit) | 6 |
| merge conflicts, `git merge --abort` | 7 |
| `git stash` (`push`, `list`, `pop`, `apply`, `drop`) | 8 |
| `git remote`, `git push -u`, `git clone` | 9 |
| `git fetch`, `git pull`, `git pull --rebase` | 10 |
| pull requests with `gh` | 11 |
| `git rebase`, `git rebase -i`, `--autosquash` | 12 |
| `git cherry-pick` | 13 |
| `git tag` | 14 |
| `git blame`, `git log -S`, `git bisect` | 15 |
| `git worktree` | 16 |
| aliases, `git clean`, `git grep` | 17 |

---

## Stage 0: Setup (30 min)

**Idea:** Get a working app before touching Git.
**Do:** Create the Ink Todo project from section 2 and run it.
- [x] Stage 0 complete

---

## Stage 1: First save point (45 min)

**Idea:** Turn the folder into a repo and make your first commit.

**Commands:** `git --version`, `git config --global user.name "..."`, `git config --global user.email "..."`, `git config --global init.defaultBranch main`, `git init`, `git status`, `git add .`, `git commit -m "..."`

**Do:**
1. Run `git status` before and after `git init`; note the difference.
2. Run `git status` again. See `node_modules/` listed as untracked? Create `.gitignore` containing `node_modules` and `dist`.
3. `git add .gitignore package.json tsconfig.json src` then `git status` (files turn green).
4. `git commit -m "chore: set up ink todo project"`

**Check**
- Which area is a file in when `git status` shows it red? Green?
- Why is `node_modules` ignored?

- [ ] Stage 1 complete

---

## Stage 2: See what changed (30 min)

**Idea:** Look before you save.

**Commands:** `git diff`, `git diff --staged`, `git add -p` (just look at it)

**Do:**
1. Add the hard-coded list of 3 todos to `app.tsx`.
2. `git diff` shows the change. `git add src/app.tsx`. `git diff` is now empty; `git diff --staged` shows it.
3. Commit: `feat: show hard-coded todo list`

**Check**
- What does `git diff` show when you've already run `git add`? Why?

- [ ] Stage 2 complete

---

## Stage 3: Read your history (30 min)

**Idea:** The log is your project's diary.

**Commands:** `git log`, `git log --oneline`, `git log --oneline --graph --all`, `git log -3`, `git show`, `git show <hash>`

**Do:**
1. Add the selection highlight with arrow keys. Commit it: `feat: add arrow-key selection`
2. Add the toggle-done feature. Commit it separately: `feat: toggle todo with space`
3. Look at the history with each log command. Use `git show` on each commit.
4. Set an alias: `git config --global alias.lg "log --oneline --graph --decorate --all"` then run `git lg`.

**Good commit message rule:** `type: short what changed`, with types `feat`, `fix`, `docs`, `chore`, `refactor`.

**Check**
- What is the hash for the commit that added selection? (Use `git log`.)

- [ ] Stage 3 complete

---

## Stage 4: Fix small mistakes (45 min)

**Idea:** Mistakes before pushing are easy to fix.

**Commands:** `git restore <file>`, `git restore --staged <file>`, `git commit --amend`, `git rm`, `git mv`

**Do:**
1. Edit `app.tsx` badly, then throw the change away with `git restore src/app.tsx`.
2. Stage a file by mistake, then unstage it with `git restore --staged`.
3. Make a commit with a typo in the message. Fix it with `git commit --amend -m "..."`.
4. Forget a file in a commit. Add it, then `git commit --amend --no-edit`.
5. Rename `src/app.tsx` to `src/App.tsx` using `git mv`, commit. Delete a scratch file with `git rm`.

**Rule:** only amend commits you haven't pushed.

**Check**
- What's the difference between `restore` and `restore --staged`?

- [ ] Stage 4 complete

---

## Stage 5: Undo bigger mistakes (60 min)

**Idea:** Go back in time safely.

**Commands:** `git reset --soft HEAD~1`, `git reset --mixed HEAD~1`, `git reset --hard HEAD~1`, `git revert <hash>`, `git reflog`, `git branch backup/stage5`

**Do:**
1. First `git branch backup/stage5`.
2. Make a throwaway commit three times. Undo one with each reset mode. After each, run `git status` to see where the changes went (staged / unstaged / gone).
3. Run `git reset --hard` and lose a commit on purpose. Run `git reflog`, find it, and get it back with `git reset --hard <hash>`.
4. Make a commit, then undo it without erasing history using `git revert <hash>`.

**Simple rules**
- `reset` moves the branch backward (private/local work only).
- `revert` adds a new commit that cancels an old one (safe for shared work).

**Check**
- Which reset mode keeps your changes staged?
- You just ran `git reset --hard` by mistake. What's the rescue command?

- [ ] Stage 5 complete

---

## Stage 6: Branches and merging (60 min)

**Idea:** Try ideas on the side without touching `main`.

**Commands:** `git branch`, `git branch -vv`, `git switch -c <name>`, `git switch <name>`, `git merge <name>`, `git branch -d <name>`

**Do:**
1. `git switch -c feature/count`. Add the "2/3 done" counter. Commit.
2. `git switch main`. Notice the counter is gone from the file. Switch back and see it return.
3. `git switch main` then `git merge feature/count`. Read the output: it says **fast-forward**. Delete the branch with `git branch -d feature/count`.
4. Now make a **non-fast-forward** merge: create `feature/theme`, commit on it, switch to `main`, make a different commit on `main`, then merge `feature/theme`. Open `git lg` and see the merge commit.

**Check**
- When is a merge a fast-forward, and when does it create a merge commit?

- [ ] Stage 6 complete

---

## Stage 7: Merge conflicts, on purpose (45 min)

**Idea:** A conflict is Git asking you to choose. It's not an error.

**Commands:** `git merge`, `git status`, `git diff`, `git add`, `git commit`, `git merge --abort`

**Do:**
1. Create `feature/footer-a` and `feature/footer-b` from `main`. In each, change **the same line** of the footer text differently. Commit both.
2. Merge `feature/footer-a` into `main`, then try `feature/footer-b`. Conflict!
3. Open the file, find `<<<<<<<`, `=======`, `>>>>>>>`. Keep the version you want, delete the markers, `git add` the file, `git commit`.
4. Do it again, but this time use `git merge --abort` to back out.

**Check**
- What do the three marker lines mean?
- How do you cancel a merge that went wrong?

- [ ] Stage 7 complete

---

## Stage 8: Stash (30 min)

**Idea:** A drawer to hide unfinished work.

**Commands:** `git stash push -m "..."`, `git stash list`, `git stash pop`, `git stash apply`, `git stash drop`, `git stash -u`

**Do:**
1. Half-write a feature (uncommitted), then "an urgent fix" appears: `git stash push -m "wip footer"`.
2. Switch branch, fix something, commit, switch back, `git stash pop`.
3. Practice `apply` vs `pop` (keeps vs removes the stash), and `-u` for new untracked files.

**Check**
- When would you use stash instead of a commit?

- [ ] Stage 8 complete

---

## Stage 9: GitHub basics (60 min)

**Idea:** Put a copy in the cloud.

**Commands:** `git remote add origin <url>`, `git remote -v`, `git push -u origin main`, `git push`, `git clone <url>`

**Do:**
1. Create an empty repo on GitHub (no README). Connect it with `git remote add origin`.
2. `git push -u origin main`. Refresh GitHub and see your commits.
3. Clone it into a different folder (`git clone <url> ink-todo-copy`) to see "the other computer".
4. Add a README.md with one line about the app. Commit, push.

**Check**
- What does `-u` do?
- What's the difference between `git clone` and `git init`?

- [ ] Stage 9 complete

---

## Stage 10: Stay in sync (45 min)

**Idea:** Two copies of a project will drift. Fetch and pull bring them together.

**Commands:** `git fetch`, `git pull`, `git pull --rebase`, `git status`, `git branch -vv`

**Do:**
1. In the clone (`ink-todo-copy`), make a commit and push.
2. In the original, run `git fetch`, then `git status` ("behind by 1"). Then `git pull`.
3. Create a **diverged** situation: commit in both copies without pulling. Push from one; the push from the other is rejected. Fix it with `git pull --rebase` and push again.

**Rule:** `fetch` only looks. `pull` = `fetch` + join.

**Check**
- Why was your push rejected and how did you fix it?

- [ ] Stage 10 complete

---

## Stage 11: Pull requests (60 min)

**Idea:** The normal way to ship a change: branch → push → PR → merge.

**Commands:** `git switch -c`, `git push -u origin <branch>`, `gh auth login`, `gh pr create`, `gh pr view`, `gh pr merge`, `git switch main`, `git pull`, `git branch -d`

**Do:** Add "press q to quit" using the full flow.
1. `git switch -c feature/quit-key`, write it, commit.
2. `git push -u origin feature/quit-key`
3. `gh pr create` (title and description), review the diff on GitHub, merge it (try "squash and merge").
4. Back locally: `git switch main`, `git pull`, `git branch -d feature/quit-key`.

**Check**
- List the 7 steps of the PR flow from memory.

- [ ] Stage 11 complete

---

## Stage 12: Clean up history (rebase) (60 min)

**Idea:** Tidy your local commits before sharing.

**Commands:** `git rebase main`, `git rebase -i HEAD~N`, `git commit --fixup <hash>`, `git rebase -i --autosquash`, `git rebase --continue / --abort`

**Do** (on a branch, after `git branch backup/stage12`):
1. Make 4 messy commits (`wip`, `wip2`, `fix typo`, `final`).
2. `git rebase -i HEAD~4`: try `reword`, `squash`, `fixup`, `drop`, reorder.
3. Update a branch that's behind `main` with `git rebase main`. Resolve one conflict with `--continue`, then try `--abort`.

**Rule:** never rebase commits other people already have.

**Check**
- What's the difference between `merge` and `rebase`, in one sentence?

- [ ] Stage 12 complete

---

## Stage 13: Cherry-pick (20 min)

**Idea:** Copy one commit to another branch.

**Commands:** `git cherry-pick <hash>`

**Do:** Make a bug-fix commit on a feature branch, then copy only that commit to `main` with `cherry-pick`.

**Check**
- When is cherry-pick better than merge?

- [ ] Stage 13 complete

---

## Stage 14: Tags and releases (20 min)

**Idea:** Name an important commit.

**Commands:** `git tag v0.1.0`, `git tag -a v0.1.0 -m "..."`, `git tag`, `git push origin v0.1.0`, `git push --tags`

**Do:** Tag your app `v0.1.0`, push the tag, and create a GitHub Release from it (`gh release create`).

**Check**
- Lightweight vs annotated tag?

- [ ] Stage 14 complete

---

## Stage 15: Detective tools (45 min)

**Idea:** Find out who changed what, and when a bug started.

**Commands:** `git blame <file>`, `git blame -L 10,20 <file>`, `git log -S "text"`, `git log -p <file>`, `git bisect start/bad/good/reset`, `git grep`

**Do:**
1. Use `git blame` on `app.tsx` and find the commit for one line.
2. Use `git log -S "footer"` to find when the word was added.
3. Commit a deliberate bug (the app crashes), add 4 more commits after it, then use `git bisect` to find the bad commit.

**Check**
- Which command finds the commit that introduced a given word?

- [ ] Stage 15 complete

---

## Stage 16: Work on two things at once (30 min)

**Idea:** Two branches, two folders, one repo.

**Commands:** `git worktree add ../ink-todo-hotfix hotfix`, `git worktree list`, `git worktree remove`

**Do:** Open the hotfix in a second terminal while the feature branch stays untouched.

- [ ] Stage 16 complete

---

## Stage 17: Daily-driver extras (30 min)

**Commands:** `git clean -n` then `git clean -fd`, `git config --global alias.<name> ...`, `git commit --allow-empty`, `git diff main..branch`, `git log main..branch`, `git shortlog -sn`, `git restore --source=<hash> <file>`

**Do:** Add aliases `st` (status -sb), `co` (switch), `lg` (graph log). Always run `git clean -n` first (dry run).

- [ ] Stage 17 complete

---

## Final Challenge: A full week as a dev (2–3 hours)

Without help, ship 3 small features to Ink Todo (delete a todo, add a new todo, save to a file), each on its own branch with a PR, at least one with a conflict, one cleaned with interactive rebase, then tag `v0.2.0`. The agent only reviews.

- [ ] Final challenge complete

---

## Cheat Sheet (drill until it's automatic)

```bash
git status -sb                         # where am I, what changed
git add <file> | git add -p            # choose changes
git commit -m "feat: ..."              # save
git diff | git diff --staged           # see changes
git log --oneline --graph --all        # see history
git restore <file>                     # throw away edits
git restore --staged <file>            # unstage
git commit --amend                     # fix last commit (unpushed)
git switch -c <branch>                 # new branch
git merge <branch>                     # join
git stash push -m "..." | git stash pop
git fetch | git pull --rebase | git push
git revert <hash>                      # safe undo
git reflog                             # rescue
```

---

## Progress Tracker

| Stage | Topic | Done |
|---|---|---|
| 0 | Setup | ☑ |
| 1 | First save point | ☐ |
| 2 | See changes | ☐ |
| 3 | History | ☐ |
| 4 | Small fixes | ☐ |
| 5 | Bigger undos | ☐ |
| 6 | Branch and merge | ☐ |
| 7 | Conflicts | ☐ |
| 8 | Stash | ☐ |
| 9 | GitHub | ☐ |
| 10 | Sync | ☐ |
| 11 | Pull requests | ☐ |
| 12 | Rebase | ☐ |
| 13 | Cherry-pick | ☐ |
| 14 | Tags | ☐ |
| 15 | Detective tools | ☐ |
| 16 | Worktrees | ☐ |
| 17 | Extras | ☐ |
| - | Final challenge | ☐ |