// ===============================
// NextGen Learning - Chapter Data Helper
// ===============================
// Combines any manually-defined chapters in data/config.js (e.g. "Coming
// Soon" placeholders for chapters you haven't written yet) with the
// auto-generated real ones in data/chapters.generated.js. A generated
// chapter always takes priority over a manual placeholder with the same id.

function getChaptersFor(classId, subjectId) {

    const classObj = APP_CONFIG.classes.find(c => c.id === classId);
    if (!classObj) return [];

    const subjectObj = classObj.subjects.find(s => s.id === subjectId);
    if (!subjectObj) return [];

    const manualChapters = subjectObj.chapters || [];

    const generatedChapters =
        (typeof CHAPTER_DATA !== "undefined" && CHAPTER_DATA[`${classId}|${subjectId}`]) || [];

    const generatedIds = generatedChapters.map(c => c.id);

    // A "Coming Soon" placeholder disappears as soon as a real test exists
    // for that chapter: either the same id, or an id that starts with the
    // placeholder id plus a dash (e.g. placeholder "morphology-flowering-plants"
    // is replaced by tests "morphology-flowering-plants-paper-1" and "-paper-2").
    const stillComingSoon = manualChapters.filter(c =>
        !generatedIds.some(id => id === c.id || id.startsWith(c.id + "-"))
    );

    // Real tests first, then the remaining "Coming Soon" chapters.
    return [
        ...generatedChapters,
        ...stillComingSoon
    ];

}

function getChapterConfig(classId, subjectId, chapterId) {
    return getChaptersFor(classId, subjectId).find(c => c.id === chapterId) || null;
}
