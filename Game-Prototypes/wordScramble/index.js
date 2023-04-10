//initializing document queries
const wordText = document.querySelector("#word");
const hintText = document.querySelector("#hint span");
const timeText = document.querySelector("#time b");
const inputFeild = document.querySelector("input");
const refreshButton = document.querySelector("#refresh-word");
const checkButton = document.querySelector("#check-word");

let correctWord, timer;

//timer for unscrambling word
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
	//decrements max time every second (1000 ms)
	if(maxTime > 0) {
	    maxTime--;
	    return timeText.innerText = maxTime;
	}
	clearInterval(timer);
	alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
	//restarts game
	initGame();
    }, 1000);
}

const initGame = () => {
    //calling initTimer function with 30 as maxTime
    initTimer(30);
    //gets random object from words
    const randomObj = words[Math.floor(Math.random() * words.length)];
    //splits each word into an array of letters
    let wordArray = randomObj.word.split("");
  
    wordArray.forEach((currentWord, index) => {
	const randomIndex = Math.floor(Math.random() * (index + 1));
	//shuffling and switching letters in wordArray random
	[wordArray[index], wordArray[randomIndex]] = [wordArray[randomIndex], wordArray[index]];
    });
    //passes shuffled word as text
    wordText.innerText = wordArray.join("");
    //passes hint as text
    hintText.innerText = randomObj.hint
    //passes randomWord to correctWord
    correctWord = randomObj.word.toLowerCase();
    //makes input field empty
    inputFeild.value = "";
    //sets input maxlenth as the word's length
    inputFeild.setAttribute("maxlength", correctWord.length)
}
initGame();

const checkWord = () => {
    //gets user value and makes it lowercase
    let userWord = inputFeild.value.toLocaleLowerCase();
    //checks if word is correct or if there's no word 
    if (userWord == correctWord) {
	alert(`Congrats ${userWord.toUpperCase()} is the correct word!`);
	//restarts game
	initGame();
    } else if (userWord == "") {
	alert("Please enter a word"); 
    } else {
	alert(`Oops! ${userWord} is the wrong word :(`);
    }
}

//adds eventListeners for buttons
refreshButton.addEventListener("click", initGame);
checkButton.addEventListener("click", checkWord);
