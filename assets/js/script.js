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

var gameOver = function() {
    
}
