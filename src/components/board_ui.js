import React from "react";
import { DARK_SQUARE } from "../model/src/utils/color_codes";
import Board from "../model/src/board";
import keyboardListener from "../utils/keyboard_listener";

const board = new Board();

class BoardUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: board.grid
    };

    board.startGame(grid => {
      this.setState({ grid });
    });

    keyboardListener(board, this);
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

    return <div className="board-grid">{blocks}</div>;
  }
}

export default BoardUI;
