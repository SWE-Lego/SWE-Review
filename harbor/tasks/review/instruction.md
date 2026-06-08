# Code Review Task

You are reviewing an AI-generated patch. Your job: determine if the patch **correctly fixes the root cause** of the bug.

See `prompts/agentic_review.md` for the full review protocol.

## Data Files (at `/review_data/`)
- `problem_statement.txt` -- Bug description
- `predicted.json` -- The patch to review (field: "patch")
- `summary.json` -- Task metadata

## Output
Save your review to `/review_report.json` before finishing.
