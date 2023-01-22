/*
1) DONE- return array of letters whose buttons have been clicked 
2) DONE- when answer button is clicked move onto next question
3) DONE- restart empties the genreArray array
4) DONE- prev function returns to previous page
4i) prev function removes last option selected so user can't select A, click previous, and click B- this currently would result in genreArray = ['A', 'B']
*/


// create variables used to rep elements in our document, used to access them in the DOM:
const restartBtn = document.getElementById("restart");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const A = document.getElementById('A');
const B = document.getElementById('B');
const C = document.getElementById('C');
const D = document.getElementById('D');
const questionText = document.getElementById("question-text");
const nonFictionImg = document.createElement("img");

/* Genres:
A- Non-Fiction
B- Horror
C- Classics
D- Modern Fiction
*/
let currentQuestion = 0;
let genreArray = [];

let questions = [
    {
        question: "Which genre do you read most frequently?",
        answers: [
            {option: "Non-Fiction", answer:A},
            {option: "Horror", answer:B},
            {option: "Classics", answer:C},
            {option: "Modern Fiction", answer:D}

        ]
    },
    {
        question: "Which of the following appeals most to you?",
        answers: [
            {option: "I want to learn something", answer:A},
            {option: "I want to be intrigued", answer:B},
            {option: "I want to be transported to another time", answer:C},
            {option: "I want something that relates to my life", answer:D}
        ]
    },
    {
        question: "Which of the following would be a good day out?",
        answers: [
            {option: "Visiting a museum or gallery", answer:A},
            {option: "Exploring a haunted house", answer:B},
            {option: "Visiting a National Trust site", answer:C},
            {option: "Watching something new at the cinema", answer:D}
        ]
    },
    {
        question: "Pick a quote you like...",
        answers: [
            {option: "Deviant men have been constructed as criminal, while deviant women have been constructed as insane.", answer:A},
            {option: "What is worse: being locked outside of your own mind, or being locked inside of if?", answer:B},
            {option: "I do not think, therefore I am a moustache", answer:C},
            {option: "Wasn’t friendship its own miracle, the finding of another person who made the entire lonely world seem somehow less lonely?", answer:D}
        ]
    },
    {
        question: "You're buying a book for a friend, what do you choose?",
        answers: [
            {option: "A book that explores an interest of theirs", answer:A},
            {option: "A great mystery to unravel", answer:B},
            {option: "A classic, they're classics for a reason!", answer:C},
            {option: "A book that inspired their favourite new TV show/film", answer:D}
        ]
    },
    {
        question: "Which of these authors do you prefer?",
        answers: [
            {option: "Gabor Maté", answer:A},
            {option: "Stephen King", answer:B},
            {option: "Virginia Woolf", answer:C},
            {option: "Sally Rooney", answer:D}
        ]
    },
    {
        question: "Pick a drink",
        answers: [
            {option: "Water", answer:A},
            {option: "Whiskey", answer:B},
            {option: "Tea", answer:C},
            {option: "Cocktail", answer:D}
        ]
    },
    {
        question: "Imagine you're on holiday, what activity would you do?",
        answers: [
            {option: "Check our local heritage sites", answer:A},
            {option: "Do an extreme sport or activity", answer:B},
            {option: "Visit somewhere that everyone recommends", answer:C},
            {option: "Chill on the beach or by the pool", answer:D}
        ]
    },
    {
        question: "Choose a book you've loved in the past",
        answers: [
            {option: "Women, Race & Class- Angela Davis", answer:A},
            {option: "We Need to Talk About Kevin- Lionel Shriver", answer:B},
            {option: "The Metamorphosis- Franz Kafka", answer:C},
            {option: "Normal People- Sally Rooney", answer:D}
        ]
    },
    {
        question: "Hello",
        answers: [
            {option: "C", answer:A},
            {option: "D", answer:B},
            {option: "A", answer:C},
            {option: "B", answer:D}
        ]
    }
]

// add event listeners to buttons to call functions when clicked:
restartBtn.addEventListener('click', restart);
previousBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);
submitBtn.addEventListener('click', submit);

// create a func that'll be executed when the page loads and script is executed

function startQuiz() {
    currentQuestion = 0;
    questionText.innerHTML = questions[currentQuestion].question;
    // First button:
    A.innerHTML = questions[currentQuestion].answers[0].option;
    A.onclick = () => {
        if (questions[currentQuestion].answers[0].answer) {
            console.log('A'); // when A is clicked, the console displays A
           genreArray.push('A'); // when A is clicked, 'A' is added to genreArray (this adds as many 'A's as the num of times the button is clicked)
        }
        if (currentQuestion < 9) {
            next();
        }
    }
    // Second button:
    B.innerHTML = questions[currentQuestion].answers[1].option;
    B.onclick = () => {
        if (questions[currentQuestion].answers[1].answer) {
            console.log('B'); 
           genreArray.push('B'); 
        }
        if (currentQuestion < 9) {
        next();
    }
    }
    
    // Third button:
    C.innerHTML = questions[currentQuestion].answers[2].option;
    C.onclick = () => {
        if (questions[currentQuestion].answers[2].answer) {
            console.log('C'); 
           genreArray.push('C'); 
        }
        if (currentQuestion < 9) {
        next();
    }
    }
    
    // Fourth button:
    D.innerHTML = questions[currentQuestion].answers[3].option;
    D.onclick = () => {
        if (questions[currentQuestion].answers[3].answer) {
            console.log('D'); 
           genreArray.push('D'); 
        }
        if (currentQuestion < 9) {
        next();
    }
    }
    previousBtn.classList.add('hide');
 }
startQuiz();

// create function to reset current question index, remove hide class from elements, call startQuiz()
function restart() {
    currentQuestion = 0;
    genreArray = [];
    previousBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');
    submitBtn.classList.remove('hide');
    A.classList.remove('hide');
    B.classList.remove('hide');
    C.classList.remove('hide');
    D.classList.remove('hide');
    startQuiz();
}

// atm options are tied to buttons so will always have to be in order ABCD. If I write A in the answer option for the 3rd option will it print A to the genreArray?

// create next() to move to next Q, currentQ will ++, hidden class will be removed from prev button
// based on option the user selects, the genreArray will be added to

function next() {
    currentQuestion++; // maybe delete this?
    if (currentQuestion >= 9) {
        nextBtn.classList.add('hide');
        previousBtn.classList.remove('hide');
    }
    questionText.innerHTML = questions[currentQuestion].question;
    A.innerHTML = questions[currentQuestion].answers[0].option;
    A.onclick = () => {
        if (questions[currentQuestion].answers[0].answer) {
            console.log('A'); 
           genreArray.push('A'); 
        }
        if (currentQuestion < 9) {
        next();
    }
    }
    
    B.innerHTML = questions[currentQuestion].answers[1].option;
    B.onclick = () => {
        if (questions[currentQuestion].answers[1].answer) {
            console.log('B'); 
           genreArray.push('B'); 
        }
        if (currentQuestion < 9) {
        next();
    }
    }
    C.innerHTML = questions[currentQuestion].answers[2].option;
    C.onclick = () => {
        if (questions[currentQuestion].answers[2].answer) {
            console.log('C'); 
           genreArray.push('C'); 
        }
        if (currentQuestion < 9) {
        next();
    }
    }
    
    D.innerHTML = questions[currentQuestion].answers[3].option;
    D.onclick = () => {
        if (questions[currentQuestion].answers[3].answer) {
            console.log('D'); 
           genreArray.push('D'); 
        }
        if (currentQuestion < 9) {
        next();
    }
    }
    previousBtn.classList.remove('hide');
}

// create previous() jump to prev Q, currentQuestion will be --, hidden class removed from next button


function previous() {
    currentQuestion--;
    if (currentQuestion <= 0) {
        previousBtn.classList.add('hide');
        nextBtn.classList.remove('hide')
    }
    questionText.innerHTML = questions[currentQuestion].question;
    // button 1
    A.innerHTML = questions[currentQuestion].answers[0].option;
    A.onclick = () => {
        if (questions[currentQuestion].answers[0].answer) {
            console.log('A'); 
            genreArray.push('A'); 
         }
         if (currentQuestion < 9) {
         next();
     }
     }
     
     // button 2
     B.innerHTML = questions[currentQuestion].answers[1].option;
     B.onclick = () => {
        if (questions[currentQuestion].answers[1].answer) {
            console.log('B'); 
            genreArray.push('B'); 
         }
         if (currentQuestion < 9) {
         next();
     }
     }
     
     C.innerHTML = questions[currentQuestion].answers[2].option;
     C.onclick = () => {
        if (questions[currentQuestion].answers[2].answer) {
            console.log('C'); 
            genreArray.push('C'); 
         }
         if (currentQuestion < 9) {
         next();
     }
     }
     
     D.innerHTML = questions[currentQuestion].answers[3].option;
     D.onclick = () => {
        if (questions[currentQuestion].answers[3].answer) {
            console.log('D'); 
            genreArray.push('D'); 
         }
         if (currentQuestion < 9) {
         next();
     }
     }
     nextBtn.classList.remove('hide');
        }

        function submit() {
            previousBtn.classList.add('hide');
            nextBtn.classList.add('hide');
            submitBtn.classList.add('hide');
            A.classList.add('hide');
            B.classList.add('hide');
            C.classList.add('hide');
            D.classList.add('hide');
           // questionText.innerHTML = mostFrequent(genreArray); // chosenGenre displays undefined, mostFrequent(genreArray) shows correct letter on screen
           displayGenre();
        }

        function mostFrequent(genreArray) {
        let maxCount = 0;
        let mostCommon;

        for (let i = 0; i < genreArray.length; i++) {
            let count = 0;
            for (let j = 0; j < genreArray.length; j++) {
                if (genreArray[i] === genreArray[j]) 
                count++;
            }
            if (count > maxCount) {
                maxCount = count;
                mostCommon = genreArray[i];
            }
        }
        return mostCommon;
        }
       // mostFrequent(genreArray); // printed C (most frequent) when simulated on browser

       function displayGenre() {
        if (mostFrequent(genreArray) === 'A') {
            questionText.innerHTML = 'Non-Fiction';
        } else if (mostFrequent(genreArray) === 'B') {
            questionText.innerHTML = horrorText;
            nonFictionImg.src = "assets/images/book-background.jpg"
            document.body.appendChild(nonFictionImg);
        } else if (mostFrequent(genreArray) === 'C') {
            questionText.innerHTML = 'Classics';
        } else if (mostFrequent(genreArray) === 'D') {
            questionText.innerHTML = 'Modern Fiction';
        }
        }

        let horrorText = "We recommend the following books..."
        nonFictionImg.classList.add('nf-img')
       // let horrorImg = nonFictionImg.classList.remove('hide');
      
        

