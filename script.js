document.addEventListener("DOMContentLoaded", () =>{
    //! Screens
    const introScreen = document.getElementById("intro-screen");
    const createScreen = document.getElementById("create-screen");

    //! Elements
    const creatorContainer = document.getElementById("creator-con");
    const errorMsg = document.getElementById("error-msg");
    const error = document.getElementById("error");
    
    //! Screen Changes
    const createQuizBtn = document.getElementById("create-quiz");
    createQuizBtn.addEventListener("click", (introToCreate));

    //* This function displays to the user the creation screen after clicking
    //* the create quiz button.
    function introToCreate() {
        introScreen.classList.add("inactive");
        introScreen.classList.remove("active");

        createScreen.classList.remove("inactive");
        createScreen.classList.add("active");

        createQuiz();
    }

    //* This function calls the select number of questions function
    function createQuiz() {
        selectNoOfQuestions();
    }

    const questionValue = document.querySelectorAll(".question-selection button");
    const quizBody1 = document.getElementById("body1");
    const quizBody2 = document.getElementById("body2");

    //* This function allows the user to select the number of questions
    //* that their quiz should have.

    //? Sets the initial value of the number of questions to 0
    let noOfQuestions = 0;

    function selectNoOfQuestions(){
        //? This loop adds the event listener to each button and edits the style
        //? based on which button is clicked

        for (let i = 0; i < questionValue.length; i++) {
            questionValue[i].addEventListener("click", () => {
                //? Assigns the value of the button clicked to the number of questions
                noOfQuestions = Number(questionValue[i].textContent);

                //? Sets all buttons as inactive (CSS Affected)
                for (let j = 0; j < questionValue.length; j++) {
                    questionValue[j].classList.remove("btn-active");
                }

                //? Makes the clicked button active (CSS Affected)
                questionValue[i].classList.add("btn-active");

                //? Switches from the question selection to the actual quiz body with a delay
                setTimeout(() => {
                    quizBody1.classList.add("inactive");
                    quizBody2.classList.remove("inactive");
                    enterQuestions();
                }, 1000)
            })
        }
    }

    const currentQuestion = document.getElementById("questionValue");
    const totalQuestions = document.getElementById("totalQuestions");

    //? Initialise the total questions array
    const questions = [];

    //? Initialse the current question value to display.
    let currentQuestionValue = 1;

    //* This function allows the user to enter the question and answers for the first question

    function enterQuestions(){
        //? Displays the current and total value of questions
        currentQuestion.textContent = currentQuestionValue; 
        totalQuestions.textContent = noOfQuestions;

        //? Sets the length of the array to the total number of questions
        questions.length = noOfQuestions;

        //? Displays the form if the current question is less than the array length
        if ((currentQuestionValue - 1) <= questions.length){
            displayCreatorContainer();
            // console.log("Questions Array Length: " + questions.length);
            // console.log("Current Question: " + currentQuestionValue);
            // console.log("Total Questions: " + noOfQuestions);
        }
    }

    // //* This function displays the form for the user to enter their question and its answers

    function displayCreatorContainer() {
        creatorContainer.innerHTML = `
            <span class="question-btns-con">
                <p style="flex-basis">Click to Edit a Quesiton</p>
                <span class="questions" id="question-buttons"></span>
            </span>
            <input required id="question" type="text" placeholder="Enter Question Here">
                
            <input required id="answer1" class="answer" type="text" placeholder="Answer 1">
            <input required id="answer2" class="answer" type="text" placeholder="Answer 2">
            <input required id="answer3" class="answer" type="text" placeholder="Answer 3">
            <input required id="answer4" class="answer" type="text" placeholder="Answer 4">

            <span class="correct-answer-con">
                <p>Please Identify the Correct Answer</p>
                <ul>
                    <li>
                        <label>Answer 1</label>
                        <input type="radio" value="1" name="correct-answer" class="correct-answer">
                    </li>
                    <li>
                        <label>Answer 2</label>
                        <input type="radio" value="2" name="correct-answer" class="correct-answer">
                    </li>
                    <li>
                        <label>Answer 3</label>
                        <input type="radio" value="3" name="correct-answer" class="correct-answer">
                    </li>
                    <li>
                        <label>Answer 4</label>
                        <input type="radio" value="4" name="correct-answer" class="correct-answer">
                    </li>
                </ul>
            </span>

            <span class="foot">                
                <button id="next" type="button">Next</button>
                <button id="finish" type="button" style="display: none;">Finish</button>
            </span>
        `

        const questionBtnsCon = document.getElementById("question-buttons");

        //? Adds the buttons to the container
        for (let i = 0; i < noOfQuestions; i++){
            questionBtnsCon.innerHTML +=  `
                <button type="button" class="question-btns">${i+1}</button>
            `
        }
        
        addEventListenerToNextBtn();
        addEventListenerToQuestionBtn();
    }

    //* This function adds a click event listener to the "next" button of each form.
    
    function addEventListenerToNextBtn(){
        const nextQuestion = document.getElementById("next");
        nextQuestion.addEventListener("click", () =>{
            enterNextQuestion();
        })
    }

    //* This function adds a click event listener to each question button for the user to edit their question
    function addEventListenerToQuestionBtn(){
        const questionBtns = document.querySelectorAll(".question-btns");

        for (let i = 0; i < questionBtns.length; i++){
            questionBtns[i].addEventListener("click", () =>{
                saveCurrentQuestion(currentQuestionValue);
                goToQuestion(i+1);
            })
        }
    }


    //* This function stores the input of the previous question in the array and moves
    //* on to other questions.

    function enterNextQuestion(){
        //? Get the value of everything entered for the first question
        const question = document.getElementById("question").value;
        const answer1 = document.getElementById("answer1").value;
        const answer2 = document.getElementById("answer2").value;
        const answer3 = document.getElementById("answer3").value;
        const answer4 = document.getElementById("answer4").value;
        const correctAnswerChosen = document.querySelector('input[name="correct-answer"]:checked')?.value || null; 

        if (correctAnswerChosen === null){
            errorMsg.classList.remove("inactive");
            errorMsg.classList.add("active");
            error.innerHTML = "Please Identify the Correct Answer";

            setTimeout(() =>{
                errorMsg.classList.add("inactive");
                errorMsg.classList.remove("active");
            }, 1500);

            return;
        }

        //? Add the previous question and answers to the array.
        questions[currentQuestionValue - 1] = {
            questionEntered: question,
            answers:[
                answer1,
                answer2,
                answer3,
                answer4
            ],
            correctAnswer: correctAnswerChosen
        }

        // console.log(questions);
        console.log(questions);
        // console.log(questions[currentQuestionValue - 1]);

        //? 1 second delay
        setTimeout(() =>{
            //? Checks if the user is on the last question
            if (currentQuestionValue === questions.length){
                const nextQuestion = document.getElementById("next");
                const finishQuiz = document.getElementById("finish");

                nextQuestion.style.display = "none";
                finishQuiz.style.display = "block";
                completeQuiz();
                return;
            }
            else{
                //? Adds 1 to the current question value and calls the enterQuestions()
                //? function to repeat the cycle for the remaining questions.
                currentQuestionValue++;
                enterQuestions();
            }
        }, 1000);
    }

    //* This function allows the user to go to a previous question to edit it.

    function goToQuestion(qNum) {
        //? Checks if the current question was clicked. If so, the form remains the same
        if (currentQuestionValue === qNum){
            creatorContainer.innerHTML = `
                <span class="question-btns-con">
                    <p style="flex-basis">Click to Edit a Quesiton</p>
                    <span class="questions" id="question-buttons"></span>
                </span>
                <input required id="question" type="text" placeholder="Enter Question Here">
                
                <input required id="answer1" class="answer" type="text" placeholder="Answer 1">
                <input required id="answer2" class="answer" type="text" placeholder="Answer 2">
                <input required id="answer3" class="answer" type="text" placeholder="Answer 3">
                <input required id="answer4" class="answer" type="text" placeholder="Answer 4">

                <span class="correct-answer-con">
                    <p>Please Identify the Correct Answer</p>
                    <ul>
                        <li>
                            <label>Answer 1</label>
                            <input type="radio" value="1" name="correct-answer" class="correct-answer">
                        </li>
                        <li>
                            <label>Answer 2</label>
                            <input type="radio" value="2" name="correct-answer" class="correct-answer">
                        </li>
                        <li>
                            <label>Answer 3</label>
                            <input type="radio" value="3" name="correct-answer" class="correct-answer">
                        </li>
                        <li>
                            <label>Answer 4</label>
                            <input type="radio" value="4" name="correct-answer" class="correct-answer">
                        </li>
                    </ul>
                </span>

                <span class="foot">
                    <button id="next" type="button">Next</button>
                    <button id="finish" type="button" style="display: none;">Finish</button>
                </span>
            `
            addQuestionBtns();
            addEventListenerToNextBtn();
            addEventListenerToQuestionBtn();
            currentQuestionValue = qNum;
            currentQuestion.textContent = qNum;

            // console.log("Current Question:" + currentQuestionValue);
            // console.log("Question On Right Now:" + qNum);
            // console.log(questions);
        }
        else{   
            //? Checks if the question is not question 1, and if the question clicked on has content in it
            if (qNum > 1 && (!questions[qNum - 2] || !questions[qNum - 2].questionEntered)){
                const btn = document.querySelector(`.question-btns:nth-child(${qNum})`);

                //? Not Allowed/Error Indicator (CSS Affected)
                if (btn){
                    btn.classList.add("error");
                    
                    setTimeout(() => {
                        btn.classList.remove("error");
                    }, 1000);
                }

                return;
            }
            else{
                //? Displays form with saved data.
                creatorContainer.innerHTML = `
                    <span class="question-btns-con">
                        <p style="flex-basis">Click to Edit a Quesiton</p>
                        <span class="questions" id="question-buttons"></span>
                    </span>

                    <input required id="question" type="text" placeholder="Enter Question Here" value="${questions[qNum-1]?.questionEntered || ""}">
                
                    <input required id="answer1" class="answer" type="text" placeholder="Answer 1" value="${questions[qNum-1]?.answers[0] || ""}">
                    <input required id="answer2" class="answer" type="text" placeholder="Answer 2" value="${questions[qNum-1]?.answers[1] || ""}">
                    <input required id="answer3" class="answer" type="text" placeholder="Answer 3" value="${questions[qNum-1]?.answers[2] || ""}">
                    <input required id="answer4" class="answer" type="text" placeholder="Answer 4" value="${questions[qNum-1]?.answers[3] || ""}">

                    <span class="correct-answer-con">
                        <p>Please Identify the Correct Answer</p>
                        <ul>
                            <li>
                                <label>Answer 1</label>
                                <input type="radio" value="1" name="correct-answer" class="correct-answer" ${questions[qNum - 1]?.correctAnswer === "1" ? "checked" : ""}>
                            </li>
                            <li>
                                <label>Answer 2</label>
                                <input type="radio" value="2" name="correct-answer" class="correct-answer" ${questions[qNum - 1]?.correctAnswer === "2" ? "checked" : ""}>
                            </li>
                            <li>
                                <label>Answer 3</label>
                                <input type="radio" value="3" name="correct-answer" class="correct-answer" ${questions[qNum - 1]?.correctAnswer === "3" ? "checked" : ""}>
                            </li>
                            <li>
                                <label>Answer 4</label>
                                <input type="radio" value="4" name="correct-answer" class="correct-answer" ${questions[qNum - 1]?.correctAnswer === "4" ? "checked" : ""}>
                            </li>
                        </ul>
                    </span>

                    <span class="foot">
                        <button id="next" type="button">Next</button>
                        <button id="finish" type="button" style="display: none;">Finish</button>
                    </span>
                `
            }
            
            addQuestionBtns();

            addEventListenerToNextBtn();
            addEventListenerToQuestionBtn();

            currentQuestionValue = qNum;
            currentQuestion.textContent = qNum;

            //console.log("Current Question:" + currentQuestionValue);
            //console.log("Question On Right Now:" + qNum);
            //console.log(questions);
        }
    }

    //* This function adds the question buttons to the form.

    function addQuestionBtns(){
        const questionBtnsCon = document.getElementById("question-buttons");

        questionBtnsCon.innerHTML = "";

        for (let i = 0; i < noOfQuestions; i++){
            questionBtnsCon.innerHTML +=  `
            <button type="button" class="question-btns">${i+1}</button>
                `
        }
    }

    //* This function saves the current question before the user moves to a previous question.

    function saveCurrentQuestion(qNum){ 
        const question = document.getElementById("question").value;
        const answer1 = document.getElementById("answer1").value; 
        const answer2 = document.getElementById("answer2").value; 
        const answer3 = document.getElementById("answer3").value; 
        const answer4 = document.getElementById("answer4").value; 
        const correctAnswerChosen = document.querySelector('input[name="correct-answer"]:checked')?.value || null; 
            
        //console.log("Saving question and answers from question: " + qNum-1); 
        questions[qNum-1] = { 
            questionEntered: question, 
            answers: [ 
                answer1, 
                answer2, 
                answer3, 
                answer4 
            ],
            correctAnswer: correctAnswerChosen
        } 
        console.log(questions[qNum-1]); 
    }

    const completedScreen = document.getElementById("completed-screen");

    function completeQuiz(){
        const finishQuiz = document.getElementById("finish");

        finishQuiz.addEventListener("click", () =>{
            createScreen.classList.add("inactive");
            createScreen.classList.remove("active");

            completedScreen.classList.remove("inactive");
            completedScreen.classList.add("active");

            getQuizDetails();
        })
    }

    let quiz = {};

    function getQuizDetails(){
        const submitQuiz = document.getElementById("submit-quiz");

        submitQuiz.addEventListener("click", () =>{
            const quizName = document.getElementById("quiz-name").value;
            const author = document.getElementById("author").value;

            if ((quizName === "" || quizName === null) || (author === "" || author === null)){
                errorMsg.classList.remove("inactive");
                errorMsg.classList.add("active");
                error.innerHTML = "Please fill all fields."

                setTimeout(() =>{
                    errorMsg.classList.add("inactive");
                    errorMsg.classList.remove("active");
                }, 1500);
                return;
            }
            else{
                console.log("Quiz Name: " + quizName);
                console.log("Made By: " + author);

                quiz = {
                    title: quizName,
                    quizAuthor: author,
                    quizQuestions: questions
                };

                localStorage.setItem("quiz", JSON.stringify(quiz));
            
                setTimeout(() =>{
                    window.location.href = "/quiz.html"
                })
            }
        })
    }
})
