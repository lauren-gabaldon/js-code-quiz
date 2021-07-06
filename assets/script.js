var startButton = document.getElementById("startGame");
var nextButton = document.getElementById("next-btn");
let shuffledQuestions;
var quizContainer = document.getElementById("question-container");
var questionElement = document.getElementById("question");
let currentQuestionIndex = 0;
let answerButtonsElement = document.querySelector("#answer-buttons");
let score = 0;
var timeClock = document.getElementById("timer");
let timeLength = 60;
let intervalId;
let highScores = [];

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

startButton.addEventListener("click", startGame);

function startGame() {
  console.log("started");
  //read high scores from local storage
  if (localStorage.getItem("highScores")) {
    highScores = JSON.parse(localStorage.getItem("highScores"));
  }

  shuffledQuestions = shuffle(questions);
  currentQuestionIndex = 0;
  showQuestion(shuffledQuestions[currentQuestionIndex]);

  startTimer();
}
const shuffle = (array) => {
  var currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function checkAnswer(event) {
  var selectedButton = event.target;
  var correct = !!selectedButton.dataset.correct;
  if (correct === true) {
    console.log("correct answer");
    score++;
  } else {
    console.log("wrong answer");
    timeLength = timeLength - 5;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    stopTimer();
    saveHighScore();
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

    button.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    answerButtonsElement.appendChild(button);
  }
}

function startTimer() {
  timeClock.textContent = "Time Remaining: " + timeLength;
  intervalId = setInterval(function () {
    timeLength--;
    timeClock.textContent = "Time Remaining: " + timeLength;
    if (timeLength <= 0) {
      stopTimer();
      timeClock.textContent = "Time Remaining: 0";
      saveHighScore();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function saveHighScore() {
  //TODO: prompt user for initials

  let initials;

  //create new highScore object
  let newHighScore = {
    userInitials: initials || "",
    score: score,
  };

  if (highScores.constructor === Array) {
    //add new highScore object to highScores array
    highScores.push(newHighScore);
    //save highScores array to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

//code quiz
//Time based multiple choice quiz for 60 seconds
//Each question has 3 answers only one is correct
//timer starts for 60 seconds at start button click
//first question is presented with associated answers
//if user answers correctly, user gets 1 point if user gets incorrect 5 seconds deducted from timer
//regardless of outcome, you show next question
//repeat process until all questions have been answered OR timer ends

//DATA / STRUCTURE
// 4 questions, each question has 3 answers
