document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

//Decides whether a cell is a mine or not
function mineDecide() {
  if (Math.random() < 0.4) {
    return true
  } else {
    return false
  }
}

//This function creates each cell
function createCell(rowNum, colNum) {
  var newCell = {
    row: rowNum,
    col: colNum,
    isMine: mineDecide(),
    isMarked: false,
    hidden: true
  }
  return newCell
}

//Creates the board using previous two functions
function createEasyBoard() {
  board = {
    cells: []
  }
  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
    board.cells.push(createCell(x, y))
    }
  }
  startGame()
}

function createMediumBoard() {
  board = {
    cells: []
  }
  for (var x = 0; x < 5; x++) {
    for (var y = 0; y < 5; y++) {
    board.cells.push(createCell(x, y))
    }
  }
  startGame()
}

function createHardBoard() {
  board = {
    cells: []
  }
  for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 6; y++) {
    board.cells.push(createCell(x, y))
    }
  }
  startGame()
}

createEasyBoard()

function startGame () {
  document.getElementById("game").innerHTML = " "
  // Don't remove this function call: it makes the game work!
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  document.getElementById("easy").addEventListener('click', createEasyBoard)
  document.getElementById("medium").addEventListener('click', createMediumBoard)
  document.getElementById("hard").addEventListener('click', createHardBoard)
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (var i = 0; i < board.cells.length; i++) {
    if ((board.cells[i].isMine === false) && (board.cells[i].hidden === true)) {
      return;
    } else if ((board.cells[i].isMine === true) && (board.cells[i].isMarked === false)) {
      return;
    }
  }
  lib.displayMessage('Hell yeah chief! Bloody good on ya!');
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//

//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine == true) {
      count++
    } 
  }
  return count
}
