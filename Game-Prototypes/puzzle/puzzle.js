
//image init
let imageSrc = '';

function initGame() {
    const board = document.getElementById('game-board');
    let counter = 0;

    for (let i = 0; i < 4; i++) {
	for (let j = 0; j < 4; j++) {
	    const tile = document.createElement('div');
	    tile.id = `tile${counter}`;
	    tile.className = 'tile';
	    tile.style.backgroundPosition = `-${j * 100}px -${i * 100}px`;
	    tile.style.left = `${j * 100}px`;
	    tile.style.top = `${i * 100}px`;
	    board.appendChild(tile);
	    counter++;
	}
    }
}

function shuffleTiles() {
    const board = document.getElementById('game-board');
    const tiles = board.getElementsByClassName('tile');

    for (let i = tiles.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));
	const temp = tiles[i].style.backgroundPosition;
	tiles[i].style.backgroundPosition = tiles[j].style.backgroundPosition;
	tiles[j].style.backgroundPosition = temp;
    }
}

function loadImage() {
    const fileInput = document.getElementById('file-input');
    const board = document.getElementById('game-board');
    const tiles = board.getElementsByClassName('tile');

    fileInput.addEventListener('change', function () {
	const file = this.files[0];
	const reader = new FileReader();
	reader.addEventListener('load', function () {
	    const image = new Image();
	    image.src = reader.result;
	    image.onload = function () {
		const width = this.width;
		const height = this.height;
		board.style.width = `${width}px`;
		board.style.height = `${height}px`;
		board.innerHTML = '';
		for (let i = 0; i < 4; i++) {
		    for (let j = 0; j < 4; j++) {
			const tile = document.createElement('div');
			tile.id = `tile${i * 4 + j}`;
			tile.className = 'tile';
			tile.style.width = `${width / 4}px`;
			tile.style.height = `${height / 4}px`;
			tile.style.backgroundImage = `url(${image.src})`;
			tile.style.backgroundPosition = `-${j * (width / 4)}px -${i * (height / 4)}px`;
			tile.style.left = `${j * (width / 4)}px`;
			tile.style.top = `${i * (height / 4)}px`;
			board.appendChild(tile);
		    }
		}
		shuffleTiles();
	    };
	});
	reader.readAsDataURL(file);
    });
}

initGame();
