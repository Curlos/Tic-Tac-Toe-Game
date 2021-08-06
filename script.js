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
    const positionValue = cell.getAttribute('positionValue')
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
    allPos[markerContent].push(Number(positionValue))
    isGameOver(markerContent)
}

const isGameOver = (markerContent) => {
    const allWinningPosVal = Object.values(allWinningPositions)
    
    if (threeInARow(allWinningPosVal, markerContent)) {
        console.log('GAME OVER.')
        endGame('Three in a row', markerContent)
        return true
    }

    if(tieGame()) {
        endGame('tie')
        return true
    }

    return false
}

const threeInARow = (allWinningPosVal, markerContent) => {
    for (let arr of allWinningPosVal) {
        for (let winningPosVal of arr) {
            if (allPos[markerContent].length >= 3) {
                const checkIfAllWinningPos = winningPosVal.every(pos => allPos[markerContent].includes(pos))

                if (checkIfAllWinningPos) {
                    return true
                }
            }
        }
    }

    return false
}

const tieGame = () => {
    for (let posValue in gameBoard) {
        if (gameBoard[posValue] == '&nbsp;') {
            return false
        }
    }
    return true
}

const endGame = (endType, markerContent='') => {
    if (endType == 'Three in a row') {
        if (player1.getMarker() == markerContent) {
            console.log('PLAYER 1 WINS.')
        } else {
            console.log('PLAYER 2 WINS.')
        }
    } else if (endType == 'tie') {
        console.log('NO ONE WINS. TIE GAME.')
    }
}

const restartGame = () => {
    currentPlayerTurn = player1
    allPos['X'] = []
    allPos['O'] = []

    grid.forEach((cell) => {
        const marker = cell.childNodes[1]
        marker.innerHTML = '&nbsp;'
    })
}

const isMarked = (marker) => marker.innerHTML === '&nbsp;' ? false : true

const startGame = () => {
    for (let cell of grid) {
        cell.addEventListener('click', handleClick)
    }

    restartGame()
    restartGameButton.addEventListener('click', restartGame)
}

const allWinningPositions = {
    "horizontalLine": [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    "verticalLine": [[1, 5, 9], [3, 5, 7], [3, 6, 9]],
    "diagonalLine": [[1, 4, 7], [2, 5, 8]]
}

const allPos = {
    'X': [],
    'O': []
}
const player1 = Player('Player1', 'X')
const player2 = Player('Player2', 'O')
let currentPlayerTurn = player1

startGame()