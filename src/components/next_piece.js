import React from "react";

const style = {
  dimen: {
    width: "20px",
    height: "20px",
    background: "orange"
  }
};

class NextPiece extends React.Component {
  makeBlock(i, j) {
    return <div key={`${i},${j}`} style={style.dimen} />;
  }

  render() {
    console.log(this.props.piece.positionsOnBoard);
    let blocks = [];
    this.props.piece.positionsOnBoard.forEach((row, i) => {
      for (let j = 0; j < row.length; j++) {
        blocks.push(this.makeBlock(i, j));
      }
    });
    return (
      <div>
        <div>{blocks}</div>
      </div>
    );
  }
}

export default NextPiece;
