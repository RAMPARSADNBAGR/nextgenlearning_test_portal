// ===============================
// NextGen Learning - Instructions Page
// ===============================

const student = JSON.parse(localStorage.getItem("student"));

const questionCount = localStorage.getItem("selectedQuestionCount") || "60";
const timeMinutes = localStorage.getItem("selectedTimeMinutes") || "60";
const chapterTitle = localStorage.getItem("selectedChapterTitle") || student.chapterTitle || "";

document.getElementById("studentInfo").innerHTML =
`
<strong>Name :</strong> ${student.name}<br>
<strong>Class :</strong> ${student.class}<br>
<strong>Subject :</strong> ${student.subject}<br>
<strong>Chapter :</strong> ${chapterTitle}
`;

const marksPerCorrect = Number(localStorage.getItem("selectedMarksPerCorrect")) || 1;
const negativeMarking = Number(localStorage.getItem("selectedNegativeMarking")) || 0;

document.getElementById("qCount").innerText = questionCount;
document.getElementById("qMarks").innerText = Number(questionCount) * marksPerCorrect;

document.getElementById("perQuestionMarks").innerText =
    `Each correct answer carries ${marksPerCorrect} mark${marksPerCorrect === 1 ? "" : "s"}.`;

document.getElementById("negMarkLine").innerText = negativeMarking > 0
    ? `Negative Marking : −${negativeMarking} mark for each wrong answer (unanswered questions carry no penalty)`
    : "No Negative Marking";
document.getElementById("qTime").innerText = timeMinutes;

document.getElementById("startExam").onclick = function () {

    const el = document.documentElement;

    // Request full-screen mode as part of this click (a user gesture is
    // required by browsers to enter full-screen). We navigate to the quiz
    // either way, so the test still works on devices/browsers that don't
    // support the Fullscreen API (e.g. some mobile browsers).
    let fsRequest;

    if (el.requestFullscreen) {
        fsRequest = el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
        fsRequest = el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
        fsRequest = el.msRequestFullscreen();
    }

    if (fsRequest && fsRequest.finally) {
        fsRequest.finally(() => {
            window.location.href = "quiz.html";
        });
    } else {
        window.location.href = "quiz.html";
    }

};
