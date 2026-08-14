document.addEventListener("DOMContentLoaded", () => {
    //! Import object from script.js
    const quiz = JSON.parse(localStorage.getItem("quiz"));
    // console.log(quiz.title);
    // console.log(quiz.quizAuthor);
    // console.log(quiz.quizQuestions);

    //? Changes the document title
    document.title = `${quiz.title} | Quiz Creator`;

    //! Elements
    const welcomeText = document.getElementById("welcome-txt");
    const quizAuthor = document.getElementById("author");
    const currentQuestion = document.getElementById("current-question");
    const beginBtn = document.getElementById("begin");
    const introScreen = document.getElementById("intro-screen");
    const questionScreen = document.getElementById("question-screen");
    const nextBtn = document.getElementById("next");
    const completionScreen = document.getElementById("completed-screen");
    const scoreAmt = document.getElementById("score-amt");
    const totalAmt = document.getElementById("total-amt");
    const completionMsg = document.getElementById("completion-msg");
    const restartBtn = document.getElementById("restart");
    const quizName = document.getElementById("quiz-name");

    //? Display welcome text and author name
    welcomeText.innerHTML = `Welcome to the ${quiz.title}`;
    quizAuthor.innerHTML = `Made By ${quiz.quizAuthor}`;
    quizName.innerHTML = `${quiz.title}`;

    let currentQuestionValue = 1;
    let currentQuestionIndex = 0;

    beginBtn.addEventListener("click", () => {
        introScreen.classList.add("inactive");
        introScreen.classList.remove("active");

        questionScreen.classList.add("active");
        questionScreen.classList.remove("inactive");

        displayQuestion(currentQuestionIndex, currentQuestionValue);
        displayAnswers(currentQuestionIndex);
    })

    //* This function takes in the current question and it's array index
    //* to display the question to the user.
    function displayQuestion(currIndex, currQuestion) {
        //? Displays the current question
        currentQuestion.innerHTML = currQuestion;

        const question = document.getElementById("question");
        question.textContent = quiz.quizQuestions[currIndex].questionEntered;
    }


    //* This function takes in the current question index and displays the
    //* answers for that question to the user.
    function displayAnswers(currIndex) {
        const answers = document.querySelectorAll(".answer-btn");

        for (let i = 0; i < answers.length; i++) {
            answers[i].textContent = quiz.quizQuestions[currIndex].answers[i];
            //console.log(answers[i]);
        }
    }

    const answerBtns = document.querySelectorAll(".answer-btn");
    let answerClicked;

    //? Changes the style of an answer when selected.
    for (let i = 0; i < answerBtns.length; i++) {
        answerBtns[i].addEventListener("click", () => {

            for (let j = 0; j < answerBtns.length; j++) {
                answerBtns[j].classList.remove("selected");
            }

            answerBtns[i].classList.add("selected");

            answerClicked = i + 1;
            checkAnswer(answerClicked, answerBtns[i]);
        })
    }

    let correctCount = 0;
    let isCorrect = false;
    let selectedAnswerBtn = null;

    //* This function takes in the value of the selected answer and the answer index
    //* and determines if the answer is correct or not.
    function checkAnswer(answerChosen, button) {
        const correctAnswer = Number(quiz.quizQuestions[currentQuestionIndex].correctAnswer);
        const answerBtns = document.querySelectorAll(".answer-btn");

        selectedAnswerBtn = button;

        if (answerChosen === correctAnswer) {
            //console.log("correct");
            isCorrect = true;
        }
        else {
            //console.log("wrong");
            isCorrect = false;
        }
    }

    //? Adding the event listener to the "next" button.

    nextBtn.addEventListener("click", () => {
        //? If the user clicks the next button without selecting an answer, nothing happens.
        if (selectedAnswerBtn === null) {
            return;
        }

        if (isCorrect === true) {
            correctCount++;
        }

        //? Show correct/wrong colour
        selectedAnswerBtn.classList.remove("selected");

        if (isCorrect === true) {
            selectedAnswerBtn.classList.add("correct");
        }
        else {
            selectedAnswerBtn.classList.add("wrong");
        }

        setTimeout(() => {
            //? Checks if this is the last question
            if (currentQuestionIndex >= quiz.quizQuestions.length - 1) {
                setTimeout(() => {
                    //console.log("done");
                    displayCompletionScreen();
                }, 1000);
                return;
            }

            currentQuestionIndex++;
            currentQuestionValue++;

            //? Reset colours
            selectedAnswerBtn.classList.remove("correct");
            selectedAnswerBtn.classList.remove("wrong");

            //? Go to next question
            displayQuestion(currentQuestionIndex, currentQuestionValue);
            displayAnswers(currentQuestionIndex);

            selectedAnswerBtn = null;
            isCorrect = false;
        }, 1500)
    })

    //* This function displays the completion screen to the user after completing the quiz.
    function displayCompletionScreen() {
        questionScreen.classList.remove("active");
        questionScreen.classList.add("inactive");

        completionScreen.classList.add("active");
        completionScreen.classList.remove("inactive");

        //? Displays the correct score and the total amount.
        scoreAmt.textContent = correctCount;
        totalAmt.textContent = currentQuestionValue;

        //? Calculating score percentage
        let scorePercentage = (Number(scoreAmt.textContent) / Number(totalAmt.textContent)) * 100;
        //console.log(scorePercentage)

        //? Deciding completion message based on the score percentage
        if (scorePercentage === 0) {
            completionMsg.textContent = "Better luck next time! Don't give up, give it another shot."
        }
        else if (scorePercentage <= 20) {
            completionMsg.textContent = "Keep practicing! Every attempt is a step toward getting better."
        }
        else if (scorePercentage <= 40) {
            completionMsg.textContent = "You're getting there! A little more practice and you'll improve."
        }
        else if (scorePercentage <= 60) {
            completionMsg.textContent = "Not bad! You have a good start, keep pushing!"
        }
        else if (scorePercentage <= 80) {
            completionMsg.textContent = "Great job! You know quite a bit, but there's still room to improve!"
        }
        else if (scorePercentage < 100) {
            completionMsg.textContent = "Excellent work! You were so close to a perfect score!"
        }
        else if (scorePercentage === 100) {
            completionMsg.textContent = "Perfect score! Outstanding work, you got every question right!"
        }
    } 

    restartBtn.addEventListener("click", () =>{
        restartQuiz();
    })

    //* This function resets all necessary variables, removes any indication changes and displays
    //* the welcome screen again for the user to do the quiz once more.

    function restartQuiz(){
        correctCount = 0;
        currentQuestionIndex = 0;
        currentQuestionValue = 1;
        selectedAnswerBtn = null;
        isCorrect = false;

        for (let i = 0; i < answerBtns.length; i++){
            answerBtns[i].classList.remove("correct");
            answerBtns[i].classList.remove("wrong");
            answerBtns[i].classList.remove("selected");
        }

        completionScreen.classList.remove("active");
        completionScreen.classList.add("inactive");

        introScreen.classList.add("active");
        introScreen.classList.remove("inactive");
    }
})