export default (board, cb) => {
  document.addEventListener("keydown", function(event) {
    const keyName = event.key;
    switch (keyName) {
      case "ArrowLeft":
        board.movePieceLeft();
        cb(board.grid);
        break;

      case "ArrowRight":
        board.movePieceRight();
        cb(board.grid);
        break;

      case "ArrowUp":
        board.rotate();
        cb(board.grid);
        break;

      case "ArrowDown":
        board.dropPieceOneStep();
        cb(board.grid);
        break;
      default:
        break;
    }
  });
};
