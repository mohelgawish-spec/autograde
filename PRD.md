# [ ] Service Plan (PRD)

- Author: [ ]
- Date: ( )

---

## 1. Background (Problem Definition)
*Who, in what work, experiences what inconvenience.*

Students frequently lack access to quick, objective feedback on their assignments. This app is a web application where students submit assignments and receive automated scoring and evaluation feedback, addressing that gap directly.

## 2. Current Approach and Its Limits
*How this is handled now, and what falls short.*

Today, feedback comes from manual grading by instructors or teaching assistants, which typically takes days to turn around and can vary in consistency from one grader to another. This delays learning and doesn't scale as the number of students grows.

## 3. Goals and Expected Impact (Success Criteria)
*In measurable numbers (processing time, number of inquiries, accuracy, etc.).*

- Reduce feedback turnaround time from days (manual grading) to under 1 minute (automated scoring).
- Scoring is applied consistently: every submission is scored with the same rubric and fixed model settings (temperature 0), so results are stable and explainable rather than varying randomly.
- Support at least 50 submissions per day without degradation in response time.

## 4. Users and the Usage Flow
*Who uses it and the order of use (with arrows).*

Users: Students

Flow: Student uploads assignment → System validates file (type/size/deadline) → System scores the submission and generates feedback → Student views score and feedback.

## 5. Key Features (Must / Nice)
*Split into must-have and nice-to-have features.*

**Must-have:**

### 1) Assignment Submission
- Description: Students upload/submit their assignment for evaluation.
- Rules the AI must follow:
  1. Accept only specific file types (`.pdf`, `.docx`, `.txt`).
  2. Reject submissions after the deadline set in `ASSIGNMENT_DEADLINE` (env var), unless within the grace period set by `GRACE_PERIOD_HOURS` (env var, default 24; set to 0 to disable).
  3. Enforce a maximum file size (10MB).

### 2) Automated Scoring
- Description: The system evaluates a submitted assignment and returns a score with feedback.
- Rules the AI must follow:
  1. Score on a fixed scale (0–100).
  2. Always return at least one line of written feedback alongside the numeric score.
  3. If the submission is empty or unreadable, return a score of 0 with an error message instead of guessing.

**Nice-to-have:** None planned for this exercise.

## 6. Scope and Out-of-Scope
*What will / won't be built in this exercise.*

**In scope:**
- Assignment Submission
- Automated Scoring

**Out of scope:**
- No plagiarism/originality detection
- No manual (teacher) grading override or review workflow
- No student accounts/login system (single-session use only)
- No analytics/reporting dashboard

## 7. Security and Privacy Review
*The confidentiality level of the documents used, whether personal data is involved, how API keys are managed.*

- Confidentiality: Submitted assignments are student academic work — treated as sensitive but not highly confidential (no financial or health data involved).
- Personal data: Files may incidentally contain a student's name; no additional personal data is collected or stored beyond what's needed to process the submission.
- API keys: Managed via `.env` in the project root, which is excluded from version control via `.gitignore` (`.env` and `node_modules` are both registered) so keys are never pushed to GitHub. See `DESIGN.md`'s Configuration section for the full list of required environment variables and what each one is used for.
- Third-party processing: assignment text is sent to the OpenAI API to generate the score and feedback. No file or text is sent anywhere else, and nothing is stored server-side after the response is returned to the student.

## 8. Technology Stack
*The set of tools used for development (fixed to Next.js in this course).*

- Next.js — handles the screen and the server-side code (API) in one project.
- Reason it's fixed: it's the same setup used in the Part 1–2 practice, and we'll deploy to Vercel in Part 5, so this keeps everything continuous.
- A file-reading library (`pdf-parse`, `mammoth`) and the OpenAI API are approved additions on top of Next.js — they're libraries/services the app calls, not a different framework, so they don't conflict with the "Next.js only" rule.
