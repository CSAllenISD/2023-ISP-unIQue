// Word selection, make sure they're well known and easy.
const words = ['Intelligence','Genius','Gifted','Brainpower','Mentality'];
const randomWord = words[Math.floor(Math.random() * words.length)];

// Scrambling
function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}
const scrambledWord = scrambleWord(randomWord);
const wordElement = document.getElementById('word');
wordElement.textContent = scrambledWord;

// User interaction
const guessForm = document.getElementById('guess-form');
guessForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const guessInput = document.getElementById('guess-input');
    const guess = guessInput.value.toLowerCase();
    if (guess === randomWord.toLowerCase()) {
	alert('You win!');
    } else {
	alert('Incorrect!');
    }
    guessInput.value = '';
});

// Game process
const timerElement = document.getElementById('timer');
let timeLeft = 60;
const countdown = setInterval(function() {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft}`;
    if (timeLeft === 0) {
	clearInterval(countdown);
	alert(`Time's up! Your final score is ${score}.`);
    }
}, 1000);
