//makes array of card objects
const cardArray = [
    {
	name: 'bomb',
	img: 'images/bomb.png',
    },
    {
	name: 'cherry',
	img: 'images/cherry.png',
    },
    {
	name: 'coin',
	img: 'images/coin.png',
    },
    {
	name: 'diamond',
	img: 'images/diamond.png',
    },
    {
	name: 'hourglass',
	img: 'images/hourglass.png',
    },
    {
	name: 'mushroom',
	img: 'images/mushroom.png',
    },
    {
	name: 'orange',
	img: 'images/orange.png',
    },
    {
	name: 'potion',
	img: 'images/potion.png',
    },
    {
	name: 'sword',
	img: 'images/sword.png',
    },
     {
	name: 'bomb',
	img: 'images/bomb.png',
    },
    {
	name: 'cherry',
	img: 'images/cherry.png',
    },
    {
	name: 'coin',
	img: 'images/coin.png',
    },
    {
	name: 'diamond',
	img: 'images/diamond.png',
    },
    {
	name: 'hourglass',
	img: 'images/hourglass.png',
    },
    {
	name: 'mushroom',
	img: 'images/mushroom.png',
    },
    {
	name: 'orange',
	img: 'images/orange.png',
    },
    {
	name: 'potion',
	img: 'images/potion.png',
    },
    {
	name: 'sword',
	img: 'images/sword.png',
    }
]

//Shuffles cards
cardArray.sort(() => 0.5 - Math.random())


//selects span from HTML
const grid = document.querySelector('#grid')
const result = document.querySelector('#result')
result.textContent = 'Score: 0'

let cardsChosen = []
let cardsChosenIDs = []
const cardsWon = []


function createBoard() {
    //for each card the image is set to blue, data-id is asigned, and eventListner for click is added
    cardArray.forEach((currentCard,index) => {
	const card = document.createElement('img')
	card.setAttribute('src', 'images/blue.png')
	card.setAttribute('class', 'cardBorder')
	card.setAttribute('data-id', index)
	//goes through flipCard if card is clicked
	card.addEventListener('click', flipCard)
	grid.appendChild(card)
	
    });
}

function flipCard() {
    //ensures only two cards can be flipped at a time
    if (cardsChosen.length < 2) {
	const cardID = this.getAttribute('data-id')
	cardsChosen.push(cardArray[cardID].name)
	cardsChosenIDs.push(cardID)
	this.setAttribute('src', cardArray[cardID].img)
	//console.log(cardsChosen)
	if (cardsChosen.length === 2) {
	    //once two cards have been selected it gives the user time to look at the card and then checks for a match
	    setTimeout(checkMatch, 500)
	}
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('#grid img')
    const card1ID = cardsChosenIDs[0]
    const card2ID = cardsChosenIDs[1]
    
    console.log('Check for match!')
    

    //unflips cards if same card is chosen
    if (card1ID == card2ID) {
	console.log('same card chosen')
	cards[card1ID].setAttribute('src', 'images/blue.png')
	cards[card2ID].setAttribute('src', 'images/blue.png')
    

    //checks if cards match or not
    } else if (cardsChosen[0] == cardsChosen[1]) {
	console.log('match found')
	alert('You found a match!')
	//gets rid of matching cards
	cards[card1ID].setAttribute('src', 'images/white.png')
	//cards[card1ID].setAttribute('class', 'hiddenBorder')
	cards[card2ID].setAttribute('src', 'images/white.png')
	//cards[card2ID].setAttribute('class', 'hiddenBorder')
	//removes eventListeners
	cards[card1ID].removeEventListener('click', flipCard)
	cards[card2ID].removeEventListener('click', flipCard)
	cardsWon.push(cardsChosen)
    } else {
	//unflips not matching cards
	console.log('not a match!')
	cards[card1ID].setAttribute('src', 'images/blue.png')
	cards[card2ID].setAttribute('src', 'images/blue.png')
    }

    //makes score 100 times the amount of cardsWon
    result.textContent = 'Score: ' + (cardsWon.length * 100)
    //resets cardsChosen
    cardsChosen = []
    cardsChosenIDs = []

    //victory message
    if (cardsWon.length === (cardArray.length/2)) {
	result.textContent = 'Congrats you did it!!!'
    }
}

createBoard()





    
