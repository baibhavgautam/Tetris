import React from "react";
import Board from "../model/src/board";
import { DARK_SQUARE } from "../model/src/utils/color_codes";
import keyboardListener from "../utils/keyboard_listener";
import NextPiece from "./next_piece";

class BoardUI extends React.Component {
  constructor(props) {
    super(props);

    this.board = new Board();
    this.state = {
      grid: this.board.grid,
      nextPiece: this.board.nextPiece
    };

    this.board.startGame(grid => {
      this.setState({ grid });
    });

    keyboardListener(this.board, (grid, nextPiece) => {
      this.setState({ grid, nextPiece });
    });
  }

  makeBlock(i, j) {
    return (
      <div
        key={`${i},${j}`}
        className={this.state.grid[i][j] === DARK_SQUARE ? "dark" : "light"}
      />
    );
  }

  render() {
    let blocks = [];
    this.state.grid.forEach((row, i) => {
      for (let j = 0; j < row.length; j++) {
        blocks.push(this.makeBlock(i, j));
      }
    });
    return (
      <div className="game-container">
        <div className="board-grid">{blocks}</div>
        <NextPiece piece={this.board.nextPiece} />
      </div>
    );
  }
}

export default BoardUI;
