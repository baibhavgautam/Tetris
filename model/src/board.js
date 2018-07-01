const { Box, Ted, Straight, ZawL, ZawR, L, ReverseL } = require('./piece')
const PIECES = [Box, Ted, Straight, ZawL, ZawR, L, ReverseL]
class Board {
// '◻', '◼'
//  String.fromCharCode(0x25FB) === '◻' 
//  String.fromCharCode(0x25FC) ==='◼'
  constructor() {
    this.grid = new Array(20) 
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(10)
    }
    this.isGameOver = false
    this.nextPiece = this.getRandomPiece()
  }

  initialize() {
    for (let i = 0; i < this.grid.length; i++) {
      let row = this.grid[i]
      for (let j = 0; j < row.length; j++) {
        row[j] = String.fromCharCode(0x25FB)
      }
    }
  }

  printGrid() {
    console.clear()
    console.log(`\n\n`)
    this.grid.forEach(row => console.log(`\t\t\t` + row.join('')))
  }

  insertToGrid() {
    this.currentPiece = this.nextPiece
    this.nextPiece = this.getRandomPiece()
    this.renderPiece()
  }

  getRandomPiece() {
    return new PIECES[Math.floor(Math.random() * PIECES.length)]
  }

  renderPiece() {
    this.fillAt(this.currentPiece.positionsOnBoard)
  }

  unrenderPiece() {
    this.eraseAt(this.currentPiece.positionsOnBoard)
  }

  fillAt(positions) {
    positions.forEach(position => {
      let x = position[0]
      let y = position[1]
      this.grid[x][y] = String.fromCharCode(0x25FC)
    })
  }

  eraseAt(positions) {
    positions.forEach(position => {
      let x = position[0]
      let y = position[1]
      this.grid[x][y] = String.fromCharCode(0x25FB)
    })
  }

  rotate() {
    this.unrenderPiece()

    //Make a deep copy of the array 
    let currentPositions = this.currentPiece.positionsOnBoard.map(position =>
      [position[0], position[1]]  
    )

    this.currentPiece.rotate()

    let isValidRotation = this.currentPiece.positionsOnBoard.every(position => {
      let isWithinBoundsVertically = position[0] >= 0 && position[0] < 20
      let isWithinBoundsHorizontally = position[1] >= 0 && position[1] < 10
      let isEmpty = this.isEmptySquare(position)
      return isWithinBoundsHorizontally && isWithinBoundsVertically && isEmpty
    })

    if(!isValidRotation) {
      this.currentPiece.shapeCode--
      this.currentPiece.positionsOnBoard = currentPositions
    }
    this.renderPiece()
  }

  hasHitBottom() {
    return this.currentPiece.positionsOnBoard.some(position => position[0] === 19)
  }

  isEmptySquare(position) {
    return this.grid[position[0]] !== undefined && this.grid[position[0]][position[1]] === String.fromCharCode(0x25FB)
  }

  willHitAnotherPieceComingDown() {
    let currentPositions = this.currentPiece.positionsOnBoard   

    //Calculate Next positions
    let nextPositions = currentPositions.map(position =>
    [position[0] + 1, position[1]])

    //Filter out positions that are both in current positions and nextPositions
    let uniquePositions = nextPositions.filter(position =>
      currentPositions.findIndex(pos =>
        pos[0] === position[0] && pos[1] === position[1]
      ) === -1 
    )

    return !uniquePositions.every(position => this.isEmptySquare(position))
  }

  destroyFullLines() {
    let fullLinesIndices = []
    //Destroy all the full rows from the grid 
    this.grid.forEach((row, i) => {
      if(row.every(unitBox => unitBox === String.fromCharCode(0x25FC)))
        fullLinesIndices.push(i)
    })

    fullLinesIndices.forEach(index => {
      this.grid.splice(index, 1)
      let newRow = []
      for(let i = 0; i < 10; i++) {
        newRow.push(String.fromCharCode(0x25FB))
      }
      this.grid.unshift(newRow)
    })
  }

  dropPieceOneStep() {
    if(this.hasHitBottom()) {
       this.destroyFullLines()          
       this.insertToGrid() 
    } else if(this.willHitAnotherPieceComingDown()) {
      this.destroyFullLines()
      if(this.grid[0].some(box => box === String.fromCharCode(0x25FC))) {
        this.isGameOver = true
      } else {
        this.insertToGrid()      
      }
    } else {
      let currentPositions = this.currentPiece.positionsOnBoard
      this.unrenderPiece()
      //Calculate new positions
      this.currentPiece.positionsOnBoard = currentPositions.map(position => 
        [position[0] + 1, position[1]]
      )
      this.renderPiece()
    }
  }

  willHitAnotherMovingLeft() {
    let currentPositions = this.currentPiece.positionsOnBoard
    let nextPositions = currentPositions.map(position =>
      [position[0], position[1] - 1]
    )

    let uniquePositions = nextPositions.filter(nextPosition =>
      currentPositions.findIndex(position =>
        position[0] === nextPosition[0] && position[1] === nextPosition[1]
      ) === -1
    )
    return !uniquePositions.every(position => this.isEmptySquare(position))
  }

  willHitAnotherMovingRight() {
    let currentPositions = this.currentPiece.positionsOnBoard
    let nextPositions = currentPositions.map(position => [position[0], position[1] + 1])

    let uniquePositions = nextPositions.filter(nextPosition =>
      currentPositions.findIndex(position =>
        position[0] === nextPosition[0] && nextPosition[1] === position[1]
      ) === -1
    )
    return !uniquePositions.every(position => this.isEmptySquare(position))
  }

  movePieceRight() {
    let currentPositions = this.currentPiece.positionsOnBoard
    let isValid = currentPositions.every(position => position[1] < 9)

    if(isValid && !this.willHitAnotherMovingRight()) {
    //Erase currentPositions unrender
    this.eraseAt(currentPositions)   
    //Calculate new positions
    this.currentPiece.positionsOnBoard = currentPositions.map(position => {
      return [position[0], position[1] + 1]
    })     
    //Fill new positions render
    this.fillAt(this.currentPiece.positionsOnBoard)
    }
  }

  movePieceLeft() {
    let currentPositions = this.currentPiece.positionsOnBoard
    let isValid = currentPositions.every(position => position[1] !== 0)
   
    if(isValid && !this.willHitAnotherMovingLeft()) {
      //Erase currentPositions  render
      this.eraseAt(currentPositions)   
      //Calculate new positions
      this.currentPiece.positionsOnBoard = currentPositions.map(position => {
        return [position[0], position[1] - 1]
      })     
      //Fill new positions unrender
      this.fillAt(this.currentPiece.positionsOnBoard)
    }
  }  

  isGameOver() {
    return this.grid[0].some(box => box === '◼')
  }

}

module.exports = Board