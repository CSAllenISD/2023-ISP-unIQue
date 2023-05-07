//store elements in constants
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.getElementById("game-container")
const result= document.getElementById("result")
const controls = document.getElementById("controls-container")


//array of all cards
const cardList = [
    {
	name: 'bulb',
	img: 'images/bulb.jpg',
    },
    {
	name: 'cloud',
	img: 'images/cloud.jpg',
    },
    {
	name: 'flower',
	img: 'images/flower.jpg',
    },
    {
	name: 'heart',
	img: 'images/heart.jpg',
    },
    {
	name: 'ice-cream',
	img: 'images/ice-cream.jpg',
    },
    {
	name: 'lightning',
	img: 'images/lightning.jpg',
    },
    {
	name: 'orange',
	img: 'images/orange.jpg',
    },
    {
	name: 'peace',
	img: 'images/peace.jpg',
    },
   
]

//initial time
let seconds = 0,
    minutes = 0;
//initial moves and win count
let movesCount = 0,
    winCount = 0;
//for timer
const timeGenerator = () => {
    seconds += 1;
    //minutes logic
    if (seconds >= 60) {
	minutes += 1;
	seconds = 0;
    }
    //format time before displaying (add 0 to single digit numbers)
    let secondsValue = seconds < 10 ? `0${seconds}` :
	seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` :
	minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
    
};

// For calculating moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
}

//generates cards and board
const matrixGenerator = (cardList, columns = 4, rows = 4) => {
    let size = (columns * rows)
    gameContainer.innerHTML = "";
    //makes array of cards with two of every card
    let cardValues = [...cardList, ...cardList];
    //simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    //creates cards
    for (let i = 0; i < size; i++) 
	gameContainer.innerHTML += `
<div class="card-container" data-card-value="${cardValues[i].name}">
<div class="card-before">?</div>
<div class="card-after">
<img src="${cardValues[i].img}" class="cardImage"/></div>
</div>
`;
    //grid
    gameContainer.style.gridTemplateColumns = `repeat(${columns}, auto)`;

    //cards
    let cards = document.querySelectorAll(".card-container");
    let firstCard = false;
    let secondCard = false;

    //card matching
    let firstCardValue;
    cards.forEach((card) => {
	card.addEventListener("click", () => {
	 //if selected card isn't matched yet then only run
    if(!card.classList.contains("matched")) {
	//flip the card
	card.classList.add("flipped");
	//if its firstcard
	if(!firstCard) {
	    //current card becomes first card
	    firstCard = card;
	    firstCardValue = card.getAttribute("data-card-value");   
    } else {
	//increment moves since user selected second card
	movesCounter();
	secondCard = card;
	let secondCardValue = card.getAttribute("data-card-value");
	if(firstCardValue == secondCardValue) {
	    //if both match added matched class so they'll be ignored now
	    firstCard.classList.add("matched");
	    secondCard.classList.add("matched");
	    //set firstCard to false since next one will be first now
	    firstCard = false;
	    //increase winCount since a match happened
	    winCount += 1;
	    //ends game if enough matches are won
	    if (winCount == Math.floor(cardValues.length / 2)) {
		result.innerHTML = `<h2> You Won</h2>
<h4>Moves: ${movesCount}</h4>`;
		stopGame();
	    };
	} else {
	    //if the cards don't match flip them back
	    let [tempFirst, tempSecond] = [firstCard, secondCard];
	    firstCard = false;
	    secondCard = false;
	    let delay = setTimeout(() => {
		tempFirst.classList.remove("flipped");
		tempSecond.classList.remove("flipped");
	    } , 900);
	};
    };
    };
	});
    });
};


//initializes game
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    matrixGenerator(cardList);
};

//functionality for start and stop buttons
const startStopGame = () => {
    let interval;
    //game starting
    startButton.addEventListener("click", () => {
	movesCount = 0;
	seconds = 0;
	minutes = 0;
    //controls and buttons visibility
	controls.classList.add("hide");
	stopButton.classList.remove("hide");
	startButton.classList.add("hide");
	//start timer
	interval = setInterval(timeGenerator, 1000);
	//initial moves
	moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
    });
    
    //game stopping
    stopButton.addEventListener("click", (stopGame = () => {
	controls.classList.remove("hide");
	stopButton.classList.add("hide");
	startButton.classList.remove("hide");
	clearInterval(interval);
    }));
    
};
startStopGame();
