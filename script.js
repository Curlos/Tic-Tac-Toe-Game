const grid = document.querySelectorAll('.cell')
const restartGameButton = document.getElementById('restartGame')
const gameStatus = document.querySelector('.gameStatus')
const playerOneContainer = document.querySelector('.playerOneContainer')
const playerTwoContainer = document.querySelector('.playerTwoContainer')
const playerOneScoreElem = document.querySelector('.playerOneScore')
const playerTwoScoreElem = document.querySelector('.playerTwoScore')
const gamemode = document.getElementById('gamemode')
const difficultyLevelsSelect = document.getElementById('difficultyLevelsSelect')
const shareButton = document.getElementById('share')

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
    const cell = event.target || event
    const positionValue = cell.getAttribute('positionValue')
    const marker = cell.childNodes[1]

    if (!isMarked(marker)) {
        markBox(marker, positionValue)
    }

    
}

const markBox = (marker, positionValue) => {
    let markerContent;
    console.log(currentPlayerTurn)

    if (currentPlayerTurn === player1) {
        markerContent = player1.getMarker()
        currentPlayerTurn = player2
        gameStatus.textContent = `${markerContent == 'X' ? 'O': 'X'} Turn`

        playerOneContainer.classList.remove('playerTurn')
        playerTwoContainer.classList.add('playerTurn')
    } else {
        markerContent = player2.getMarker()
        currentPlayerTurn = player1
        gameStatus.textContent = `${markerContent == 'X' ? 'O': 'X'} Turn`
        playerOneContainer.classList.add('playerTurn')
        playerTwoContainer.classList.remove('playerTurn')
    }

    marker.classList.add('markerDraw')

    marker.textContent = markerContent
    gameBoard[positionValue] = markerContent
    allPos[markerContent].push(Number(positionValue))

    if(!isGameOver(markerContent) && currentPlayerTurn != player1) {
        botTurn()
    }


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
                    displayWinningPosition(winningPosVal)
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
            updateScore(player1)
        } else {
            console.log('PLAYER 2 WINS.')
            updateScore(player2)
        }
    } else if (endType == 'tie') {
        console.log('NO ONE WINS. TIE GAME.')
    }
}

const displayWinningPosition = (winningPosVal) => {
    console.log(winningPosVal)
    const cells = Object.values(grid)
    for (let val of winningPosVal) {
        let winningCell = cells[val - 1]
        winningCell.classList.add('winningCell')
    }
}

const updateScore = (player) => {
    player.incrementScore()

    if (player.getMarker() === 'X') {
        playerOneScoreElem.textContent = player.getScore()
    } else {
        playerTwoScoreElem.textContent = player.getScore()
    }

    console.log(gameBoard)
    for (let elem of grid) {
        console.log(elem)
    }
}

const restartGame = () => {
    currentPlayerTurn = player1
    playerOneContainer.classList.remove('playerTurn')
    playerTwoContainer.classList.remove('playerTurn')
    playerOneContainer.classList.add('playerTurn')
    gameStatus.textContent = 'X Turn'

    allPos['X'] = []
    allPos['O'] = []

    grid.forEach((cell) => {
        cell.classList.remove('winningCell')
        const marker = cell.childNodes[1]
        marker.classList.remove('markerDraw')
        marker.innerHTML = '&nbsp;'
    })

    for (let posVal in gameBoard) {
        gameBoard[posVal] = '&nbsp;'
    }
}

const isMarked = (marker) => marker.innerHTML === '&nbsp;' ? false : true

const botTurn = () => {
    let elem;

    console.log(difficulty)

    switch(difficulty) {
        case 'Easy':
            elem = findNextEmptyElem()
            break
        case 'Medium':
            elem = findNextEmptyElemRandom()
            break
        case 'Impossible':
            elem = findNextEmptyElemMinMax()
            break
    }

    elem.click()
    console.log(document.getElementById('difficultyLevelsSelect').value)
}

const findNextEmptyElem = () => {
    for (let cell of grid) {
        const marker = cell.childNodes[1]

        if (!isMarked(marker)) {
            return cell
        }
    }
}

const findNextEmptyElemRandom = () => {
    let foundElem = null
    while (foundElem == null) {
        const randomIndex = getRandomInt(0, grid.length - 1)
        const cell = grid[randomIndex]
        const marker = cell.childNodes[1]
        if(!isMarked(marker)) {
            foundElem = cell
            break
        }
    }

    return foundElem
}

const findNextEmptyElemMinMax = () => {

}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

const setGamemode = () => {
    selectedGamemode = gamemode.options[gamemode.selectedIndex].text;
    restartGame()
}

const setDifficulty = () => {
    difficulty = difficultyLevelsSelect.value
    restartGame()
}


const startGame = () => {
    for (let cell of grid) {
        cell.addEventListener('click', handleClick)
    }

    shareButton.addEventListener('click', () => {
        for (let cell of grid) {
            cell.click()
        }
    })
    
    difficultyLevelsSelect.addEventListener('change', setDifficulty)
    gamemode.addEventListener('change', setGamemode)
    gameStatus.textContent = `X Turn`

    setGamemode()
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
let difficulty = difficultyLevelsSelect.value
let selectedGamemode = gamemode.options[gamemode.selectedIndex].text;
let currentPlayerTurn = player1

document.addEventListener('DOMContentLoaded', (event) => {
    startGame()
})