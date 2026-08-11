// ===============================
// NextGen Learning - App Configuration
// ===============================
// Chapters are now auto-registered - you do NOT need to edit this file
// when adding a new test. Just:
//   1. Write question-source-private/<classId>/<subjectId>/<chapterId>.js
//   2. Run: node tools/build-public-questions.js
// That's it. See CHAPTER_META in any existing question-source-private
// file for how to set the chapter's title/time/marking.
//
// This file only needs editing when adding a brand-new CLASS or SUBJECT
// (rare), or a "Coming Soon" placeholder for a chapter you haven't
// written yet.

const APP_CONFIG = {

    // Global settings - one place to tune behaviour across the whole app
    settings: {

        // If true, answers are checked on the server (Google Apps Script)
        // and never sent to the student's browser - the secure option.
        // Requires the Google Sheet + AnswerKeys tab to be set up first
        // (see GOOGLE_SHEET_SETUP.md). If you haven't done that yet, leave
        // this as false so the app keeps working the old (simpler) way.
        serverSideScoring: false,

        // Shuffle the order questions appear in for each student, so
        // students sitting near each other don't see the same question at
        // the same time. Answer options are NOT shuffled (kept in original
        // order) to keep answer-checking simple and reliable.
        randomizeQuestionOrder: true,

        // Number of anti-cheating violations (see js/anticheat.js) allowed
        // before the test is auto-submitted.
        maxViolations: 3,

        // Block a student from taking the same chapter test twice, based
        // on their mobile number. Requires serverSideScoring to be on
        // (checked against your Google Sheet).
        preventReattempts: false

    },

    classes: [

        {
            id: "class8",
            name: "Class 8",
            subjects: [
                { id: "science", name: "Science", chapters: [] },
                { id: "math", name: "Mathematics", chapters: [] }
            ]
        },

        {
            id: "class9",
            name: "Class 9",
            subjects: [
                { id: "science", name: "Science", chapters: [] },
                { id: "math", name: "Mathematics", chapters: [] }
            ]
        },

        {
            id: "class10",
            name: "Class 10",
            subjects: [
                { id: "science", name: "Science", chapters: [] },
                { id: "math", name: "Mathematics", chapters: [] }
            ]
        }

    ]

};
