# [ ] Service Plan (PRD_lite)

- Author: [ ]
- Date: ( )

---

## 1. In one line, what is this app?
- Answer: A web app where students submit assignments and receive automated scoring/evaluation feedback.

---

## 2. Who uses it, and why? (just one line each!)
- Who uses it?
  - Answer: Students
- What inconvenience does it solve?
  - Answer: They don't get quick, objective feedback on their assignments.

---

## 3. Core features to build (exactly 2!)
> 💡 If you try to build too many features, the AI tangles up the code.
> Pick just the 2 most important features and give the AI their "rules."

### 1) Assignment Submission
- Description: Students upload/submit their assignment for evaluation.
- Rules the AI must follow:
  1. Accept only specific file types (`.pdf`, `.docx`, `.txt`).
  2. Reject submissions after the deadline, unless a grace period (24 hours) is explicitly allowed.
  3. Enforce a maximum file size (10MB).

### 2) Automated Scoring
- Description: The system evaluates a submitted assignment and returns a score with feedback.
- Rules the AI must follow:
  1. Score on a fixed scale (0–100).
  2. Always return at least one line of written feedback alongside the numeric score.
  3. If the submission is empty or unreadable, return a score of 0 with an error message instead of guessing.

---

## 4. Features you will definitely NOT build this time (let go of extras)
> 💡 Declaring "I won't build this" to the AI up front keeps it from coding the wrong things.
- No plagiarism/originality detection
- No manual (teacher) grading override or review workflow
- No student accounts/login system (single-session use only)
- No analytics/reporting dashboard

---

## 5. Design feel and colors
- Overall mood: Clean and academic — simple, trustworthy, no clutter
- Main color: Blue (conveys focus/trust, common in edu tools)
- Screen-size constraints: Responsive, but optimized primarily for desktop/laptop use
