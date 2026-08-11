# DESIGN.md

Based on `PLAN.md` — designs the two must-have features: Assignment Submission and Automated Scoring.

## Screen Layout

Both views below are two states of a single page (`/`) — after a successful submission, the page swaps from the upload view to the results view using local component state. This avoids needing a database or session just to pass the score across pages, since the one API response already has everything the results view needs.

### View 1: Submission (default state)
- **Header**: App name/title.
- **Upload area**: File picker (drag-and-drop or click-to-browse), with a visible note of the rules — accepted types (`.pdf`, `.docx`, `.txt`), max size (10MB), and the deadline.
- **Submit button**: Disabled until a valid file is selected.
- **Status message area**: Shows errors inline (wrong file type, file too large, deadline passed). These client-side checks are a convenience only — `/api/submit` re-validates everything server-side and is the sole source of truth.

### View 2: Results (shown after a successful `/api/submit` response)
- **Header**: Same app name/title, for consistency.
- **Score display**: Large, prominent number out of 100.
- **Feedback block**: The written feedback text below the score.
- **"Submit another" button**: Resets state back to the Submission view.

## Configuration

No database is used, so a few settings live in `.env` instead:

| Variable | Used for | Notes |
|---|---|---|
| `OPENAI_API_KEY` | Automated Scoring (calls the OpenAI API) | Required at runtime. |
| `ASSIGNMENT_DEADLINE` | Deadline check | ISO 8601 timestamp (UTC). Single fixed deadline for this exercise. |
| `GRACE_PERIOD_HOURS` | Grace-period check | Number, default `24`. Set to `0` to disable the grace period. |
| `VERCEL_TOKEN` | Deployment only | Used by the Vercel CLI to deploy; not read by the running app. |
| `GITHUB_TOKEN`, `SUPABASE_ACCESS_TOKEN` | Not used by this app | Present in `.env` from earlier course setup, but this design has no GitHub or Supabase integration. |

## API Contract

A single route handles validation, extraction, and scoring together:

**`POST /api/submit`** — request: `multipart/form-data` with a `file` field.

Response (always `200`, JSON body — `4xx/5xx` reserved for unexpected server errors):

```json
{
  "success": true,
  "score": 87,
  "feedback": "..."
}
```

```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "..."
  }
}
```

- **Validation step** (file type → file size → deadline/grace period): on failure, respond with `success: false` and one of `INVALID_FILE_TYPE`, `FILE_TOO_LARGE`, or `DEADLINE_PASSED`. Scoring is never invoked.
- **Extraction + scoring step** (only reached if validation passes): if text extraction fails, or the extracted text is empty/unreadable, that's treated as PRD Rule 3's "unreadable submission" case — respond with `success: true, score: 0, feedback: "<explanation>"`, not an `error`. This route is the single place that owns that decision.
- Otherwise, respond with `success: true` plus the numeric `score` and `feedback` from the scoring step.

## Data Flow

```
Student selects a file (Submission view)
        │
        ▼
Browser POSTs the file to /api/submit
        │
        ▼
Validate: file type → file size → deadline/grace period
        │
        ├─ invalid ──▶ { success: false, error } ──▶ shown inline on Submission view
        │
        ▼ valid
Extract text from the file
        │
        ├─ extraction fails / empty text ──▶ { success: true, score: 0, feedback } ──┐
        │                                                                             │
        ▼ text extracted                                                             │
Call OpenAI API (temperature 0) with the text → get back a score (0–100) + feedback   │
        │                                                                             │
        ▼                                                                             │
        └──────────────────────────────▶ { success: true, score, feedback } ◀────────┘
                                                        │
                                                        ▼
                                    Browser switches to the Results view
```

## Tech Choices

- **Next.js** (fixed, per PRD) — one project handles both the screens the student sees and the server-side logic (API routes) that does the validation and scoring. This is what gets deployed to Vercel in Part 5.

Additional tools needed on top of Next.js:

- **A file-reading library** (e.g. `pdf-parse` for PDFs, `mammoth` for Word docs) — plain explanation: a small helper that opens the uploaded PDF/Word file and pulls out the plain text inside it, since the scoring step needs to read the text, not the raw file.
- **OpenAI API** (using the `OPENAI_API_KEY` already in `.env`, called with `temperature: 0` for consistent scoring) — plain explanation: this is the "brain" that actually reads the assignment text and decides the score and feedback. Next.js just passes it the text and receives back a score + comment.

No database is needed — since accounts and an analytics dashboard are explicitly out of scope, each submission is processed and shown once, without being saved anywhere.
