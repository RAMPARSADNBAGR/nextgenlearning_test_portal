/**
 * NextGen Learning - Build Script
 * --------------------------------
 * Run this with:   node tools/build-public-questions.js
 *
 * What it does:
 *   1. Scans every master question file in question-source-private/.
 *   2. For each one, writes:
 *        - an answer-free file into public-questions/  (secure mode)
 *        - a full file (with answers) into questions/   (default mode)
 *        - an answer-key export into tools/answer-keys/ (paste into the
 *          Sheet's AnswerKeys tab, only needed for secure mode)
 *   3. AUTO-REGISTERS every chapter it finds into
 *      data/chapters.generated.js - so you do NOT need to hand-edit
 *      data/config.js when adding a new test. Title/time/question count
 *      are read straight from the file (see CHAPTER_META below).
 *
 * Run this again every time you add or edit a chapter in
 * question-source-private/. That's it - one command, no other file needs
 * to be touched for a new chapter to go live.
 *
 * OPTIONAL: add a CHAPTER_META block at the top of your master file to
 * control the title/time/marking shown to students:
 *
 *   const CHAPTER_META = {
 *       title: "Life Processes",
 *       timeMinutes: 60,        // optional, defaults to 1 minute/question
 *       negativeMarking: 0,     // optional, defaults to 0
 *       showReview: true        // optional, defaults to true
 *   };
 *
 * If you skip CHAPTER_META entirely, the chapter still gets registered
 * automatically - it just gets a plain title guessed from the file name
 * (e.g. "life" -> "Life") and 1 minute per question. You'll see a
 * reminder printed below if that happens.
 */

const fs = require("fs");
const path = require("path");

const SOURCE_ROOT = path.join(__dirname, "..", "question-source-private");
const PUBLIC_ROOT = path.join(__dirname, "..", "NextGen-Test-Portal-main", "public-questions");
const LOCAL_MODE_ROOT = path.join(__dirname, "..", "NextGen-Test-Portal-main", "questions");
const KEYS_ROOT = path.join(__dirname, "answer-keys");
const CHAPTERS_MANIFEST_PATH = path.join(__dirname, "..", "NextGen-Test-Portal-main", "data", "chapters.generated.js");

function loadChapterFile(filePath) {

    const src = fs.readFileSync(filePath, "utf8");

    const sandbox = {};

    const fn = new Function(
        "global",
        src
            .replace("const QUESTION_BANK", "global.QUESTION_BANK")
            .replace("const CHAPTER_META", "global.CHAPTER_META") +
        "\nreturn { QUESTION_BANK: global.QUESTION_BANK, CHAPTER_META: global.CHAPTER_META };"
    );

    return fn(sandbox);

}

function prettifyTitle(chapterId) {
    return chapterId
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}

function walk(dir, base) {

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let chapters = [];

    entries.forEach(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            chapters = chapters.concat(walk(fullPath, path.join(base, entry.name)));
        } else if (entry.name.endsWith(".js")) {
            chapters.push(path.join(base, entry.name));
        }
    });

    return chapters;

}

function main() {

    if (!fs.existsSync(SOURCE_ROOT)) {
        console.error("Could not find question-source-private/ - run this script from the project root.");
        process.exit(1);
    }

    fs.mkdirSync(PUBLIC_ROOT, { recursive: true });
    fs.mkdirSync(LOCAL_MODE_ROOT, { recursive: true });
    fs.mkdirSync(KEYS_ROOT, { recursive: true });

    const chapterFiles = walk(SOURCE_ROOT, "");
    const manifest = {}; // "classId|subjectId" -> [ chapter, chapter, ... ]

    chapterFiles.forEach(relPath => {

        const fullSourcePath = path.join(SOURCE_ROOT, relPath);
        const { QUESTION_BANK: bank, CHAPTER_META: meta } = loadChapterFile(fullSourcePath);

        const parts = relPath.split(path.sep);
        const chapterId = parts[parts.length - 1].replace(".js", "");
        const subjectId = parts[parts.length - 2];
        const classId = parts[parts.length - 3];
        const chapterKey = `${classId}|${subjectId}|${chapterId}`;

        if (!meta) {
            console.log(`NOTE: ${relPath} has no CHAPTER_META - using a guessed title "${prettifyTitle(chapterId)}" and 1 min/question. Add a CHAPTER_META block to control this.`);
        }

        // ---- Public file: question + options ONLY (no answers) ----
        const publicBank = bank.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            userAnswer: null
        }));

        const publicDir = path.join(PUBLIC_ROOT, classId, subjectId);
        fs.mkdirSync(publicDir, { recursive: true });
        fs.writeFileSync(
            path.join(publicDir, `${chapterId}.js`),
            "const QUESTION_BANK = " + JSON.stringify(publicBank, null, 2) + ";\n"
        );

        // ---- Local-scoring copy: full bank WITH answers, hosted ----
        const localModeDir = path.join(LOCAL_MODE_ROOT, classId, subjectId);
        fs.mkdirSync(localModeDir, { recursive: true });
        fs.writeFileSync(
            path.join(localModeDir, `${chapterId}.js`),
            "const QUESTION_BANK = " + JSON.stringify(bank, null, 2) + ";\n"
        );

        // ---- Answer key export (for the Sheet's AnswerKeys tab) ----
        const answerKey = {};
        bank.forEach(q => {
            answerKey[q.id] = { answer: q.answer, explanation: q.explanation || "" };
        });
        fs.writeFileSync(
            path.join(KEYS_ROOT, `${classId}-${subjectId}-${chapterId}.json`),
            JSON.stringify({ chapterKey: chapterKey, answers: answerKey }, null, 2)
        );

        // ---- Register in the auto-generated chapters manifest ----
        const subjectKey = `${classId}|${subjectId}`;
        if (!manifest[subjectKey]) manifest[subjectKey] = [];

        manifest[subjectKey].push({
            id: chapterId,
            title: (meta && meta.title) || prettifyTitle(chapterId),
            available: true,
            questionCount: bank.length,
            timeMinutes: (meta && meta.timeMinutes) || bank.length,
            negativeMarking: (meta && meta.negativeMarking) || 0,
            showReview: meta && typeof meta.showReview === "boolean" ? meta.showReview : true
        });

        console.log(`Built: ${chapterKey}  (${bank.length} questions)`);

    });

    // ---- Write the manifest file ----
    const manifestSrc =
        "// AUTO-GENERATED by tools/build-public-questions.js - do not edit by hand.\n" +
        "// Re-run the build script to update this file; your edits here will be overwritten.\n" +
        "const CHAPTER_DATA = " + JSON.stringify(manifest, null, 2) + ";\n";

    fs.mkdirSync(path.dirname(CHAPTERS_MANIFEST_PATH), { recursive: true });
    fs.writeFileSync(CHAPTERS_MANIFEST_PATH, manifestSrc);

    console.log(`\nWrote chapter manifest: ${path.relative(process.cwd(), CHAPTERS_MANIFEST_PATH)}`);
    console.log("Done. Public/local question files are safe to upload. Files in tools/answer-keys/ must NOT be uploaded - paste them into the AnswerKeys sheet tab instead (only needed if serverSideScoring is on).");

}

main();
