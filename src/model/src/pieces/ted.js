class Ted {
  constructor() {
    this.shapeCode = 0;
    this.positionsOnBoard = [[0, 5], [1, 4], [1, 5], [1, 6]];
  }

  rotate() {
    this.shapeCode++;
    this.updateShape(this.shapeCode);
  }

  updateShape(i) {
    let currentPositions = this.positionsOnBoard;
    i = i % 4;
    let shapes = {
      1: () => {
        let toUpdate = currentPositions[1];
        let newX = toUpdate[0];
        let newY = toUpdate[1] + 1;
        currentPositions[1] = [newX, newY];
        toUpdate = currentPositions[2];
        newX = toUpdate[0];
        newY = toUpdate[1] + 1;
        currentPositions[2] = [newX, newY];
        toUpdate = currentPositions[3];
        newX = toUpdate[0] + 1;
        newY = toUpdate[1] - 1;
        currentPositions[3] = [newX, newY];
        this.positionsOnBoard = currentPositions;
      },

      2: () => {
        //0
        let toUpdate = currentPositions[0];
        let newX = toUpdate[0] + 1;
        let newY = toUpdate[1] - 1;
        currentPositions[0] = [newX, newY];
        //1
        toUpdate = currentPositions[1];
        newX = toUpdate[0];
        newY = toUpdate[1];
        currentPositions[1] = [newX, newY];
        //2
        toUpdate = currentPositions[2];
        newX = toUpdate[0];
        newY = toUpdate[1];
        currentPositions[2] = [newX, newY];
        //3
        toUpdate = currentPositions[3];
        newX = toUpdate[0];
        newY = toUpdate[1];
        currentPositions[3] = [newX, newY];
        this.positionsOnBoard = currentPositions;
      },

      3: () => {
        //0
        let toUpdate = currentPositions[0];
        let newX = toUpdate[0] - 1;
        let newY = toUpdate[1] + 1;
        currentPositions[0] = [newX, newY];
        //1
        toUpdate = currentPositions[1];
        newX = toUpdate[0];
        newY = toUpdate[1] - 1;
        currentPositions[1] = [newX, newY];
        //2
        toUpdate = currentPositions[2];
        newX = toUpdate[0];
        newY = toUpdate[1] - 1;
        currentPositions[2] = [newX, newY];
        //3
        toUpdate = currentPositions[3];
        newX = toUpdate[0];
        newY = toUpdate[1];
        currentPositions[3] = [newX, newY];
        this.positionsOnBoard = currentPositions;
      },

      0: () => {
        let toUpdate = currentPositions[3];
        let newX = toUpdate[0] - 1;
        let newY = toUpdate[1] + 1;
        currentPositions[3] = [newX, newY];
        this.positionsOnBoard = currentPositions;
      }
    };
    shapes[i]();
  }
}

module.exports = Ted;
