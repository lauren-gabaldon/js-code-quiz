var startButton = document.getElementById("startGame");
var nextButton = document.getElementById("next-btn");
var shuffledQuestions, currentQuestionIndex;
var quizContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
// var answers = document.getElementById("answer-buttons");
var answerButtonsElement = document.getElementById("answer-buttons");
var score = 0;
var timeClock = document.getElementById("timer");
var timeLength = 60;
var questions = [
  {
    question: "Which coding language provides functionality to a web page?",
    answers: [
      { text: "Javascript", correct: true },
      { text: "HTML", correct: false },
      { text: "CSS", correct: false },
    ],
  },
  {
    question: "What 2 scopes do variables have?",
    answers: [
      { text: "internal, external", correct: false },
      { text: "global, local", correct: true },
      { text: "here,there", correct: false },
    ],
  },
  {
    question: "Is Java the same as Javascript?",
    answers: [
      { text: "Absolutely, Java is slang", correct: false },
      { text: "LOL.No", correct: true },
      { text: "Java isn't coffee?!", correct: false },
    ],
  },
  {
    question: "What symbol comes after console.log?",
    answers: [
      { text: "Parens", correct: true },
      { text: "curly bracket", correct: false },
      { text: "semicolon", correct: false },
    ],
  },
];
console.log(startButton);
startButton.addEventListener("click", startGame);

function startGame() {
  console.log("started");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  showQuestion(shuffledQuestions[currentQuestionIndex]);

  setTime();
}

function setNextQuestion(event) {
  console.log(event);
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;
  if (correct === "true") {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function showQuestion(arrQuestion) {
  resetState();
  questionElement.textContent = arrQuestion.question;
  for (var i = 0; i < arrQuestion.answers.length; i++) {
    var button = document.createElement("button");
    button.textContent = arrQuestion.answers[i].text;
    button.classList.add("btn");
    if (arrQuestion.answers[i].correct) {
      button.dataset.correct = arrQuestion.answers[i].correct;
    }

    answerButtonsElement.appendChild(button);
    button.addEventListener("click", setNextQuestion);
  }
}

function setTime() {
  timeClock.textContent = "Time Remaining: " + timeLength;
  var timerInterval = setInterval(function () {
    timeLength--;
    timeClock.textContent = "Time Remaining: " + timeLength;
    if (timeLength <= 0) {
      clearInterval(timerInterval);
      timeClock.textContent = "Time Remaining: 0";
    }
  }, 1000);
}
