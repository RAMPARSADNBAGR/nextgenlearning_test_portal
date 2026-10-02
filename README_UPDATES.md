# What's new in this version

## 1. Question navigator + mark for review

The quiz page now shows a clickable grid of every question (green =
answered, amber = marked for review, white = not answered) so students
can jump around and review before submitting, plus a **"Mark for
Review"** button.

## 2. Low-time warning + a real bug fix

The timer now flashes red in the last 5 minutes. Also fixed a real bug:
previously, when time ran out, the app jumped straight to the results
page **without saving the student's answers** - anyone who ran out of
time lost their whole test. It now submits properly through the normal
flow.

## 3. Question randomization

Each student sees questions in a shuffled order (stored per-attempt, so
it stays consistent if they refresh). This stops students sitting near
each other from copying off the same question at the same time. Answer
option order is intentionally left unshuffled to keep scoring reliable.

## 4. Post-submission review with explanations

After submitting, students can see which answers were right/wrong along
with the explanation for each question (the `explanation` field you
already write for every question). Turn this off per-chapter by setting
`showReview: false` in `data/config.js`.

## 5. Negative marking (optional, per chapter)

Set `negativeMarking` in a chapter's config entry (e.g. `0.25`) to deduct
that many marks per wrong answer. Default is `0` (no negative marking),
matching the old behaviour.

## 6. Secure server-side scoring (optional)

Previously, the full answer key was sent to the student's browser inside
the question file - a technically savvy student could view it. Now:

- **`question-source-private/`** holds your master files (with answers) -
  keep this on your own computer, never upload it.
- **`public-questions/`** holds answer-free files (auto-generated) - this
  is the only version that ever reaches the browser.
- Run `node tools/build-public-questions.js` to regenerate both, plus an
  answer-key export you paste into your Google Sheet's "AnswerKeys" tab.
- Turn it on with `serverSideScoring: true` in `data/config.js`. When on,
  the Apps Script backend scores the test and only reveals correct
  answers after submission.

This is **off by default** so nothing breaks if you don't set it up -
the app keeps working exactly as before (client-side scoring) until you
opt in. See `GOOGLE_SHEET_SETUP.md` Step 5 for the full walkthrough.

## 7. Block repeat attempts (optional)

Set `preventReattempts: true` (alongside `serverSideScoring: true`) in
`data/config.js` to stop a student from completing the same chapter test
twice, checked by mobile number against your Google Sheet. Fails open (
lets them proceed) if the check can't reach the server, so a connectivity
hiccup never wrongly locks someone out.

## 8. Teacher dashboard

A new password-protected page (`pages/teacher-dashboard.html`, linked
from the homepage footer) shows:
- All results in a sortable table
- Summary cards (attempts, average score, how many had integrity warnings)
- A "Most Missed Questions" breakdown per chapter, so you can see exactly
  what to re-teach

Set the password once via Apps Script → Project Settings → Script
Properties → `DASHBOARD_PASSWORD` (see `GOOGLE_SHEET_SETUP.md` Step 6).

## 9. Chapter selection actually works + new Tissues test

(Carried over from the previous update, still true here.) The quiz page
dynamically loads `<class>/<subject>/<chapter>` based on what the student
actually picked, instead of always loading the same file. Class 9 →
Science → Tissues (75 questions) is included.

---

## Deferred for a future round (flagging honestly, not built yet)

- A CSV/spreadsheet importer UI for adding questions without hand-writing
  JS - `tools/build-public-questions.js` is a step in this direction, but
  there's no upload interface yet.
- Hindi language toggle
- PDF result certificates
- Dark mode / theme toggle

## 10. Adding a new test is now 2 steps, not 3

Chapters are now **auto-discovered**. You no longer edit `data/config.js`
when adding a test:

1. Write `question-source-private/<class>/<subject>/<chapterId>.js`,
   optionally starting with a `CHAPTER_META` block:
   ```js
   const CHAPTER_META = {
       title: "Life Processes",
       timeMinutes: 60,      // optional, defaults to 1 min/question
       negativeMarking: 0,   // optional, defaults to 0
       showReview: true      // optional, defaults to true
   };
   const QUESTION_BANK = [ ... ];
   ```
   (If you skip `CHAPTER_META`, it still works - you just get a guessed
   title from the file name and 1 minute per question.)
2. Run `node tools/build-public-questions.js`.

That's it - the chapter appears automatically wherever it's needed. This
regenerates `data/chapters.generated.js`, which the app reads instead of
a hand-maintained list. `data/config.js` is now only for global settings
and (optionally) "Coming Soon" placeholders for chapters you haven't
written yet.

## Folder structure at a glance

```
NextGen-Test-Portal-main/       <- upload ONLY this folder's contents to your host
  data/chapters.generated.js    <- AUTO-GENERATED - the live list of chapters, don't hand-edit
  data/config.js                <- global settings + optional "Coming Soon" placeholders
  questions/                    <- with-answers files, used by the default mode (serverSideScoring:false)
  public-questions/             <- answer-free question files, used when serverSideScoring:true
  google-apps-script/Code.gs    <- paste into script.google.com
  ...

question-source-private/        <- KEEP LOCAL, your master files (edit these)
tools/
  build-public-questions.js     <- run: node tools/build-public-questions.js
  answer-keys/                  <- generated, paste into the Sheet's AnswerKeys tab (only needed for secure mode)
```

Note: in the default mode (`serverSideScoring: false`), `NextGen-Test-Portal-main/questions/` **does** contain the correct answers, because that's how local/in-browser scoring works. This is fine to host - it's the same trade-off the original portal always had. If you want answers to never reach the browser, turn on `serverSideScoring: true` (see `GOOGLE_SHEET_SETUP.md`), which uses `public-questions/` instead.

## 11. Marks per correct answer, Class 11 / 12, per-class scoring

- `marksPerCorrect` (default 1) now sits next to `negativeMarking` in
  `CHAPTER_META`. Score = correct x marksPerCorrect - wrong x negativeMarking
  (never below 0); percentage is out of total questions x marksPerCorrect.
- `tools/build-public-questions.js` has `CLASS_SCORING_DEFAULTS` near the top.
  Class 11 defaults to +4 / -1. Add a line there (e.g. `class12: {...}`) to
  give another class a default; a chapter's own `CHAPTER_META` always wins.
- Class 11 and Class 12 (Biology, Chemistry, Physics) are in `data/config.js`
  with every chapter listed as "Coming Soon". A placeholder disappears when a
  test file is named `<placeholder-id>.js` or `<placeholder-id>-<anything>.js`.
  Real tests are listed before the Coming Soon chapters.
- The build script now writes into the project root (the old
  `NextGen-Test-Portal-main/` sub-folder no longer exists in the repo).
- Apps Script: re-deploy `google-apps-script/Code.gs` (Deploy > Manage
  deployments > edit > New version) so the sheet records real marks and a new
  "Total Marks" column.
