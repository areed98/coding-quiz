// Global Variable declarations
var startQuizEl = document.querySelector("#quizStart");
var mainEl = document.getElementById("content");
var flexEl = document.getElementById("flexcontainer");
var time = document.getElementById("#time");
var pEl = document.getElementById("p");
var countdown = 60;
var buttonID = 0;
var questionID = 0;
var highscoreEl = document.querySelector(".hscore");

// Set high score array
var scores = [];

// Question array for every quiz question stored
var questionArray = [

    {
        title: "Commonly used data types do NOT include:",
        answer0: "strings",
        answer1: "booleans",
        answer2: "numbers",
        answer3: "styles",
        correctAns: 3
    },

    {
        title: "Javascript is used for what?",
        answer0:"Creating loops",
        answer1:"Writing functions",
        answer2:"Create html elements",
        answer3:"All of the above",
        correctAns: 3
    },

    {
        title: "What can you use to help debug code in the console?",
        answer0:"Curly brackets",
        answer1:"For loops",
        answer2:"Console.log",
        answer3:"None of the Above",
        correctAns: 2
    },

    {
        title: "What is used to close a section in html?",
        answer0:"</sectionid>",
        answer1:"<sectionid>",
        answer2:"</>",
        answer3:"(/sectionid)",
        correctAns: 0
    },

    {
        title: "What does CSS stand for?",
        answer0:"Creative Style sheets",
        answer1:"Cascading Style Sheets",
        answer2:"Coloring Style Sheets",
        answer3:"None of the above",
        correctAns: 1
    },

    {
        title: "How do you comment in html?",
        answer0:"/* Comment */",
        answer1:"// Comment",
        answer2:"<!-- Comment -->",
        answer3:"## Comment",
        correctAns: 2
    },

    {
        title: "The condition of an If/Else Statement is closed with:",
        answer0:"Parenthesis",
        answer1:"Curly Brackets",
        answer2:"Square Brackets",
        answer3:"Quotations",
        correctAns: 0
    },

    {
        title: "To create a git repository, what is the first step?",
        answer0:"git commit",
        answer1:"git init",
        answer2:"git add",
        answer3:"git push",
        correctAns: 1 
    },

    {
        title: "What can arrays in javascript store?",
        answer0:"Numbers & Strings",
        answer1:"Booleans",
        answer2:"Other Arrays",
        answer3:"All of the above",
        correctAns: 3
    },

    {
        title: "What filetype is a README normally stored as?",
        answer0:"Markdown",
        answer1:"JavaScript",
        answer2:"HTML",
        answer3:"CSS",
        correctAns: 0
    }
];

var timerInterval = {};

// Function to set up and initialize the quiz
var startQuiz = function () {
    // Clears the current elements to create space for questions
    var container = document.querySelector("#begin");
    container.remove();

    // Resets initial information
    countdown = 60;
    buttonID = 0;
    questionID = 0;

    // Interval function to run every 1000 milliseconds
    timerInterval.interval = setInterval(timer, 1000);

    // Set text content for time
    time.textContent = "Time: 60";

    // Initialize future questionConstructor function to ask questions
    questionConstructor(questionArray[questionID]);

};


// Timer function logic
var timer = function() {
    //If time is above zero, decrease and display current time.
    if (counter > 0) {
        counter--;
        time.textContent = ("Time: " + counter);

        // Check if time = 0
        checkTime();

    // If timer is below 1, then stop time and set text.    
    } else {
        time.textContent = "Time: 0";
        clearInterval(timerInterval.interval);
    }

};

// Check if time is zero
var checkTime = function() {

    // If zero, run the future gameOver function.
    if (counter == 0) {
        gameOver();
    };

};

// questionConstructor function for pushing the questions onto the page.  Uses above array.
var questionConstructor = function(question) {

    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var divEl = document.createElement("div");

    h2El.textContent = question.title;

    sectionEl.setAttribute("id", "container");

    // for loop to create button(s)
    for (var i = 0; i < 4; i++) {
        // Element created
        var buttonEl = document.createElement("button");

        // Sets text content
        buttonEl.textContent = question["Answer" + i];

        // ID changed
        buttonEl.setAttribute("id", buttonID);

        // Class set
        buttonEl.className = "answer";

        // ID increased
        buttonID++;

        //Appends element
        divEl.appendChild(buttonEl);
    }

    // Other elements appended
    sectionEl.appendChild(h2El);

    sectionEl.appendChild(divEl);

    flexEl.appendChild(sectionEl);

    // Reset button ID to 0
    buttonID = 0;


};

// check for final question
var finalQuestion = function(event) {

    // Created after the questionChecker, this is to make sure there are no errors
    // and that the quiz will stop after the final question.
    var correctAns = questionArray[questionID].correctAns;
    match = event.match;

    // Set the finalquestionID to the questions array length minus 1 so that we execute logic on the final question,
    // rather than AFTER the final question.
    finalQuestionID = questionArray.length - 1;

    if (questionID === finalQuestionID) {

        clearInterval(timerInterval.interval);

        if (match.classList.contains("answer")) {

            var correctAnswer = document.getElementById(correctAns);

            if (match === correctAnswer) {

                gameOver();
            } else {
                if (counter > 10) {
                    counter = counter - 10;
                    time.textContent = ("Time: " + counter);
                    gameOver();
                } else {
                    counter = 0; 
                    time.textContent = "Time: 0";
                    gameOver();
                }
            }
        }
    }


};


// Create logic for if the correct answer is chosen.
var questionChecker = function(match) {

    // Pull correctAns from array
    var correctAns = questionArray[questionID].correctAns;

    // Correct display function
    var correctDisplay = function() {
        flexEl.style.borderBottom = "2px solid green";
        pEl.textContent = "Correct!";
        pEl.className = "Correct";
    }

    // Incorrect display function
    var incorrectDisplay = function() {
        flexEl.style.borderBottom = "2px solid red";
        pEl.textContent = "Incorrect!";
        pEl.className = "Incorrect";
    }

    // Append
    mainEl.appendChild(pEl);

    // Check to see if we clicked answer
    if (match.classList.contains("answer")) {

        // Match up the ID to correctAns
        var correctAnswer = document.getElementById(correctAns);

        // Checks for a correct button press
        if (match === correctAnswer) {

            // Increments
            questionID++

            // Removes elements on page
            container.remove();

            // Calls the constructor function again
            questionConstructor(questionArray[questionID]);

            // Display the correct text
            correctDisplay();

        // If answer is incorrect run else statement
        } else {

            // Display incorrect text
            incorrectDisplay();

            // Check for the time, if we are below 10 seconds then we must end the quiz.
            if (counter > 10) {

                // Subtract from counter
                counter = counter - 10;

                // Set time text
                time.textContent = ("Time: " + counter);

                // Run the same functions as the correct if.
                questionID++

                container.remove();

                questionConstructor(questionArray[questionID]);

            // If counter is below 10, end game and prevent from going below 0.
            } else {
                counter = 0;

                time.textContent = "Time: 0";

                container.remove();

                // Run gameOver function to send user to the end screen
                gameOver();
            }
        }
    }
};


// Logic to send user to end screen
var gameOver = function() {

    // Element generation
    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var h3El = document.createElement("h3");
    var formEl = document.createElement("form");
    var labelEl = document.createElement("label");
    var inputEl = document.createElement("input");
    var submitEl = document.createElement("input");

    // Set Attributes to elements
    sectionEl.setAttribute("id", "gameOverScreen");
    h2El.setAttribute("id", "gameOverScreenTitle");
    h3El.setAttribute("id", "gameOverScreenSub");
    labelEl.setAttribute("for", "intitials");
    inputEl.setAttribute("id", "intials");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("value", "submit");
    submitEl.setAttribute("id", "submit");

    // Set text content
    h2El.textContent = "All done!";
    h3El.textContent = "Your final score is " + counter + "!";
    labelEl.textContent = "Enter Initials!";

    // Append elements
    formEl.appendChild(labelEl);
    formEl.appendChild(inputEl);
    formEl.appendChild(submitEl);
    sectionEl.appendChild(h2El);
    sectionEl.appendChild(h3El);
    sectionEl.appendChild(formEl);
    flexEl.appendChild(sectionEl);

    // Remove bottom correct/incorrect border and p element
    flexEl.style.borderBottom = "none";
    pEl.remove();

    // Submit button listener
    formEl.addEventListener("Submit", function(event) {

        var input = document.getElementById("initials").value

        // Validate input
        if (input === null || input === "" || input.length > 3) {

            alert("Please input initials.");

            formEl.reset();

        // If user inputs proper initials, push values into an object and then into a score array
        } else {
            var score = counter;

            var userValues = {
                userName: input,
                userScore: score
            }

            scores.push(userValues);
            // saves scores
            saveScores()
            // resets inputs
            formEl.reset();
            // Go to high score page
            highScorePage();
        };


    });
};

// Logic for high score page
var highScorePage = function() {

    // remove both timer and high scores page link
    if (document.getElementById("time")) {
        var timeEl = document.getElementById("time");
        timeEl.textContent = "";
    }

    if (document.querySelector(".hscore")) {
        var viewHS = document.querySelector(".hscore");
        viewHS.textContent = "";
        viewHS.removeEventListener("click", highScorePage);
        viewHS.addEventListener("click", homePage);
    }

    // If on game over screen, remove element first
    if (document.getElementById("gameOverScreen")) {
        var OverEl = document.getElementById("gameOverScreen");
        OverEl.remove();
    }

    if (document.getElementById("begin")) {
        var beginEl = document.getElementById("begin");
        beginEl.remove();
    }

    // Create elements
    var sectionEl = document.createElement("section");
    var h2El = document.createElement("h2");
    var divEl1 = document.createElement("div");
    var divEl2 = document.createElement("div");
    var button1 = document.createElement("button");
    var button2 = document.createElement("button");

    // Run a for loop to create an element for each high score
    for (var i = 0; i < scores.length; i++) {

        // Create element
        var scoreEl = document.createElement("p");

        // Set text
        scoreEl.textContent = (i + 1) + "." + scores[i].userName + " - " + scores[i].userScore;

        // give class of score
        scoreEl.setAttribute("class", "score");

        // append
        divEl1.appendChild(scoreEl);
    }


    // Attribute set
    sectionEl.setAttribute("id", "scoreboard");
    h2El.setAttribute("id", "scoreboardTitle");
    divEl1.setAttribute("class", "scores");
    divEl2.setAttribute("class", "scoreDiv2");
    button1.setAttribute("class", "scoreButton");
    button2.setAttribute("class", "scoreButton");

    // set text content
    h2El.textContent = "High Scores:";
    button1.textContent = "Go back";
    button2.textContent = "Clear High Scores";

    // Append
    divEl1.appendChild(button1);
    divEl2.appendChild(button2);
    sectionEl.appendChild(h2El);
    sectionEl.appendChild(divEl1);
    sectionEl.appendChild(divEl2);
    flexEl.appendChild(sectionEl);

    // Add event listeners for buttons
    button1.addEventListener("click", homePage);
    button2.addEventListener("click", clearScores);

};

// Logic to save scores
var saveScores = function() {

    sortScores();

    localStorage.setItem("scores", JSON.stringify(scores));

};

// Logic to load scores
var loadScores = function() {

    //use local storage to find "scores"
    var savedScores = localStorage.getItem("scores");

    // if empty, return
    if (!savedScores) {
        return false;
    }

    // parse contents back into array
    savedScores = JSON.parse(savedScores);

    for (var i = 0;  i < savedScores.length; i++) {
        scores.push(savedScores[i]);
    }

    sortScores();

};

// function to sort the scores
var sortScores = function() {

    scores.sort((a, b) => b.userScore - a.userScore);
};

// logic to clear scores
var clearScores = function() {

    scores = [];

    localStorage.setItem("scores", scores);

    if (document.getElementById("scoreboard")) {
        var scoreboard = document.getElementById("scoreboard");
        scoreboard.remove();
    }

    highScorePage();
};

//load scores from local storage
loadScores();

