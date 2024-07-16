

const questions=[
    {
        question:"Which is the largest animal in the world?",
        answers:[
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question:"Who won the 2022 FIFA World Cup?",
        answers:[
            {text: "Argentina", correct: true},
            {text: "Pakisthan", correct: false},
            {text: "Portugal", correct: false},
            {text: "Sri Lanka", correct: false},
        ]
    },
    {
        question:"Who is Sachin Tendulkar?",
        answers:[
            {text: "Belly Dancer", correct: false},
            {text: "Terrorist", correct: false},
            {text: "Singer", correct: false},
            {text: "Cricketer", correct: true},
        ]
    },
    {
        question:"Which country has a Ocean named after it?",
        answers:[
            {text: "Pakistan", correct: false},
            {text: "Morocco", correct: false},
            {text: "America", correct: false},
            {text: "India", correct: true},
        ]
    }
    
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("ans-btn");
const nextButton=document.getElementById("next-btn");

let currentQuesIndex=0;
let score=0;

function startQuiz(){
    currentQuesIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuesIndex];
    let questionNo=currentQuesIndex+1;
    questionElement.innerHTML=questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}
function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(currentQuesIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();