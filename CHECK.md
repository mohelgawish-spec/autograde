# CHECK.md

Gap list from comparing `DESIGN.md` against the actual code in `my-app` (via `bkit:gap-detector`). Ordered most serious first. Nothing has been fixed yet.

1. `POST /api/submit` doesn't exist at all — no `app/api/` directory, so the entire server-side contract (validation + extraction + scoring) is unbuilt.
2. The Submission view doesn't exist — `app/page.tsx` is still the unmodified Next.js template, not an upload screen.
3. The Results view and the single-page two-state toggle don't exist — `page.tsx` has no state at all, so there's no foundation for "swap views after a successful response."
4. OpenAI scoring is missing — no `openai` dependency installed, no API call, no `temperature: 0` setting.
5. Text extraction is missing — no `pdf-parse`/`mammoth`/equivalent in `package.json`, so PDF/DOCX content can't be read yet.
6. Nothing parses `multipart/form-data` or reads a `file` field from a request.
7. File-type validation (`.pdf`/`.docx`/`.txt`) is missing — `INVALID_FILE_TYPE` is never produced.
8. File-size validation (10MB cap) is missing — `FILE_TOO_LARGE` is never produced.
9. Deadline + grace-period validation is missing — `.env` has the values, but no code reads them; `DEADLINE_PASSED` is never produced.
10. The ordered validation sequence (type → size → deadline, short-circuiting before scoring) isn't implemented, so "scoring is never invoked on invalid input" is currently unenforced.
11. The response envelope (`{success, score, feedback}` / `{success, error}`, always-200 rule) doesn't exist anywhere.
12. The extraction-failure/unreadable-content → `score: 0` rule (PRD Rule 3, the trickiest rule in the design) has no code guarding it yet.
13. Nothing clamps the model's score to 0–100 or guarantees feedback text accompanies every score.
14. The inline error-message area on the Submission view has nowhere to render — no error state exists.
15. "Submit disabled until a valid file is chosen" behavior is absent.
16. The "Submit another" reset control (Results → Submission) is absent.
17. The visible rules note (accepted types / 10MB max / deadline) isn't rendered anywhere in the UI.
18. The page title/metadata is still "Create Next App" — doesn't match the shared app-name header DESIGN.md calls for.
19. `GRACE_PERIOD_HOURS`'s semantics (default 24, `0` disables it) aren't implemented anywhere yet.
20. A missing/invalid `OPENAI_API_KEY` at request time has no handling (no startup or per-request check).
21. A malformed or unparseable `ASSIGNMENT_DEADLINE` is an edge case DESIGN.md never actually defines, and nothing guards against it.
22. A request with no file, or a zero-byte file, is ambiguous in DESIGN.md itself (validation error vs. the Rule-3 score-0 path) and unhandled either way.
23. An OpenAI API failure or a non-numeric/out-of-range model response is undefined in DESIGN.md and unimplemented — only the vague "unexpected server errors" clause covers it.
