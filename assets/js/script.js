// Global Variable declarations
var startQuizEl = document.querySelector("#quizStart");
var mainEl = document.getElementById("content");
var flexEl = document.getElementById("flexcontainer");
var timer = document.getElementById("#time");
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
]