const grid = document.querySelectorAll('.cell')

const handleClick = (event) => {
    console.log(event.target)
}

for (let cell of grid) {
    cell.addEventListener('click', handleClick)
    console.log(cell)
}