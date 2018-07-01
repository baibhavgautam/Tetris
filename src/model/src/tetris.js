const keypress = require("keypress");
const Board = require("./board.js");

const board = new Board();
board.startGame(function() {
  board.printGrid();
});

keypress(process.stdin);
process.stdin.setRawMode(true);

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
