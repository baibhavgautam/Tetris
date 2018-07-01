import React from "react";
// import ReactDOM from "react-dom";
import Block from "./block";
import Board from "../model/src/board";

const board = new Board();

class BoardGUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: board.grid
    };

    reset(this);
    listenToKeyboard(this);
  }

  makeBlock(i, j) {
    return <Block key={`${i},${j}`} color={this.state.grid[i][j]} />;
  }

  render() {
    let blocks = [];
    this.state.grid.forEach((row, i) => {
      for (let j = 0; j < row.length; j++) {
        blocks.push(this.makeBlock(i, j));
      }
    });

    return <div className="board-grid">{blocks}</div>;
  }
}

// Helpers
const reset = that => {
  board.isGameOver = false;
  board.initialize();
  board.insertToGrid();
  that.state = {
    grid: board.grid
  };
  that.timerId = setInterval(() => {
    board.dropPieceOneStep();
    that.setState({
      grid: board.grid
    });
    if (board.isGameOver) {
      // foo();
    }
  }, 500);
};

const listenToKeyboard = that => {
  document.addEventListener("keypress", event => {
    const keyName = event.key;
    switch (keyName) {
      case "8":
        board.rotate();
        that.setState({
          grid: board.grid
        });
        break;
      case "5":
        board.dropPieceOneStep();
        that.setState({
          grid: board.grid
        });
        break;
        break;
      case "4":
        board.movePieceLeft();
        that.setState({
          grid: board.grid
        });
        break;
      case "6":
        board.movePieceRight();
        that.setState({
          grid: board.grid
        });
        break;
    }
  });
};

export default BoardGUI;
