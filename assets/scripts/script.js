/*
1) DONE- return array of letters whose buttons have been clicked 
2) DONE- when answer button is clicked move onto next question
3) DONE- restart empties the genreArray arr
4) DONE- prev function returns to previous page
4i) prev function removes last option selected so user can't select A, click previous, and click B- this currently would result in genreArray = ['A', 'B']
5) DONE?- ensure that submit can only be pressed once user has answered all questions, hide submit until genreArray === 10?
6) DONE- user cannot be accessed in the displayGenre function (was declared in func)
*/

// get user's name:
function storeUsername() {
    let input = document.getElementById('username').value;
    sessionStorage.setItem("username", input);
}

// create variables used to rep elements in our document, used to access them in the DOM:
const restartBtn = document.getElementById("restart");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const A = document.getElementById('A');
const B = document.getElementById('B');
const C = document.getElementById('C');
const D = document.getElementById('D');
const formSection = document.getElementById('usernameForm');
const questionText = document.getElementById("question-text");

/* Genres:
A- Non-Fiction
B- Horror
C- Classics
D- Modern Fiction
*/

// let nfImg = document.createElement("img"); // empty img tag
// nfImg.src = "../assets/images/Non-fiction.png"; // img shows in sources Dev Tools 
// let nfImgSource = document.getElementById('nfImg');
// nfImgSource.appendChild(nfImg);

// can't actually access the images
const GENRE_MAP = {
    A: {
        name: 'Non-Fiction',
        imgSrc: '../assets/images/Non-fiction.png',
    },
    B: {
        name: 'Horror',
        imgSrc: '../assets/images/horror.png',
    },
    C: {
        name: 'Classics',
        imgSrc: '../assets/images/classics.png',
    },
    D: {
        name: 'Horror',
        imgSrc: '../assets/images/modern-fiction.png'
    },
};

let currentQuestionIndex = 0;
let genreArray = [];

let questions = [
    {
        question: "Which genre do you read most frequently?",
        answers: [
            {option: "Non-Fiction", correspondingGenre:'A'},
            {option: "Horror", correspondingGenre:'B'},
            {option: "Classics", correspondingGenre:'C'},
            {option: "Modern Fiction", correspondingGenre:'D'}

        ]
    },
    {
        question: "Which of the following appeals most to you?",
        answers: [
            {option: "I want to learn something", correspondingGenre:'A'},
            {option: "I want to be intrigued", correspondingGenre:'B'},
            {option: "I want to be transported to another time", correspondingGenre:'C'},
            {option: "I want something that relates to my life", correspondingGenre:'D'}
        ]
    },
    {
        question: "Which of the following would be a good day out?",
        answers: [
            {option: "Visiting a museum or gallery", correspondingGenre:'A'},
            {option: "Exploring a haunted house", correspondingGenre:'B'},
            {option: "Visiting a National Trust site", correspondingGenre:'C'},
            {option: "Watching something new at the cinema", correspondingGenre:'D'}
        ]
    },
    {
        question: "Pick a quote you like...",
        answers: [
            {option: '"Deviant men have been constructed as criminal, while deviant women have been constructed as insane."', correspondingGenre:'A'},
            {option: '"What is worse: being locked outside of your own mind, or being locked inside of if?"', correspondingGenre:'B'},
            {option: '"I do not think, therefore I am a moustache"', correspondingGenre:'C'},
            {option: '"Wasn\’t friendship its own miracle, the finding of another person who made the entire lonely world seem somehow less lonely?"', correspondingGenre:'D'}
        ]
    },
    {
        question: "You're buying a book for a friend, what do you choose?",
        answers: [
            {option: "A book that explores an interest of theirs", correspondingGenre:'A'},
            {option: "A great mystery to unravel", correspondingGenre:'B'},
            {option: "A classic, they're classics for a reason!", correspondingGenre:'C'},
            {option: "A book that inspired their favourite new TV show/film", correspondingGenre:'D'}
        ]
    },
    {
        question: "Which of these authors do you prefer?",
        answers: [
            {option: "Gabor Maté", correspondingGenre:'A'},
            {option: "Stephen King", correspondingGenre:'B'},
            {option: "Virginia Woolf", correspondingGenre:'C'},
            {option: "Sally Rooney", correspondingGenre:'D'}
        ]
    },
    {
        question: "Pick a drink",
        answers: [
            {option: "Water", correspondingGenre:'A'},
            {option: "Whiskey", correspondingGenre:'B'},
            {option: "Tea", correspondingGenre:'C'},
            {option: "Cocktail", correspondingGenre:'D'}
        ]
    },
    {
        question: "Imagine you're on holiday, what activity would you do?",
        answers: [
            {option: "Check our local heritage sites", correspondingGenre:'A'},
            {option: "Do an extreme sport or activity", correspondingGenre:'B'},
            {option: "Visit somewhere that everyone recommends", correspondingGenre:'C'},
            {option: "Chill on the beach or by the pool", correspondingGenre:'D'}
        ]
    },
    {
        question: "Choose a book you've loved in the past",
        answers: [
            {option: "Women, Race & Class- Angela Davis", correspondingGenre:'A'},
            {option: "We Need to Talk About Kevin- Lionel Shriver", correspondingGenre:'B'},
            {option: "The Metamorphosis- Franz Kafka", correspondingGenre:'C'},
            {option: "Normal People- Sally Rooney", correspondingGenre:'D'}
        ]
    },
    {
        question: "Pick a film",
        answers: [
            {option: "13th", correspondingGenre:'A'},
            {option: "The Descent", correspondingGenre:'B'},
            {option: "12 Angry Men", correspondingGenre:'C'},
            {option: "Everything Everywhere All at Once", correspondingGenre:'D'}
        ]
    }
]

// add event listeners to buttons to call functions when clicked:
restartBtn.addEventListener('click', restart);
previousBtn.addEventListener('click', previous);
nextBtn.addEventListener('click', next);
submitBtn.addEventListener('click', submit);


// hide form input area:

// let formSubmitBtn = document.getElementById('usernameSubmit');
// function hideForm() {
//     formSection.style.display = 'none';
// }
// formSubmitBtn.addEventListener("click", hideForm);
// function hideForm() {
// if (currentQuestion >= 1) {
//     formSection.classList.add('hide');
// }
// }

// create a func that'll be executed when the page loads and script is executed

function startQuiz() {
    currentQuestionIndex = 0;
    // hide form input area:
    questionText.innerHTML = questions[currentQuestionIndex].question;
    // First button:
    A.innerHTML = questions[currentQuestionIndex].answers[0].option;
    A.onclick = () => {
        if (questions[currentQuestionIndex].answers[0].correspondingGenre) {
            console.log('A'); // when A is clicked, the console displays A
           genreArray.push('A'); // when A is clicked, 'A' is added to genreArray (this adds as many 'A's as the num of times the button is clicked)
        }
        if (currentQuestionIndex < 9) {
            next();
        }
    }
    // Second button:
    B.innerHTML = questions[currentQuestionIndex].answers[1].option;
    B.onclick = () => {
        if (questions[currentQuestionIndex].answers[1].correspondingGenre) {
            console.log('B'); 
           genreArray.push('B'); 
        }
        if (currentQuestionIndex < 9) {
        next();
    }
    }
    
    // Third button:
    C.innerHTML = questions[currentQuestionIndex].answers[2].option;
    C.onclick = () => {
        if (questions[currentQuestionIndex].answers[2].correspondingGenre) {
            console.log('C'); 
           genreArray.push('C'); 
        }
        if (currentQuestionIndex < 9) {
        next();
    }
    }
    
    // Fourth button:
    D.innerHTML = questions[currentQuestionIndex].answers[3].option;
    D.onclick = () => {
        if (questions[currentQuestionIndex].answers[3].correspondingGenre) {
            console.log('D'); 
           genreArray.push('D'); 
        }
        if (currentQuestionIndex < 9) {
        next();
    }
    }
    previousBtn.classList.add('hide');
    // submitBtn.classList.add('hide');
 }
startQuiz();

// create function to reset current question index, remove hide class from elements, call startQuiz()
function restart() {
    currentQuestionIndex = 0;
    genreArray = [];
    previousBtn.classList.remove('hide');
    nextBtn.classList.remove('hide');
    submitBtn.classList.remove('hide');
    A.classList.remove('hide');
    B.classList.remove('hide');
    C.classList.remove('hide');
    D.classList.remove('hide');
    nfImg.classList.add('hide');
    horrorImg.classList.add('hide');
    classicsImg.classList.add('hide');
    mfImg.classList.add('hide');
    // nfImgSource.removeChild(nfImg);
    startQuiz();
}

// atm options are tied to buttons so will always have to be in order ABCD. If I write A in the answer option for the 3rd option will it print A to the genreArray?

// create next() to move to next Q, currentQ will ++, hidden class will be removed from prev button
// based on option the user selects, the genreArray will be added to

function next() {
    currentQuestionIndex++; // maybe delete this?
    if (currentQuestionIndex >= 9) {
        nextBtn.classList.add('hide');
        previousBtn.classList.remove('hide');
    }
    questionText.innerHTML = questions[currentQuestionIndex].question;
    A.innerHTML = questions[currentQuestionIndex].answers[0].option;
    A.onclick = () => {
        if (questions[currentQuestionIndex].answers[0].correspondingGenre) {
            console.log('A'); 
           genreArray.push('A'); 
        }
        if (currentQuestionIndex < 9) {
        next();
    }
    }
    
    B.innerHTML = questions[currentQuestionIndex].answers[1].option;
    B.onclick = () => {
        if (questions[currentQuestionIndex].answers[1].correspondingGenre) {
            console.log('B'); 
           genreArray.push('B'); 
        }
        if (currentQuestionIndex < 9) {
        next();
    }
    }
    C.innerHTML = questions[currentQuestionIndex].answers[2].option;
    C.onclick = () => {
        if (questions[currentQuestionIndex].answers[2].correspondingGenre) {
            console.log('C'); 
           genreArray.push('C'); 
        }
        if (currentQuestionIndex < 9) {
        next();
    }
    }
    
    D.innerHTML = questions[currentQuestionIndex].answers[3].option;
    D.onclick = () => {
        if (questions[currentQuestionIndex].answers[3].correspondingGenre) {
            console.log('D'); 
           genreArray.push('D'); 
        }
        if (currentQuestionIndex < 9) {
        next();
    }
    }
    previousBtn.classList.remove('hide');
    // showSubmitBtn();
}

// create previous() jump to prev Q, currentQuestion will be --, hidden class removed from next button


function previous() {
    currentQuestionIndex--;
    if (currentQuestionIndex <= 0) {
        previousBtn.classList.add('hide');
        nextBtn.classList.remove('hide')
    }
    questionText.innerHTML = questions[currentQuestionIndex].question;
    // button 1
    A.innerHTML = questions[currentQuestionIndex].answers[0].option;
    A.onclick = () => {
        if (questions[currentQuestionIndex].answers[0].correspondingGenre) {
            console.log('A'); 
            genreArray.push('A'); 
         }
         if (currentQuestionIndex < 9) {
         next();
     }
     }
     
     // button 2
     B.innerHTML = questions[currentQuestionIndex].answers[1].option;
     B.onclick = () => {
        if (questions[currentQuestionIndex].answers[1].correspondingGenre) {
            console.log('B'); 
            genreArray.push('B'); 
         }
         if (currentQuestionIndex < 9) {
         next();
     }
     }
     
     C.innerHTML = questions[currentQuestionIndex].answers[2].option;
     C.onclick = () => {
        if (questions[currentQuestionIndex].answers[2].correspondingGenre) {
            console.log('C'); 
            genreArray.push('C'); 
         }
         if (currentQuestionIndex < 9) {
         next();
     }
     }
     
     D.innerHTML = questions[currentQuestionIndex].answers[3].option;
     D.onclick = () => {
        if (questions[currentQuestionIndex].answers[3].correspondingGenre) {
            console.log('D'); 
            genreArray.push('D'); 
         }
         if (currentQuestionIndex < 9) {
         next();
     }
     }
     nextBtn.classList.remove('hide');
        }

/** Upon submitting option buttons and control buttons are hidden, chosen genre is displayed */
        function submit() {
            if (genreArray.length === 10) {
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
        }

        // hide submit button until quiz has been fully answered:
    //     function showSubmitBtn() {
    //     if (genreArray.length > 9) {
    //         submitBtn.classList.remove('hide');
    //     }
    // }

/** Calculates which genre is selected by the user most frequently, returns that letter */
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

       // retrieve username value:
       let storedUsername = sessionStorage.getItem('username');

/** Tells user (by name) which genre they selected most frequently, and shows book recommendations */
       function displayGenre() {
        const selectedGenre = mostFrequent(genreArray);
        questionText.innerHTML = `Hi ${storedUsername}, you got ${GENRE_MAP[selectedGenre].name}! We recommend the following books...`;
        // display image of recommended books:
        // const imagesToDisplay = GENRE_MAP[selectedGenre].imgSrc; // imagesToDisplay saying not defined
        // const imagesList = [];
        // imagesToDisplay.forEach((eachImg, index) => {
        //     let img = document.createElement('img');
        //     img.src = imagesToDisplay[index];
        //     imagesList.push(img);
        // });
        // document.getElementById('body').appendChild(imagesList);
        // console.log(imagesToDisplay);

        // LinuxHint How to Add Image in HTML via JavaScript:
        // If user selects A
        if (selectedGenre === 'A') {
        let nfImg = document.createElement("img"); // empty img tag
        nfImg.src = "../assets/images/Non-fiction.png"; // img shows in sources Dev Tools 
        let nfImgSource = document.getElementById('nfImg');
        nfImgSource.appendChild(nfImg);
        nfImg.classList.remove('hide');
        // If user selects B
        } else if (selectedGenre === 'B') {
            let horrorImg = document.createElement("img"); // empty img tag
            horrorImg.src = "../assets/images/horror.png"; // img shows in sources Dev Tools 
            let horrorImgSource = document.getElementById('horrorImg');
            horrorImgSource.appendChild(horrorImg);
            horrorImg.classList.remove('hide');
            // If user selects C
            } else if (selectedGenre === 'C') {
            let classicsImg = document.createElement("img"); // empty img tag
            classicsImg.src = "../assets/images/classics.png"; // img shows in sources Dev Tools 
            let classicsImgSource = document.getElementById('classicsImg');
            classicsImgSource.appendChild(classicsImg);
            classicsImg.classList.remove('hide');
            // If user selects D
            } else if (selectedGenre === 'D') {
            let mfImg = document.createElement("img"); // empty img tag
            mfImg.src = "../assets/images/modern-fiction.png"; // img shows in sources Dev Tools 
            let mfImgSource = document.getElementById('mfImg');
            mfImgSource.appendChild(mfImg);
            mfImg.classList.remove('hide');
            }
        }

    

       

        
        

