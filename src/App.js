import React, { Component } from "react";
import BoardUI from "./components/board_ui";
class App extends Component {
  render() {
    return (
      <div className="main-container">
        <BoardUI />
      </div>
    );
  }
}

export default App;
