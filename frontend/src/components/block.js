import React from "react";
import ReactDOM from "react-dom";

class Block extends React.Component {
  // '◻' === String.fromCharCode(0x25FB)
  // '◼' === String.fromCharCode(0x25FC)
  constructor(props) {
    super(props);
  }

  getBlock(currentColor) {
    let className =
      currentColor === String.fromCharCode(0x25fc)
        ? "piece-square"
        : "board-square";
    return <div className={className} />;
  }

  render() {
    return this.getBlock(this.props.currentColor);
  }
}

export default Block;
