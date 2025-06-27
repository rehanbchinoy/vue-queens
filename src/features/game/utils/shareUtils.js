// Utility functions for sharing puzzle states

/**
 * Encodes the board state and difficulty into a shareable string
 * @param {Array} boardState - The current board state
 * @param {string} difficulty - The current difficulty level
 * @returns {string} - Encoded string for sharing
 */
export function encodeBoardState(boardState, difficulty) {
  // Create a simple encoding: difficulty + board state
  const boardString = boardState.map(row => 
    row.map(cell => {
      if (cell.content === 'queen') return 'Q'
      if (cell.content === 'marked') return 'M'
      return 'E' // Empty
    }).join('')
  ).join('')
  
  // Combine difficulty and board state
  const encoded = `${difficulty}:${boardString}`
  
  // Use base64 encoding for URL safety
  return btoa(encoded)
}

/**
 * Decodes a shared string back into board state and difficulty
 * @param {string} encodedString - The encoded string from URL
 * @returns {Object} - Object containing difficulty and board state
 */
export function decodeBoardState(encodedString) {
  try {
    // Decode from base64
    const decoded = atob(encodedString)
    
    // Split difficulty and board state
    const [difficulty, boardString] = decoded.split(':')
    
    if (!difficulty || !boardString) {
      throw new Error('Invalid encoded string')
    }
    
    // Reconstruct board state
    const boardState = []
    const boardSize = Math.sqrt(boardString.length)
    
    for (let i = 0; i < boardSize; i++) {
      const row = []
      for (let j = 0; j < boardSize; j++) {
        const index = i * boardSize + j
        const cellChar = boardString[index]
        
        let content = null
        if (cellChar === 'Q') content = 'queen'
        else if (cellChar === 'M') content = 'marked'
        
        row.push({ content, section: 0 }) // We'll need to get the actual section from the difficulty grid
      }
      boardState.push(row)
    }
    
    return { difficulty, boardState }
  } catch (error) {
    console.error('Failed to decode board state:', error)
    return null
  }
}

/**
 * Generates a shareable URL for the current puzzle state
 * @param {Array} boardState - The current board state
 * @param {string} difficulty - The current difficulty level
 * @returns {string} - Shareable URL
 */
export function generateShareUrl(boardState, difficulty) {
  const encoded = encodeBoardState(boardState, difficulty)
  const baseUrl = window.location.origin + window.location.pathname
  return `${baseUrl}?puzzle=${encoded}`
}

/**
 * Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
} 