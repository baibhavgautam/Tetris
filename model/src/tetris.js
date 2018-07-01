const keypress = require("keypress");
const Board = require("./board.js");

keypress(process.stdin);
process.stdin.on("keypress", function(ch, key) {
  let pressedKey = key.name;
  switch (pressedKey) {
    case "up":
      board.rotate();
      board.printGrid();
      break;
    case "right":
      board.movePieceRight();
      board.printGrid();
      break;
    case "down":
      board.dropPieceOneStep();
      board.printGrid();
      break;
    case "left":
      board.movePieceLeft();
      board.printGrid();
      break;
    default:
      break;
  }
  if (key && key.ctrl && key.name == "c") {
    console.clear();
    process.exit(0);
    process.stdin.pause();
  }
});

const board = new Board();

const reset = () => {
  board.isGameOver = false;
  board.initialize();
  board.insertToGrid();
  board.printGrid();

  let timerId = setInterval(() => {
    board.dropPieceOneStep();
    board.printGrid();
    //set state here
    if (board.isGameOver) {
      clearInterval(timerId);
      startGame();
    }
  }, 500);
};

const startGame = () => {
  reset();
};

startGame();

process.stdin.setRawMode(true);
process.stdin.resume();
