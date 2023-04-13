const gameBoard = document.getElementById("gameBoard");

function startGame(difficulty) {
    let rows, cols, mines;
    switch (difficulty) {
    case 'easy':
	rows = 9;
	cols = 9;
	mines = 10;
	break;
    case 'medium':
	rows = 16;
	cols = 16;
	mines = 40;
	break;
    case 'hard':
	rows = 16;
	cols = 30;
	mines = 99;
	break;
    default:
	rows = 9;
	cols = 9;
	mines = 10;
    }

    gameBoard.dataset.rowCount = rows;
    gameBoard.dataset.colCount = cols;
    gameBoard.dataset.mineCount = mines;
    generateBoard(rows, cols);
}

function generateBoard(rows, cols) {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    let tiles = [];
    for (let i = 0; i < rows * cols; i++) {
	const tile = document.createElement("div");
	tile.classList.add("tile");
	tile.addEventListener("click", () => revealTile(tile));
	tile.addEventListener("contextmenu", (e) => {
	    e.preventDefault();
	    toggleFlag(tile);
	});

	gameBoard.appendChild(tile);
	tiles.push(tile);
    }
}

function placeMines(tiles, mines, safeIndex) {
    const mineIndexes = new Set();
    while (mineIndexes.size < mines) {
	const index = Math.floor(Math.random() * tiles.length);
	if (index !== safeIndex) {
	    mineIndexes.add(index);
	}
    }

    for (const index of mineIndexes) {
	tiles[index].classList.add("mine");
    }
}

function updateNumbers(tiles, rows, cols) {
    const neighbors = [-cols - 1, -cols, -cols + 1, -1, 1, cols - 1, cols, cols + 1];

    tiles.forEach((tile, index) => {
	if (!tile.classList.contains("mine")) {
	    const mineCount = neighbors.reduce((count, offset) => {
		const neighbor = tiles[index + offset];
		if (
		    neighbor &&
			!(index % cols === 0 && (offset === -cols - 1 || offset === -1 || offset === cols - 1)) &&
			!(index % cols === cols - 1 && (offset === -cols + 1 || offset === 1 || offset === cols + 1)) &&
			neighbor.classList.contains("mine")
		) {
		    count++;
		}
		return count;
	    }, 0);

	    if (mineCount > 0) {
		tile.dataset.mineCount = mineCount;
	    }
	}
    });
}

function revealTile(tile) {
    if (!tile.classList.contains("revealed") && !tile.classList.contains("flag")) {
	if (!Array.from(gameBoard.children).some(t => t.classList.contains("mine"))) {
	    const index = Array.from(gameBoard.children).indexOf(tile);
	    placeMines(Array.from(gameBoard.children), getMineCount(), index);
	    updateNumbers(Array.from(gameBoard.children), getRowCount(), getColCount());
	}

	tile.classList.add("revealed");

	if (tile.classList.contains("mine")) {
	    alert("game complete, case lose");
	    startGame("easy");
	    return;
	}

	if (!tile.dataset.mineCount) {
	    const index = Array.from(gameBoard.children).indexOf(tile);
	    const row = Math.floor(index / getColCount());
	    const col = index % getColCount();

	    const neighborCoords = [
		[row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
		[row, col - 1],                   [row, col + 1],
		[row + 1, col - 1], [row + 1, col], [row + 1, col + 1],
	    ];

	    neighborCoords.forEach(([r, c]) => {
		if (r >= 0 && r < getRowCount() && c >= 0 && c < getColCount()) {
		    revealTile(gameBoard.children[r * getColCount() + c]);
		}
	    });
	} else {
	    tile.textContent = tile.dataset.mineCount;
	}

	if (checkWin()) {
	    alert("game complete, case win");
	    startGame("easy");
	}
    }
}

function toggleFlag(tile) {
    if (!tile.classList.contains("revealed")) {
	tile.classList.toggle("flag");
	tile.textContent = tile.classList.contains("flag") ? "🚩" : "";
    }
}

function checkWin() {
    return Array.from(gameBoard.children).every((tile) => {
	return (
	    (tile.classList.contains("revealed") && !tile.classList.contains("mine")) ||
		(tile.classList.contains("flag") && tile.classList.contains("mine"))
	);
    });
}

function getMineCount() {
    return parseInt(gameBoard.dataset.mineCount);
}

function getRowCount() {
    return parseInt(gameBoard.dataset.rowCount);
}

function getColCount() {
    return parseInt(gameBoard.dataset.colCount);
}

startGame("easy");

