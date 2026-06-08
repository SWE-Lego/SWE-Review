# Revision Task

You are given a bug report, a previous patch attempt, and a detailed code review.
Use the review feedback to guide your revision.

## Data Files (at `/testbed/revision_data/`)
- `problem_statement.txt` -- Bug description
- `original_patch.diff` -- Previous patch attempt
- `review_feedback.txt` -- Code review with defect descriptions and suggestions

## Instructions
1. Read the problem statement and review feedback
2. Apply the previous patch: `cd /testbed && git apply /testbed/revision_data/original_patch.diff`
3. Address each defect identified in the review, focusing on HIGH severity issues
4. Create `/pr_content.json` with your fix description before finishing
