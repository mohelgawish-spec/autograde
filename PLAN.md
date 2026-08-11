# PLAN.md

## This Cycle's Goal

Build and deploy the two must-have features from `PRD.md` — Assignment Submission and Automated Scoring — as a working Next.js app.

## Success Criteria

- Feedback turnaround is under 1 minute (automated scoring, vs. days for manual grading).
- Scoring is applied consistently: the same rubric and fixed model settings (temperature 0) are used for every submission.
- The app handles at least 50 submissions per day without degradation in response time.
- Both features follow their PRD-defined rules (file type/size/deadline checks; 0–100 scoring scale; feedback text; empty/unreadable handling).

## Tasks (build order)

1. Scaffold the Next.js project (App Router, base layout, dev server running) — everything else is built on top of this.
2. Confirm `.env` loading works, set `ASSIGNMENT_DEADLINE` and `GRACE_PERIOD_HOURS` (see DESIGN.md's Configuration section), and check `.gitignore` still excludes `.env` and `node_modules`.
3. Build the file upload UI for Assignment Submission.
4. Implement the `POST /api/submit` route's validation step: enforce allowed file types (`.pdf`, `.docx`, `.txt`), max file size (10MB), and the deadline/grace-period rules — return the matching error code and stop before scoring on failure.
5. Extend `/api/submit` with text extraction and Automated Scoring (via the OpenAI API): score on a 0–100 scale, always return written feedback, and return score 0 + explanation for empty/unreadable content (per DESIGN.md's API contract).
6. Wire the Submission Screen to call `/api/submit` and handle its response (validation errors vs. score+feedback).
7. Build the results view (same page, shown via state after a successful response) that displays the score and feedback.
8. Deploy the app to Vercel, authenticating with `VERCEL_TOKEN` from `.env`.
