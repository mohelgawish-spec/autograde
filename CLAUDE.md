# CLAUDE.md

This file guides Claude Code when working in this repository.

## Project Overview

A web app where students submit assignments and receive automated scoring/evaluation feedback, so they get quick, objective feedback instead of waiting on manual grading. See [PRD.md](PRD.md) and [prd_lite.md](prd_lite.md) for full planning context.

## Tech Stack

- **Next.js** — handles both the frontend and the server-side API in a single project. This is fixed for the course (Parts 1–2 practice, Part 5 deploys to Vercel) — do not introduce another framework, suggest migrating, or add a separate backend.
- **Deployment**: Vercel.

## Core Features & Rules

### 1) Assignment Submission
- Accept only `.pdf`, `.docx`, `.txt` files.
- Reject submissions after the deadline, unless a grace period (24 hours) is explicitly allowed.
- Enforce a maximum file size of 10MB.

### 2) Automated Scoring
- Score on a fixed scale of 0–100.
- Always return at least one line of written feedback alongside the numeric score.
- If the submission is empty or unreadable, return a score of 0 with an error message — never guess a score.

## Out of Scope (do not build)

- Plagiarism/originality detection
- Manual (teacher) grading override or review workflow
- Student accounts/login system (single-session use only)
- Analytics/reporting dashboard

## Security & Secrets

- Secrets (API keys, tokens) live in `.env` and must never be hardcoded or committed.
- `.env` and `node_modules` must always be registered in `.gitignore` — never commit them.
- Never print or log `.env` values.
- If a task needs authentication with an external service, don't ask the user for the token or print it in chat — read and use the value already in `.env`.
  - Example: for Supabase work, install the Supabase CLI and authenticate with `SUPABASE_ACCESS_TOKEN` from `.env`.
  - Example: for Vercel work (deployment, etc.), install the Vercel CLI and authenticate with `VERCEL_TOKEN` from `.env`.

## Working Rules

- Write all explanations and comments in English.
- Only create new files inside the `my-app` folder.
- Whenever code changes, report in one line what was changed and why.
- Never delete a file outright. Create a `trash-can` folder and move the file there instead — the user reviews it and deletes it themselves once work is confirmed done.
- Actively use the already-installed subagents whenever they're needed.

## Workflow (verification loop)

For every change, repeat this loop:

1. **Make the change** — implement the code change.
2. **Check the result yourself** — open it in a browser or run it; don't assume it works.
3. **Review your own code** — re-read the diff for bugs, edge cases, and rule violations before calling it done.
4. **If there's a problem, fix it and go back to step 1.**

Once the loop passes, summarize in one line what was changed and why.

## Conventions

- (To be filled in once the Next.js project is scaffolded — e.g. commands for dev/build/lint, folder structure, coding style.)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
