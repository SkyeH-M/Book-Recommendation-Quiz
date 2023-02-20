/*
1) DONE- return array of letters whose buttons have been clicked 
2) DONE- when answer button is clicked move onto displayNextQuestion question
3) DONE- restart empties the genreArray arr
4) DONE- prev function returns to previous page
4i) POSTPONED- prev function removes last option selected so user can't select A, click previous, and click B- this currently would result in genreArray = ['A', 'B']
5) DONE?- ensure that submit can only be pressed once user has answered all questions, hide submit until genreArray === 10?
6) DONE- user cannot be accessed in the displayGenre function (was declared in func)
7) DONE- Once user goes through the quiz, gets a result, and clicks restart, their displayNextQuestion result will not display an img unless page is refreshed
8) DONE- img displays on laptop but appears with a question mark for mobile (fixed file path to relative)
9) DONE- Form submit won't hide after submission if you press enter, not click button
10) DONE- Username value is always one value behind, if you enter 1, it'll say null, then enter 2, it'll say 1, etc
*/


/* Genres:
A- Non-Fiction
B- Horror
C- Classics
D- Modern Fiction
*/

const GENRE_MAP = {
    A: {
        name: "Non-Fiction",
        imgSrc: "assets/images/non-fiction.webp",
    },
    B: {
        name: "Horror",
        imgSrc: "assets/images/horror.webp",
    },
    C: {
        name: "Classics",
        imgSrc: "assets/images/classics.webp",
    },
    D: {
        name: "Modern Fiction",
        imgSrc: "assets/images/modern-fiction.webp",
    },
};

let questions = [
    {
        question: "Which genre do you read most frequently?",
        answers: [
            { option: "Non-Fiction", correspondingGenre: "A" },
            { option: "Horror", correspondingGenre: "B" },
            { option: "Classics", correspondingGenre: "C" },
            { option: "Modern Fiction", correspondingGenre: "D" },
        ],
    },
    {
        question: "Which of the following appeals most to you?",
        answers: [
            { option: "I want to learn something", correspondingGenre: "A" },
            { option: "I want to be intrigued", correspondingGenre: "B" },
            { option: "I want to be transported to another time", correspondingGenre: "C" },
            { option: "I want something that relates to my life", correspondingGenre: "D" },
        ],
    },
    {
        question: "Which of the following would be a good day out?",
        answers: [
            { option: "Visiting a museum or gallery", correspondingGenre: "A" },
            { option: "Exploring a haunted house", correspondingGenre: "B" },
            { option: "Visiting a National Trust site", correspondingGenre: "C" },
            { option: "Watching something new at the cinema", correspondingGenre: "D" },
        ],
    },
    {
        question: "Pick a quote you like...",
        answers: [
            { option: '"Deviant men have been constructed as criminal, while deviant women have been constructed as insane."', correspondingGenre: "A" },
            { option: '"What is worse: being locked outside of your own mind, or being locked inside of if?"', correspondingGenre: "B" },
            { option: '"I do not think, therefore I am a moustache"', correspondingGenre: "C" },
            { option: '"Wasn’t friendship its own miracle, the finding of another person who made the entire lonely world seem somehow less lonely?"', correspondingGenre: "D" },
        ],
    },
    {
        question: "You're buying a book for a friend, what do you choose?",
        answers: [
            { option: "A book that explores an interest of theirs", correspondingGenre: "A" },
            { option: "A great mystery to unravel", correspondingGenre: "B" },
            { option: "A classic, they're classics for a reason!", correspondingGenre: "C" },
            { option: "A book that inspired their favourite new TV show/film", correspondingGenre: "D" },
        ],
    },
    {
        question: "Which of these authors do you prefer?",
        answers: [
            { option: "Gabor Maté", correspondingGenre: "A" },
            { option: "Stephen King", correspondingGenre: "B" },
            { option: "Virginia Woolf", correspondingGenre: "C" },
            { option: "Sally Rooney", correspondingGenre: "D" },
        ],
    },
    {
        question: "Pick a drink",
        answers: [
            { option: "Water", correspondingGenre: "A" },
            { option: "Whiskey", correspondingGenre: "B" },
            { option: "Tea", correspondingGenre: "C" },
            { option: "Cocktail", correspondingGenre: "D" },
        ],
    },
    {
        question: "Imagine you're on holiday, what activity would you do?",
        answers: [
            { option: "Check out local heritage sites", correspondingGenre: "A" },
            { option: "Do an extreme sport or activity", correspondingGenre: "B" },
            { option: "Visit somewhere that everyone recommends", correspondingGenre: "C" },
            { option: "Chill on the beach or by the pool", correspondingGenre: "D" },
        ],
    },
    {
        question: "Choose a book you've loved in the past",
        answers: [
            { option: "Women, Race & Class- Angela Davis", correspondingGenre: "A" },
            { option: "We Need to Talk About Kevin- Lionel Shriver", correspondingGenre: "B" },
            { option: "The Metamorphosis- Franz Kafka", correspondingGenre: "C" },
            { option: "Normal People- Sally Rooney", correspondingGenre: "D" },
        ],
    },
    {
        question: "Pick a film",
        answers: [
            { option: "13th", correspondingGenre: "A" },
            { option: "The Descent", correspondingGenre: "B" },
            { option: "12 Angry Men", correspondingGenre: "C" },
            { option: "Everything Everywhere All at Once", correspondingGenre: "D" },
        ],
    },
];

// create variables used to rep elements in our document, used to access them in the DOM:
const restartBtn = document.getElementById("restart");
const submitBtn = document.getElementById("submit");
const answerOptions = Array.from(document.getElementsByClassName("option"));
const questionText = document.getElementById("question-text");
const usernameSubmit = document.getElementById("usernameSubmit");

// Below code was suggested by Oisin from tutor support as a bug fix:
let storedUsername;

// get user's name:
function storeUsername() {
    let input = document.getElementById("username").value;
    sessionStorage.setItem("username", input);
    storedUsername = sessionStorage.getItem("username");
    document.getElementById("usernameForm").style.display = "none";
}

// W3Schools- How to Trigger Button Click on Enter:
let inputField = document.getElementById("username");
inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        usernameSubmit.click();
    }
});

let currentQuestionIndex = 0;
let genreArray = [];

function displayQuestion() {
    questionText.innerHTML = questions[currentQuestionIndex].question;
    answerOptions.forEach((eachOption, index) => {
        eachOption.style.background = "white";
        eachOption.innerHTML = questions[currentQuestionIndex].answers[index].option;
    });
}

function initEventListeners() {
    restartBtn.addEventListener("click", restart);
    submitBtn.addEventListener("click", submit);
    answerOptions.forEach((eachOption, index) => {
        eachOption.onclick = () => {
            genreArray.push(questions[currentQuestionIndex].answers[index].correspondingGenre);
            if (currentQuestionIndex === 9) {
                eachOption.style.background = "#5d6859";
            }
            displayNextQuestion();
        };
    });
}

function startQuiz() {
    initEventListeners();
    currentQuestionIndex = 0;
    displayQuestion();
}

// create function to reset current question index, remove hide class from elements, call startQuiz()
function restart() {
    currentQuestionIndex = 0;
    genreArray = [];
    submitBtn.classList.remove("hide");
    answerOptions.forEach((eachOption) => { /* eachOption, index. is index not necessary? */
        eachOption.classList.remove("hide");
        submitBtn.classList.add("hide");
    });

    // below hides recommendation img result after restarting quiz
    nfImg.classList.add("hide");
    sessionStorage.clear();
    startQuiz();
}
// create displayNextQuestion() to move to displayNextQuestion Q, currentQ will ++, hidden class will be removed from prev button
// based on option the user selects, the genreArray will be added to

function displayNextQuestion() {
    currentQuestionIndex++; // maybe delete this?
    if (currentQuestionIndex <= 9) {
        displayQuestion();
    }

    if (currentQuestionIndex == 9) {
        showSubmitBtn();
    }
}

/** Upon submitting option buttons and control buttons are hidden, chosen genre is displayed */
function submit() {
    if (genreArray.length === 10) {
        submitBtn.classList.add("hide");
        answerOptions.forEach((eachOption) => { /* Is index after eachOption necessary? */
            eachOption.classList.add("hide");
        });
        displayGenre();
    }
}

// hide submit button until quiz has been fully answered:
function showSubmitBtn() {
    if (genreArray.length >= 9) {
        submitBtn.classList.remove("hide");
    }
}

/** Calculates which genre is selected by the user most frequently, returns that letter */
function mostFrequent(genreArray) {
    let maxCount = 0;
    let mostCommon;

    for (let i = 0; i < genreArray.length; i++) {
        let count = 0;
        for (let j = 0; j < genreArray.length; j++) {
            if (genreArray[i] === genreArray[j]) count++;
        }
        if (count > maxCount) {
            maxCount = count;
            mostCommon = genreArray[i];
        }
    }
    return mostCommon;
}

/** Tells user (by name) which genre they selected most frequently, and shows book recommendation images */
function displayGenre() {
    const selectedGenre = mostFrequent(genreArray);
    questionText.innerHTML = `Hi ${storedUsername}, you got ${GENRE_MAP[selectedGenre].name}! We recommend the following books...`;
    let img = document.createElement("img");
    img.src = GENRE_MAP[selectedGenre].imgSrc;
    // why is this nfImg?
    let nfImgSource = document.getElementById("nfImg");
    nfImgSource.innerHTML = "";
    nfImgSource.appendChild(img);
    nfImg.classList.remove("hide");
}

/* Modal */

let modal = document.getElementById("modalMain");
let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", closeModal);

function closeModal() {
    modal.style.display = "none";
}
startQuiz();
