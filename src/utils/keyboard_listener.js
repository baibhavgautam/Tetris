export default (board, cb) => {
  document.addEventListener("keydown", function(event) {
    const keyName = event.key;
    switch (keyName) {
      case "ArrowLeft":
        board.movePieceLeft();
        cb(board.grid, board.nextPiece);
        break;

      case "ArrowRight":
        board.movePieceRight();
        cb(board.grid, board.nextPiece);
        break;

      case "ArrowUp":
        board.rotate();
        cb(board.grid, board.nextPiece);
        break;

      case "ArrowDown":
        board.dropPieceOneStep();
        cb(board.grid, board.nextPiece);
        break;
      default:
        break;
    }
  });
};
