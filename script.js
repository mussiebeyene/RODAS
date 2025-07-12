// script.js

function parseScore(value) {
  const lower = value.trim().toLowerCase();
  if (lower === "na" || lower === "") return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

function calculateGrade() {
  const examInputs = [
    document.getElementById("exam1").value,
    document.getElementById("exam2").value,
    document.getElementById("exam3").value,
    document.getElementById("exam4").value
  ];
  const finalExam = parseScore(document.getElementById("finalExam").value);

  const exams = examInputs.map(parseScore).filter(v => v !== null);

  let topExams = 0, halfExam = 0;
  if (exams.length > 0) {
    exams.sort((a, b) => b - a);
    topExams = exams.slice(0, 3).reduce((sum, score) => sum + score, 0) * 1.5;
    if (exams.length > 3) {
      halfExam = exams[3] * 0.5;
    }
  }

  const finalExamPts = finalExam !== null ? finalExam * 2 : 0;

  function parseAssignment(id) {
    return document.getElementById(id).value
      .split(',')
      .map(v => parseScore(v))
      .filter(v => v !== null);
  }

  const quizzes = parseAssignment("quizzes");
  const worksheets = parseAssignment("worksheets");
  const homeworks = parseAssignment("homeworks");

  const quizPts = quizzes.length > 0 ? (quizzes.reduce((a, b) => a + b, 0) / (quizzes.length * 10)) * 50 : 0;
  const worksheetPts = worksheets.length > 0 ? (worksheets.reduce((a, b) => a + b, 0) / (worksheets.length * 10)) * 20 : 0;
  const homeworkPts = homeworks.length > 0 ? (homeworks.reduce((a, b) => a + b, 0) / (homeworks.length * 10)) * 30 : 0;

  const earned = topExams + halfExam + quizPts + worksheetPts + homeworkPts + finalExamPts;
  const total = 650;

  const grade = (earned / total) * 100;

  document.getElementById("result").innerHTML =
    `Estimated Grade: <strong>${grade.toFixed(2)}%</strong><br>(${earned.toFixed(1)} out of 650 points)`;
}

function saveInputs() {
  const inputs = {
    exam1: document.getElementById("exam1").value,
    exam2: document.getElementById("exam2").value,
    exam3: document.getElementById("exam3").value,
    exam4: document.getElementById("exam4").value,
    finalExam: document.getElementById("finalExam").value,
    quizzes: document.getElementById("quizzes").value,
    worksheets: document.getElementById("worksheets").value,
    homeworks: document.getElementById("homeworks").value
  };
  localStorage.setItem("gradeCalcInputs", JSON.stringify(inputs));
  alert("Inputs saved!");
}

function loadInputs() {
  const inputs = JSON.parse(localStorage.getItem("gradeCalcInputs") || "{}");
  document.getElementById("exam1").value = inputs.exam1 || "";
  document.getElementById("exam2").value = inputs.exam2 || "";
  document.getElementById("exam3").value = inputs.exam3 || "";
  document.getElementById("exam4").value = inputs.exam4 || "";
  document.getElementById("finalExam").value = inputs.finalExam || "";
  document.getElementById("quizzes").value = inputs.quizzes || "";
  document.getElementById("worksheets").value = inputs.worksheets || "";
  document.getElementById("homeworks").value = inputs.homeworks || "";
  alert("Inputs loaded!");
}
