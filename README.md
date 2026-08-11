# AutoGrade

AutoGrade is a web app where students submit an assignment and get an automated score with written feedback in under a minute, instead of waiting days for manual grading.

## How it works

1. **Submit** — a student uploads a `.pdf`, `.docx`, or `.txt` file before the deadline (a 24-hour grace period is allowed).
2. **Score** — the submission's text is extracted and evaluated to produce a score from 0–100.
3. **Feedback** — the student sees their score along with written feedback right away.

## Tech stack

- **[Next.js](https://nextjs.org)** — handles both the UI and the server-side API in a single project.
- Deployed on **[Vercel](https://vercel.com)**.

## Project docs

The full planning and design process is documented in this repo:

- [`PRD.md`](./PRD.md) — the product requirements doc (problem, goals, scope, security review).
- [`PLAN.md`](./PLAN.md) — the build plan and success criteria.
- [`DESIGN.md`](./DESIGN.md) — screen layout, data flow, API contract, and tech choices.
- [`CHECK.md`](./CHECK.md) — known gaps between the design and the current implementation.
- [`CLAUDE.md`](./CLAUDE.md) — project conventions and working rules.

## Status

This is a course project and a work in progress — the submission/scoring feature described above is still being built. See [`CHECK.md`](./CHECK.md) for the current implementation gaps.

## Getting started locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll need your own `.env` file (see `DESIGN.md`'s Configuration section for the required variables) — it's intentionally not committed to this repo.
