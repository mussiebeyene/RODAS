function calculateGrade() {
  const exam1 = parseFloat(document.getElementById("exam1").value || 0);
  const exam2 = parseFloat(document.getElementById("exam2").value || 0);
  const finalExam = parseFloat(document.getElementById("finalExam").value || 0);

  const quizzes = document.getElementById("quizzes").value.split(',').map(Number).filter(n => !isNaN(n));
  const worksheets = document.getElementById("worksheets").value.split(',').map(Number).filter(n => !isNaN(n));
  const homeworks = document.getElementById("homeworks").value.split(',').map(Number).filter(n => !isNaN(n));

  const examScores = [exam1, exam2].sort((a, b) => b - a);
  const topExamPts = examScores.reduce((sum, val) => sum + val, 0) * 1.5;
  const lowestExamPts = examScores.length >= 1 ? examScores[examScores.length - 1] / 2 : 0;

  const finalExamPts = finalExam * 2;

  const quizPts = (quizzes.reduce((a, b) => a + b, 0) / (quizzes.length * 10)) * 50;
  const worksheetPts = (worksheets.reduce((a, b) => a + b, 0) / (worksheets.length * 10)) * 20;
  const homeworkPts = (homeworks.reduce((a, b) => a + b, 0) / (homeworks.length * 10)) * 30;

  const earned = topExamPts + lowestExamPts + quizPts + worksheetPts + homeworkPts + finalExamPts;
  const total = 650;

  const grade = (earned / total) * 100;

  document.getElementById("result").innerHTML =
    `Estimated Grade: <strong>${grade.toFixed(2)}%</strong><br>(${earned.toFixed(1)} out of 650 points)`;
}

function saveInputs() {
  const inputs = {
    exam1: document.getElementById("exam1").value,
    exam2: document.getElementById("exam2").value,
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
  document.getElementById("finalExam").value = inputs.finalExam || "";
  document.getElementById("quizzes").value = inputs.quizzes || "";
  document.getElementById("worksheets").value = inputs.worksheets || "";
  document.getElementById("homeworks").value = inputs.homeworks || "";
  alert("Inputs loaded!");
}