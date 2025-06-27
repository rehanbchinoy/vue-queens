import { ref, computed } from 'vue'
import { easy, medium, hard } from '@/features/game/data/sectionGrid'

const difficulties = {
  easy,
  medium,
  hard
}

function createBoard(grid) {
  return grid.map((row) =>
    row.map((section) => ({
      content: null,
      section
    }))
  )
}

export function createGame() {
  const currentDifficulty = ref('medium')
  const boardState = ref(createBoard(difficulties[currentDifficulty.value]))
  const queens = ref([])

  function changeDifficulty(difficulty) {
    if (difficulties[difficulty]) {
      currentDifficulty.value = difficulty
      boardState.value = createBoard(difficulties[difficulty])
      queens.value = []
    }
  }

  function loadSharedPuzzle(difficulty, sharedBoardState) {
    if (difficulties[difficulty]) {
      currentDifficulty.value = difficulty
      
      // Create a new board with the correct sections
      const newBoard = createBoard(difficulties[difficulty])
      
      // Apply the shared content while preserving the correct sections
      boardState.value = newBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => ({
          ...cell,
          content: sharedBoardState[rowIndex][colIndex].content
        }))
      )
      
      // Rebuild the queens array
      queens.value = []
      boardState.value.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell.content === 'queen') {
            queens.value.push({ row: rowIndex, col: colIndex, valid: true })
          }
        })
      })
      
      // Validate the loaded board
      validateBoard()
    }
  }

  function resetValidations() {
    queens.value.forEach((queen) => (queen.valid = true))
  }

  function validateRow(rowIndex) {
    const queensInRow = queens.value.filter((queen) => queen.row === rowIndex)

    if (queensInRow.length > 1) {
      queensInRow.forEach((queen) => (queen.valid = false))
      return false
    }
    return true
  }

  function validateColumn(columnIndex) {
    const queensInColumn = queens.value.filter((queen) => queen.col === columnIndex)

    if (queensInColumn.length > 1) {
      queensInColumn.forEach((queen) => (queen.valid = false))
      return false
    }
    return true
  }

  function validateSection(section) {
    const queensInSection = queens.value.filter((queen) => {
      const { row, col } = queen
      return boardState.value[row][col].section === section
    })

    if (queensInSection.length > 1) {
      queensInSection.forEach((queen) => (queen.valid = false))
      return false
    }
    return true
  }

  function checkDiagonalConflicts(queen) {
    const directions = [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1]
    ]

    let conflicts = false

    const { row: rowIndex, col: colIndex } = queen
    for (const [dx, dy] of directions) {
      const newRow = rowIndex + dx
      const newCol = colIndex + dy
      if (
        newRow >= 0 &&
        newRow < boardState.value.length &&
        newCol >= 0 &&
        newCol < boardState.value[0].length
      ) {
        const adjacentQueen = queens.value.find((q) => q.row === newRow && q.col === newCol)
        if (adjacentQueen) {
          queen.valid = false
          adjacentQueen.valid = false
          conflicts = true
        }
      }
    }

    return !conflicts
  }

  function validateBoard() {
    resetValidations()

    for (const queen of queens.value) {
      const { row, col } = queen
      const cell = boardState.value[row][col]
      const rowValid = validateRow(row)
      const columnValid = validateColumn(col)
      const sectionValid = validateSection(cell.section)
      const diagonalValid = checkDiagonalConflicts(queen)

      queen.valid = rowValid && columnValid && sectionValid && diagonalValid
    }
  }

  function isValidQueen(rowIndex, cellIndex) {
    return queens.value.some(
      (queen) => queen.row === rowIndex && queen.col === cellIndex && !queen.valid
    )
  }

  function toggleCell(rowIndex, cellIndex) {
    const cell = boardState.value[rowIndex][cellIndex]

    if (!cell.content) {
      cell.content = 'marked'
    } else if (cell.content === 'marked') {
      cell.content = 'queen'
      queens.value.push({ row: rowIndex, col: cellIndex, valid: true })
    } else {
      queens.value = queens.value.filter(
        (queen) => queen.row !== rowIndex || queen.col !== cellIndex
      )
      cell.content = null
    }

    validateBoard()
  }

  function clearBoard() {
    boardState.value = boardState.value.map((row) =>
      row.map((cell) => ({ ...cell, content: null }))
    )
    queens.value = []
  }

  const gameWon = computed(() => {
    const currentGrid = difficulties[currentDifficulty.value]
    if (queens.value.length !== currentGrid.length) {
      return false
    }

    return queens.value.every((queen) => queen.valid)
  })

  return {
    boardState,
    currentDifficulty,
    toggleCell,
    queens,
    isValidQueen,
    clearBoard,
    changeDifficulty,
    loadSharedPuzzle,
    gameWon
  }
}
