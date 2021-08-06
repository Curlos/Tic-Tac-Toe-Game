const grid = document.querySelectorAll('.cell')
const restartGameButton = document.getElementById('restartGame')

const gameBoard = {
    "1": "&nbsp;",
    "2": "&nbsp;",
    "3": "&nbsp;",
    "4": "&nbsp;",
    "5": "&nbsp;",
    "6": "&nbsp;",
    "7": "&nbsp;",
    "8": "&nbsp;",
    "9": "&nbsp;",
}

const Player = (name, marker) => {

    let score = 0

    const getName = () => name
    const getScore = () => score
    const getMarker = () => marker

    const incrementScore = () => {
        score++
    }

    return {getName, getScore, getMarker, incrementScore}

}

const handleClick = (event) => {
    const cell = event.target
    console.log(cell.attributes)
    const positionValue = cell.getAttribute('positionValue')
    console.log(`CELL: `)
    console.log(positionValue)
    console.log(`GAMEBOARD VALUE: ${gameBoard[positionValue]}`)
    const marker = cell.childNodes[1]

    if (!isMarked(marker)) {
        markBox(marker, positionValue)
    }

    
}

const markBox = (marker, positionValue) => {
    let markerContent;

    if (currentPlayerTurn === player1) {
        markerContent = player1.getMarker()
        currentPlayerTurn = player2
    } else {
        markerContent = player2.getMarker()
        currentPlayerTurn = player1
    }

    marker.textContent = markerContent
    gameBoard[positionValue] = markerContent
}

const gameOver = (player1, player2) => {
    
}

const restartGame = () => {
    currentPlayerTurn = player1
    
    grid.forEach((cell) => {
        const marker = cell.childNodes[1]
        marker.innerHTML = '&nbsp;'
    })
}

const isMarked = (marker) => marker.innerHTML === '&nbsp;' ? false : true

for (let cell of grid) {
    cell.addEventListener('click', handleClick)
    console.log(cell)
}

restartGameButton.addEventListener('click', restartGame)

const player1 = Player('Player1', 'X')
const player2 = Player('Player2', 'O')
let currentPlayerTurn = player1