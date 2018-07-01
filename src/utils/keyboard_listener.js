export default (board, self) => {
  document.addEventListener("keypress", event => {
    const keyName = event.key;
    console.log(keyName);
    switch (keyName) {
      case "8":
        board.rotate();
        self.setState({
          grid: board.grid
        });
        break;
      case "5":
        board.dropPieceOneStep();
        self.setState({
          grid: board.grid
        });
        break;
        break;
      case "4":
        board.movePieceLeft();
        self.setState({
          grid: board.grid
        });
        break;
      case "6":
        board.movePieceRight();
        self.setState({
          grid: board.grid
        });
        break;
    }
  });
};
