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
  let examPossible = 0;

  if (exams.length > 0) {
    exams.sort((a, b) => a - b); // ascending to get the lowest
    const lowest = exams[0];
    const rest = exams.slice(1);

    if (lowest !== undefined) {
      halfExam = lowest * 0.5;
      examPossible += 50;
    }
    if (rest.length > 0) {
      topExams = rest.reduce((sum, score) => sum + score, 0) * 1.5;
      examPossible += rest.length * 100 * 1.5;
    }
  }

  const finalExamPts = finalExam !== null ? finalExam * 2 : 0;
  const finalExamPossible = finalExam !== null ? 200 : 0;

  function parseAssignment(id, sectionTotal) {
    const values = document.getElementById(id).value
      .split(',')
      .map(v => parseScore(v))
      .filter(v => v !== null);
    const sum = values.reduce((a, b) => a + b, 0);
    const max = values.length * 10;
    const actualTotal = values.length * 10;
    return {
      earned: actualTotal > 0 ? sum : 0,
      possible: actualTotal > 0 ? actualTotal : 0,
      weight: sectionTotal
    };
  }

  const quiz = parseAssignment("quizzes", 50);
  const worksheet = parseAssignment("worksheets", 20);
  const homework = parseAssignment("homeworks", 30);

  const assignmentEarned = quiz.possible + worksheet.possible + homework.possible > 0
    ? (quiz.earned / quiz.possible) * quiz.weight
      + (worksheet.earned / worksheet.possible) * worksheet.weight
      + (homework.earned / homework.possible) * homework.weight
    : 0;

  const assignmentPossible = (quiz.possible > 0 ? quiz.weight : 0)
    + (worksheet.possible > 0 ? worksheet.weight : 0)
    + (homework.possible > 0 ? homework.weight : 0);

  const earned = topExams + halfExam + finalExamPts + assignmentEarned;
  const possible = examPossible + finalExamPossible + assignmentPossible;

  const grade = possible > 0 ? (earned / possible) * 100 : 0;

  document.getElementById("result").innerHTML =
    `Estimated Grade: <strong>${grade.toFixed(2)}%</strong><br>(${earned.toFixed(1)} out of ${possible.toFixed(1)} possible points)`;
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
