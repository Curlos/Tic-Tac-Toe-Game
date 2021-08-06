const grid = document.querySelectorAll('.cell')
const restartGameButton = document.getElementById('restartGame')

const handleClick = (event) => {
    const cell = event.target
    console.log(`CELL: `)
    console.log(cell)
    const marker = cell.childNodes[1]
    console.log(isMarked(marker))

    if (!isMarked(marker)) {
        console.log("MARKED")
        marker.textContent = 'X'
    } else {
        console.log('ALREADY MARKED')
    }

    
}

const restartGame = () => {
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